
import { expect, APIRequestContext } from "@playwright/test";
import { LeadListingService } from "../../services/leads/leadListing.service";

export async function verifyLeadInTodayFollowUp(
  apiContext: APIRequestContext,
  buId: number,
  tenantId: string,
  tenantToken: string,
  mobile: string,
  accessToken: string,
  sku?: string
) {

  const listingService = new LeadListingService(apiContext);

  const limit = 20;
  const maxRetries = 6;
  let lead: any = null;

  for (let retry = 0; retry < maxRetries && !lead; retry++) {

    let page=1;

    while (!lead) {

      const response = await listingService.getTodayFollowups(
        buId,
        tenantId,
        tenantToken,
        accessToken,
        page,
        limit
      );

      const status = response.status();

      if (status !== 200) {
        console.log("Listing API failed:", status);
        
        console.log(await response.text());
      }

      expect(status).toBe(200);

      const body = await response.json();

      const leads = body.todayFollowUp || body.data || [];
      //console.log(JSON.stringify(leads[0], null, 2));

      console.log(`Retry ${retry} | page ${page} | leads: ${leads.length}`);

      lead = leads.find((l: any) => {

        const mobileMatch =
          l.customer_mobile === mobile ||
          l.mobile === mobile ||
          l.phone === mobile;

        if (!mobileMatch) return false;

        if (!sku) return true;

        const skuMatch =
          l.productDetails?.sku === sku ||
          l.product?.sku === sku ||
          l.products?.some((p: any) => p.sku === sku);

        return skuMatch;
      });

      if (lead) break;

      if (leads.length < limit) break;

page++;
    }

    if (!lead) {
      console.log("Lead not found yet. Waiting before retry...");
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  expect(lead).toBeTruthy();

  if (sku) {

    const returnedSku =
      lead.productDetails?.sku ||
      lead.product?.sku ||
      lead.products?.[0]?.sku;

    expect(returnedSku).toBe(sku);
  }

  console.log("Lead verified successfully:", mobile);

  return lead;
}

