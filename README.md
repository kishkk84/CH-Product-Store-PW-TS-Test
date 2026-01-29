# COMPANIES HOUSE DEMO BLAZE PRODUCT STORE FUNCTIONAL TESTS - PLAYWRIGHT TYPESCRIPT REPOSITORY

## Introduction

This project is a Playwright-based testing framework for Companies House Demo Blaze Product Store web application. The framework is designed to automate UI, end-to-end & Regression testing, ensuring the application functions correctly across different browsers and devices.

## Getting Started

Follow these steps to get the code up and running on your system.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Playwright](https://playwright.dev/)
- [Allure Reports](https://allurereport.org/docs/playwright/)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/kishkk84/CH-Product-Store-PW-TS-Test.git
   cd CH-Product-Store-PW-TS-Test
```

2. Install the dependencies:

```bash
   npm install
```

3. Install Playwright browsers:

```bash
   npx playwright install
   npx playwright install-deps
```

4. Install the below extensions from visual studio code extensions.

```bash
   Playwright Test for VSCode
   Prettier - Code formatter
   open in browser
```

## Configuration

Create a `env` directory in the root of the project and add `.env.test` file in the `env` directory with the following environment variables. Don't forget to add your username and password.

```bash
TEST_ENV = "test"
BASE_URL = "https://www.demoblaze.com/index.html"
USERNAME = "<username>"
PASSWORD = "<password>"
ENABLE_LOGGING = false
```

## Running Tests

### Running Regression Tests

You can run tests and generate Allure results using the below commands from your terminal:

- This will clean previous Allure results, run all tests, and store results in `reports/allure-results/`.

From the root of the project run the below command

```bash
npm run regression
```

### Run Specific Test

```bash
npx playwright test path/to/test-file.spec.ts
```

### View test results:

```bash
npx playwright show-report
```

## Generating Allure Report as single file for sharing

After running tests, generate the Allure report as single html file. The report will be available
in `reports/allure-report/`:

```bash
allure generate reports/allure-results -o reports/allure-report --clean --single-file
```

## Project Structure

```
CH-PRODUCT-STORE-PW-TS-TEST/
│
├── .git/                   # Git hooks and configuration
│
├── env/                    # Environment-specific .env files
│
├── fixtures/               # Playwright fixtures for test setup, teardown, and page objects
│   ├── api.fixture.ts
│   ├── base-test.fixture.ts
│   ├── base.fixture.ts
│   ├── page.fixture.ts
│
├── page-objects/                  # Page Object Model files for the application
│   ├── base.page.ts
│   └── alerts/
│       ├── confirmation.alert.ts
│   └── modals/
│       ├── contact.modals.ts
│       ├── login.modals.ts
│       ├── place-order.modals.ts
│       ├── signup.modals.ts
│   └── pages/
│       ├── cart.page.ts
│       ├── home.page.ts
│       ├── product-details.page.ts
│
├── reports/                # Test reports (allure, html, json, etc.)
│
├── setup/                  # Global setup, teardown, environment loader, and cleanup scripts
│   ├── global.setup.ts
│   ├── global.teardown.ts
│   └── index.ts
│
├── tests/                  # UI test files
│
├── types/                  # Interfaces
│   └── pageInfo.type.ts
│
├── utils/                  # Utility functions and helpers
│   ├── directory.util.ts
│   └── error-messages.util.ts
│
├── .gitignore              # Git ignore configuration
├── .prettierignore         # Prettier ignore configuration files
├── .prettierrc             # Prettier configuration
├── .package-lock.json      # Dependency information
├── package.json            # Project dependencies and scripts
├── playwright.config.ts    # Playwright configuration file
├── README.md               # Project documentation
└── tsconfig.json           # Typescript configuration
```

---

## Key Features

- **Custom Fixtures:** Extend Playwright with custom fixtures for API, page objects, and environment setup.
- **Environment Management:** Dynamic loading of environment variables from `.env` files.
- **Reporting:** Supports HTML, JUnit, JSON, and Allure reports.
- **Global Setup/Teardown:** Automated environment and artifact cleanup before/after test runs.
- **Utilities:** Helpers for API requests, directory cleanup, error handling, JavaScript actions, and element visibility.
- **Page Object Model:** Organized and reusable page objects for maintainable UI tests.

---

## Scripts

- `npm run test:reg` - Run all regression tests in headless mode.
- `npm run test:reg:headed` - Run all regression tests in headed mode (Browser is visible).
- `npm run test:reg:debug` - Run the test in Playwirght UI mode, easy for debugging. More information [here](https://playwright.dev/docs/test-ui-mode)
- `npm run regression` - Run all regression tests in headed mode, generates and opens the allure report upon test run completion.
- `npx playwright test` - Run all tests.
- `npx playwright test path/to/test-file.spec.ts` - Run a specific test file.
- `npx playwright show-report` - Open the HTML test report.

---

## License

This project is for internal use only. All rights reserved.
