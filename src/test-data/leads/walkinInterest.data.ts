import { faker } from "@faker-js/faker";
import { getCurrentISOString } from "../../utils/leads/date.util";

type WalkInOverrides = {
  mobile?: string;
  productSku?: string;
};

export const buildWalkInPayload = (
  buId: number,
  overrides?: WalkInOverrides
) => {
  const now = getCurrentISOString();
  const generatedMobile = `9${faker.string.numeric(9)}`;

  const mobile = overrides?.mobile ?? generatedMobile;

  return {
    walkInInterest: {
      createdDate: now,
      updatedDate: now,
      followUpDate: now,
      date: now,
      storeName: "DBR",
      source: "Intelliclose",
      subSource: "Campaign 123",
      storeUserEmail: "fashionfolks@gmail.com",
      products: [
        {
          productSku: overrides?.productSku ?? "001iphone",
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