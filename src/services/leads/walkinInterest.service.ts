import { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../../constants/leads/walkinInterest.endpoints";

export class WalkInService {
  constructor(private request: APIRequestContext) {}

  async saveWalkIn(
    buId: number,
    tenantId: string,
    tenantToken: string,
    payload: any
  ) {
    return await this.request.post(
      ENDPOINTS.save_walkin(buId),
      {
        headers: {
          "content-type": "application/json",
          "x-tenant-id": tenantId,
          "x-tenant-token": tenantToken,
        },
        data: payload,
      }
    );
  }
}