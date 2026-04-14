import { expect, APIRequestContext } from "@playwright/test";
import { LeadListingService } from "../../services/leads/leadListing.service";

export async function verifyLeadInTodayFollowUp(
  apiContext: APIRequestContext,
  buId: number,
  tenantId: string,
  tenantToken: string,
  mobile: string,
  sku?: string,
  expectedCount: number = 1
) {
  const listingService = new LeadListingService(apiContext);

  const limit = 20;
  const maxRetries = 5;

  for (let retry = 0; retry < maxRetries; retry++) {

    let page = 1;
    let matchedLeads: any[] = [];

    while (true) {

      const response = await listingService.getTodayFollowups(
        buId,
        tenantId,
        tenantToken,
        page,
        limit
      );

      expect(response.status()).toBe(200);

      const body = await response.json();
      console.log(JSON.stringify(body, null, 2));

      const leads = [
        ...(body.todayFollowUp ?? []),
        ...(body.missedFollowUp ?? []),
        ...(body.lead ?? []),
        ...(body.data?.todayFollowUp ?? []),
      ];

      console.log({
        today: body.todayFollowUp?.length,
        missed: body.missedFollowUp?.length,
        lead: body.lead?.length
      });

      console.log(`Retry ${retry} | page ${page} | leads: ${leads.length}`);

      const filtered = leads.filter((l: any) => {

        const mobileMatch =
          l.customer_mobile === mobile ||
          l.mobile === mobile ||
          l.phone === mobile;

        if (!mobileMatch) return false;

        if (!sku) return true;

        return (
          l.productDetails?.sku === sku ||
          l.product?.sku === sku ||
          l.products?.some((p: any) => p.sku === sku)
        );
      });

      matchedLeads.push(...filtered);

      if (leads.length < limit) break;

      page++;
    }

    console.log("Matched leads count:", matchedLeads.length);

    if (matchedLeads.length === expectedCount) {
      console.log(
        `Lead verification successful. Mobile: ${mobile}, Count: ${matchedLeads.length}`
      );
      return matchedLeads;
    }

    console.log("Expected:", expectedCount, "Found:", matchedLeads.length);
    console.log("Waiting before retry...");
    await new Promise((r) => setTimeout(r, 4000));
  }

  throw new Error(
    `Expected ${expectedCount} leads for mobile ${mobile} and sku ${sku}, but condition not met`
  );
}