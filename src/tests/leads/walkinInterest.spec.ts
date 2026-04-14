import { expect } from "@playwright/test";
import { test } from "../../fixtures/leads/test.fixture";
import { WalkInService } from "../../services/leads/walkinInterest.service";
import { verifyLeadInTodayFollowUp } from "../../assertions/leads/lead.assertions";
import { getAccessToken } from "../../auth/getAccessToken";
import { generateMobile} from "../../helpers/leads/generateMobile.helper";
import { createLead } from "../../helpers/leads/walkinLead.helper";


const tenantId = process.env.TENANT_ID;
const tenantToken = process.env.TENANT_TOKEN;
const buId = process.env.BU_ID;


if (!tenantId || !tenantToken || !buId) {
  throw new Error(
    "TENANT_ID, TENANT_TOKEN, and BU_ID must be provided as env variables"
  );
}

test("Create Walk-In Lead", async ({ creationApiContext, listingApiContext }) => {

  const mobile = generateMobile();

  const service = new WalkInService(creationApiContext);

  const response = await createLead(
    service,
    Number(buId),
    tenantId,
    tenantToken,
    mobile
  );

  expect(response.status()).toBe(200);
  await verifyLeadInTodayFollowUp(
    listingApiContext,
    Number(buId),
    tenantId,
    tenantToken,
    mobile
  );

});

test("Should merge duplicate lead with same product", async ({ creationApiContext, listingApiContext }) => {
//  const accessToken = await getAccessToken();
  const service = new WalkInService(creationApiContext);
   const mobile = generateMobile();
  console.log("Lead creation -", mobile);
  const response= await createLead(service,Number(buId),tenantId,tenantToken,mobile);
  const response2= await createLead(service,Number(buId),tenantId,tenantToken,mobile);
  expect(response2.status()).toBe(200);
   await verifyLeadInTodayFollowUp(listingApiContext,Number(buId),tenantId,tenantToken,mobile);
});


test("Should not merge If lead created with different product for the same number",async({creationApiContext, listingApiContext})=>{
  
  const service=new WalkInService(creationApiContext);
 const mobile = generateMobile();
  console.log("Lead creation -", mobile);
  const response = await createLead(service,Number(buId),tenantId,tenantToken,mobile);
  expect(response.status()).toBe(200);
  const productSku="007iphone";
 const responseWithDiffProduct = await createLead(service,Number(buId),tenantId,tenantToken,mobile,productSku);

 await verifyLeadInTodayFollowUp(listingApiContext,Number(buId),tenantId,tenantToken,mobile,undefined,2);

});




