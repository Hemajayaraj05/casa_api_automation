import { APIRequestContext } from "@playwright/test";
import { LEAD_LISTING_ENDPOINT } from "../../constants/leads/walkinInterest.endpoints";

export class LeadListingService {

  constructor(private request: APIRequestContext) {}

  async getTodayFollowups(
    buId: number,
    tenantId: string,
    tenantToken: string,
    accessToken: string,
    page: number = 1,
  limit: number = 20
  ) {

    return await this.request.post(
      LEAD_LISTING_ENDPOINT.list_lead(buId),
      {
        headers: {
          "content-type": "application/json",
          "x-bu-id": buId.toString(),
          "x-tenant-id": tenantId,
          "x-tenant-token": tenantToken,
          "authorization": `Bearer ${accessToken}`,
        },
        data: {
         lane: "todayFollowUp",
            page: page,
           limit:limit,
        },
      }
    );
  }
}