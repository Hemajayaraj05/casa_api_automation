import { expect } from "@playwright/test";
import { test } from "../../fixtures/leads/test.fixture";
import { buildWalkInPayload } from "../../test-data/leads/walkinInterest.data";
import { WalkInService } from "../../services/leads/walkinInterest.service";



const tenantId = process.env.TENANT_ID;
const tenantToken = process.env.TENANT_TOKEN;
const buId = process.env.BU_ID;

if (!tenantId || !tenantToken || !buId) {
  throw new Error(
    "TENANT_ID, TENANT_TOKEN, and BU_ID must be provided as env variables"
  );
}

test("Create Walk-In Lead (Tenant + BU) without DB", async ({ apiContext }) => {
  const service = new WalkInService(apiContext);

  const payload = buildWalkInPayload(Number(buId));

  const response = await service.saveWalkIn(
    Number(buId),
    tenantId,
    tenantToken,
    payload
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(JSON.stringify(body, null, 2));

  console.log(
    `Lead Created | BU: ${buId} | Mobile: ${payload.customer.mobile}`
  );

  expect(body).toBeTruthy();
});