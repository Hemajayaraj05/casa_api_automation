import { test as base, APIRequestContext } from "@playwright/test";
import { currentEnv } from "../../config/env";
import { getAccessToken } from "../../auth/getAccessToken";

type MyFixtures = {
  creationApiContext: APIRequestContext;
  listingApiContext: APIRequestContext;
};

export const test = base.extend<MyFixtures>({

  creationApiContext: async ({ playwright }, use) => {

    const context = await playwright.request.newContext({
      baseURL: currentEnv.creationBaseURL,
    });

    await use(context);
    await context.dispose();
  },

  listingApiContext: async ({ playwright }, use) => {

    const token = await getAccessToken();

    const context = await playwright.request.newContext({
      baseURL: currentEnv.listingBaseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await use(context);
    await context.dispose();
  },

});