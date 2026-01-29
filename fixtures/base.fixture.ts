import { mergeTests } from "@playwright/test";
import { test as baseTest } from "./base-test.fixture.ts";
import { test as page } from "./page.fixture.ts";
import { test as api } from "./api.fixture.ts";

// Merge all the fixtures
export const test = mergeTests(baseTest, page, api);
export const expect = test.expect;
