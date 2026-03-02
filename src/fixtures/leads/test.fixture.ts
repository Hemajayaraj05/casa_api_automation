import { test as base, APIRequestContext } from "@playwright/test";
import { currentEnv } from "../../config/env";

type MyFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<MyFixtures>({
  apiContext: async ({ playwright }, use) => {
    const requestContext = await playwright.request.newContext({
      baseURL: currentEnv.baseURL,
    });

    await use(requestContext);
    await requestContext.dispose();
  },
});