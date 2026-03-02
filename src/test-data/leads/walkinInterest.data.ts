import { faker } from "@faker-js/faker";
import { getCurrentISOString } from "../../utils/leads/date.util";

export const buildWalkInPayload = (buId: number) => {
  const now=getCurrentISOString();
 const mobile = `9${faker.string.numeric(9)}`;

  return {
    walkInInterest: {
      createdDate: now,
      updatedDate: now,
      date: now,
      storeName: "DBR",
      source: "Intelliclose",
      subSource: "Campaign 123",
      storeUserEmail: "fashionfolks@gmail.com",
      products: [
        {
          productSku: "001iphone",
        },
      ],
    },
    customer: {
      id: mobile,
      mobile: mobile,
      dob: "10/01/2000",
      email: "",
      name: "",
      address: {
        address1: "",
        address2: "",
        city: "chennai",
        country: "",
        pincode: "",
        state: "",
      },
    },
    default_ts: now,
  };
};