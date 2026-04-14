import { APIRequestContext } from "@playwright/test";
import { LEAD_LISTING_ENDPOINT } from "../../constants/leads/walkinInterest.endpoints";
import { getAccessToken } from "../../auth/getAccessToken";


export class LeadListingService {

  constructor(private request: APIRequestContext   ) {}

  async getTodayFollowups(
    buId: number,
    tenantId: string,
    tenantToken: string,
    page: number = 1,
   limit: number = 20
  ) {
   
      
     const url = `${LEAD_LISTING_ENDPOINT.list_lead(buId)}`;
    return await this.request.post(url,
      {
        headers: {
          "content-type": "application/json",
          "x-bu-id": buId.toString(),
          "x-tenant-id": tenantId,
          "x-tenant-token": tenantToken,
          "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

        },
            data: {
        lane: "todayFollowUp",
        offset: (page - 1) * limit,
        limit: limit,
        age: "ALL",
        search: "",
        sort: "updatedDate,desc"
      },
      }
    );
  }
}