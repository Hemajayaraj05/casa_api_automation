import { buildWalkInPayload } from "../../test-data/leads/walkinInterest.data";
import { WalkInService } from "../../services/leads/walkinInterest.service";



export async function createLead(service:WalkInService,buId:Number,tenantId:string,tenantToken:string,mobile:string,productSku?:string){
    const payload=buildWalkInPayload(Number(buId),{mobile,productSku});
    return service.saveWalkIn(
    Number(buId),
    tenantId,
    tenantToken,
    payload
  );

}