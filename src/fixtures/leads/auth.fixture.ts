import { test as base } from "@playwright/test";
import { getAccessToken } from "../../auth/getAccessToken";

type AuthFixture = {
  accessToken: string;
};

export const test = base.extend<AuthFixture>({
  accessToken: async ({}, use) => {
    const token = await getAccessToken();
    await use(token);
  },
});