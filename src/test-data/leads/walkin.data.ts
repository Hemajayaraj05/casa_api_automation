import { faker } from "@faker-js/faker";
import { getCurrentISOString } from "../../utils/leads/date.util";

export const buildWalkInPayload = () => {
  const now=getCurrentISOString();
  const mobile = faker.string.numeric(10);

  return {
    walkInInterest: {
      createdDate: now,
      updatedDate: now,
      date: now,
      storeName: "ATE",
      source: "Facebook",
      subSource: "Campaign 123",
      storeUserEmail: "abc@gmail.com",
      products: [
        {
          productSku: "ASB-A",
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