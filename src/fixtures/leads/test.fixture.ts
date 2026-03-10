import { test as base, APIRequestContext } from "@playwright/test";
import { currentEnv } from "../../config/env";

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
    const context = await playwright.request.newContext({
      baseURL: currentEnv.listingBaseURL,
    });

    await use(context);
    await context.dispose();
  },

});