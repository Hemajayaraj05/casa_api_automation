export const LEAD_CREATION_ENDPOINT={
    save_walkin:(buId:number)=>
        `/walk-in-interests/businessUnit/${buId}/save`,
}

export const LEAD_LISTING_ENDPOINT={
    list_lead:(buId:number)=>
    `/users/walk-in-interest/businessUnit/${buId}/filterByLane`,
}