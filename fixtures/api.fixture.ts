import { APIRequestContext, request } from "@playwright/test";
import { test as baseTest } from "./base-test.fixture.ts";

// This fixture creates the API request context
export const test = baseTest.extend<
  { apiRequest: APIRequestContext },
  { apiBaseURL: string }
>({
  apiBaseURL: [process.env.API_BASE_URL!, { scope: "worker", option: true }],
  apiRequest: async ({ apiBaseURL }, use) => {
    const apiRequestContext = await request.newContext({
      baseURL: apiBaseURL as string,
    });

    await use(apiRequestContext);
    await apiRequestContext.dispose();
  },
});
