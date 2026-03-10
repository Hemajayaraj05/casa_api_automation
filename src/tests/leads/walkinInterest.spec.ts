import { expect } from "@playwright/test";
import { test } from "../../fixtures/leads/test.fixture";
import { buildWalkInPayload } from "../../test-data/leads/walkinInterest.data";
import { WalkInService } from "../../services/leads/walkinInterest.service";
import { faker } from "@faker-js/faker";
import { verifyLeadInTodayFollowUp } from "../../assertions/leads/lead.assertions";
import { getAccessToken } from "../../utils/auth/getAccessToken";

const tenantId = process.env.TENANT_ID;
const tenantToken = process.env.TENANT_TOKEN;
const buId = process.env.BU_ID;


if (!tenantId || !tenantToken || !buId) {
  throw new Error(
    "TENANT_ID, TENANT_TOKEN, and BU_ID must be provided as env variables"
  );
}

test("Create Walk-In Lead", async ({ creationApiContext, listingApiContext }) => {
  const accessToken=await getAccessToken();
  const service = new WalkInService(creationApiContext);

  const mobile = `9${faker.string.numeric(9)}`;

  console.log("Lead creation -", mobile);

  const payload = buildWalkInPayload(Number(buId), {
    mobile,
  });

  const createResponse = await service.saveWalkIn(
    Number(buId),
    tenantId,
    tenantToken,
    payload
  );

  expect(createResponse.status()).toBe(200);


  await verifyLeadInTodayFollowUp(
    listingApiContext,
    Number(buId),
    tenantId,
    tenantToken,
    mobile,
    accessToken
  );
});

test("Should merge duplicate lead with same product", async ({ creationApiContext, listingApiContext }) => {
    const accessToken = await getAccessToken();
  const service = new WalkInService(creationApiContext);

  const mobile = `9${faker.string.numeric(9)}`;
 console.log("Lead merge - ", mobile);

  const payload = buildWalkInPayload(Number(buId), {
    mobile,
  });

  await service.saveWalkIn(
    Number(buId),
    tenantId,
    tenantToken,
    payload
  );

  await service.saveWalkIn(
    Number(buId),
    tenantId,
    tenantToken,
    payload
  );
   await verifyLeadInTodayFollowUp(
    listingApiContext,
    Number(buId),
    tenantId,
    tenantToken,
    mobile,
    accessToken,
  );
  

});


test("Should not merge If lead created with different product for the same number",async({creationApiContext, listingApiContext})=>{
  const accessToken = await getAccessToken();
  const service=new WalkInService(creationApiContext);
  const mobile = `9${faker.string.numeric(9)}`;
  console.log("Lead should not merge - ", mobile);

  const payload=buildWalkInPayload(Number(buId),{
         mobile,
  })

  await service.saveWalkIn(Number(buId), tenantId, tenantToken, payload);

  const productSku="007iphone";
  const payloadWithDifferentProductSku=buildWalkInPayload(Number(buId),{
    mobile,
    productSku,
  })

  await service.saveWalkIn(Number(buId), tenantId, tenantToken, payloadWithDifferentProductSku);
  await verifyLeadInTodayFollowUp(
    listingApiContext,
    Number(buId),
    tenantId,
    tenantToken,
    mobile,
    accessToken,
    productSku,
  );

});





