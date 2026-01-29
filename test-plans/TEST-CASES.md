# DemoBlaze Product Store - Comprehensive Test Suite

## Overview

This test suite covers comprehensive testing of the DemoBlaze product store website including all user interactions, e-commerce functionality, and edge cases.

**Test Environment**: https://www.demoblaze.com/index.html  
**Browsers**: Chrome, Firefox, Safari  
**Test Automation Framework**: Playwright, TypeScript, Allure  
**Starting State**: Fresh browser session, no authentication unless specified

---

## Test Summary Overview

### Test Catalog by Priority

| Test ID                 | Test Name                              | Category        |
| ----------------------- | -------------------------------------- | --------------- |
| **HIGH PRIORITY TESTS** |                                        |
| TC001                   | Page Load and Layout Verification      | Navigation      |
| TC002                   | Product Category Navigation - Phones   | Navigation      |
| TC006                   | Product Detail Page Access             | Product Details |
| TC007                   | Add Product to Cart (Guest User)       | Cart Management |
| TC008                   | Add Multiple Different Products        | Cart Management |
| TC009                   | Cart Page Functionality                | Cart Management |
| TC010                   | Remove Product from Cart               | Cart Management |
| TC012                   | User Registration - Valid New User     | Authentication  |
| TC013                   | User Registration - Duplicate Username | Authentication  |
| TC015                   | User Login - Valid Credentials         | Authentication  |
| TC016                   | User Login - Invalid Credentials       | Authentication  |
| TC018                   | Complete Purchase Flow - Valid Order   | Purchase Flow   |
| TC019                   | Purchase Order - Field Validation      | Purchase Flow   |
| TC020                   | Purchase Order - Invalid Credit Card   | Purchase Flow   |
| TC032                   | Input Sanitization Testing             | Security        |
| TC033                   | Session Management Security            | Security        |

| Test ID                   | Test Name                              | Category        |
| ------------------------- | -------------------------------------- | --------------- |
| **MEDIUM PRIORITY TESTS** |                                        |
| TC003                     | Product Category Navigation - Laptops  | Navigation      |
| TC004                     | Product Category Navigation - Monitors | Navigation      |
| TC005                     | Product Pagination                     | Navigation      |
| TC011                     | Empty Cart State                       | Cart Management |
| TC014                     | User Registration - Edge Cases         | Authentication  |
| TC017                     | User Login - Edge Cases                | Authentication  |
| TC021                     | Purchase Order - Edge Cases            | Purchase Flow   |
| TC022                     | Contact Form Functionality             | Contact & About |
| TC023                     | Contact Form Validation                | Contact & About |
| TC025                     | Mobile Responsive Design               | UI/UX           |
| TC026                     | Cross-Browser Compatibility            | UI/UX           |
| TC027                     | Accessibility Testing                  | UI/UX           |
| TC028                     | Network Failure Simulation             | Error Handling  |
| TC029                     | Rapid User Actions Handling            | Error Handling  |
| TC030                     | Data Persistence Testing               | Error Handling  |
| TC034                     | Backend API Integration                | Integration     |

| Test ID                | Test Name              | Category        |
| ---------------------- | ---------------------- | --------------- |
| **LOW PRIORITY TESTS** |                        |
| TC024                  | About Us Modal         | Contact & About |
| TC031                  | Performance Validation | Performance     |

### Test Complexity & Time Estimates

| Complexity | Test Count | Test IDs                                                                                         |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------ |
| **Low**    | 8          | TC001, TC002, TC003, TC004, TC006, TC011, TC024                                                  |
| **Medium** | 14         | TC005, TC007, TC008, TC009, TC010, TC012, TC013, TC015, TC016, TC022, TC023, TC025, TC030        |
| **High**   | 12         | TC014, TC017, TC018, TC019, TC020, TC021, TC026, TC027, TC028, TC029, TC031, TC032, TC033, TC034 |

### Test Statistics

- **Total Tests**: 34
- **Automated**: 10 (29.4%)
- **Pending**: 24 (70.6%)
- **Total Estimated Time**: 23.5 hours

### Priority Distribution

| Priority | Total | Automated | Pending | % Complete |
| -------- | ----- | --------- | ------- | ---------- |
| High     | 16    | 6         | 10      | 37.5%      |
| Medium   | 16    | 4         | 12      | 25.0%      |
| Low      | 2     | 0         | 2       | 0%         |

### Category Distribution

| Category        | Total | Automated | Pending | Priority Focus | Est. Time (hrs) |
| --------------- | ----- | --------- | ------- | -------------- | --------------- |
| Cart Management | 5     | 3         | 2       | High           | 3.75            |
| Authentication  | 6     | 2         | 4       | High           | 5.25            |
| Purchase Flow   | 4     | 2         | 2       | High           | 4.0             |
| Navigation      | 5     | 2         | 3       | High           | 2.25            |
| Contact & About | 3     | 1         | 2       | Medium         | 1.75            |
| UI/UX           | 3     | 0         | 3       | Medium         | 4.5             |
| Error Handling  | 3     | 0         | 3       | Medium         | 2.0             |
| Security        | 2     | 0         | 2       | High           | 1.75            |
| Product Details | 1     | 0         | 1       | High           | 0.25            |
| Performance     | 1     | 0         | 1       | Low            | 1.0             |
| Integration     | 1     | 0         | 1       | Medium         | 0.75            |

---

## Test Execution Plan

### Phase 1: Core Functionality

- **High Priority Tests**: TC001, TC002, TC006, TC007, TC010, TC012, TC015, TC018, TC019, TC032, TC033
- **Focus**: Basic navigation, cart operations, authentication, and security
- **Goal**: Ensure core user journeys work correctly

### Phase 2: Extended Functionality

- **Medium Priority Tests**: TC003, TC004, TC005, TC009, TC011, TC013, TC016, TC020, TC021, TC022, TC023
- **Focus**: Additional categories, edge cases, and form validation
- **Goal**: Comprehensive coverage of main features

### Phase 3: Quality & Performance

- **UI/UX & Performance Tests**: TC025, TC026, TC027, TC028, TC029, TC030, TC031
- **Focus**: User experience, accessibility, and system reliability
- **Goal**: Ensure production readiness

### Phase 4: Security & Integration

- **Security & Integration Tests**: TC014, TC017, TC024, TC034
- **Focus**: Security validation and system integration
- **Goal**: Validate security measures and API integrations

---

## Test Environment Setup

### Prerequisites

- #### Manual
  - **Browsers**: Chrome (latest), Firefox (latest), Safari (latest)
  - **Access**: Access to DemoBlaze Product Store website
  - **Availability**: The website should be up and running in the testing environment.
  - **Credentials**: User credentials for logging into website

- #### Automation
  - **Repository**: Pull the github repository from [link](https://github.com/kishkk84/CH-Product-Store-PW-TS-Test.git)
  - **Setup**: Run `npm run setup` command from root
  - **Test Framework**: Playwright TypeScript
  - **Reporting**: Allure Reports
  - **Test Data**: Faker.js for dynamic data generation
  - **CI/CD**: GitHub Actions integration

### Test Data Management

- **User Accounts**: Pre-created test accounts for login scenarios
- **Product Data**: Use live product data from demo site
- **Payment Data**: Test credit card numbers for purchase flows
- **Environment Variables**: Configurable variables and URLs

### Success Criteria

- **Functional Coverage**: 100% of High priority tests pass
- **Cross-Browser**: All tests pass on Chrome, Firefox, Safari
- **Performance**: Page load times < 3 seconds
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: No critical vulnerabilities found  
  <br>

---

## Detailed Test Specifications

### Navigation Tests

| Test ID                                           | Test Steps                                                                                                                                                                                                                                                                                                                                                           | Expected Results                                                                                                                                                                        | Edge Cases                                                                                                                   |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **TC001: Page Load and Layout Verification**      |                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                         |
|                                                   | 1. Navigate to https://www.demoblaze.com/index.html<br>2. Verify page title contains "STORE"<br>3. Verify header navigation displays: PRODUCT STORE, Home, Contact, About us, Cart, Log in, Sign up<br>4. Verify categories sidebar shows: Phones, Laptops, Monitors<br>5. Verify product carousel/grid displays products<br>6. Verify footer information is present | - Page loads completely within 3 seconds<br>- All navigation elements are visible and clickable<br>- Product grid displays with images and prices<br>- Footer shows contact information | - Test with slow network connection<br>- Test with JavaScript disabled<br>- Test with ad blockers enabled                    |
| **TC002: Product Category Navigation - Phones**   |                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                         |
|                                                   | 1. From home page, click "Phones" in categories sidebar<br>2. Wait for page to load and products to display<br>3. Verify URL contains phones category reference<br>4. Verify only phone products are displayed<br>5. Count number of phone products shown<br>6. Verify each product has: image, title, price, description                                            | - Category filter works correctly<br>- Only phone products displayed<br>- All products have required information<br>- URL updates appropriately                                         | - Test with no JavaScript<br>- Test with very slow connection<br>- Test rapid category switching                             |
| **TC003: Product Category Navigation - Laptops**  |                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                         |
|                                                   | 1. From home page, click "Laptops" in categories sidebar<br>2. Wait for page to load and products to display<br>3. Verify URL contains laptops category reference<br>4. Verify only laptop products are displayed<br>5. Count number of laptop products shown<br>6. Verify each product has complete information                                                     | - Category filter works correctly<br>- Only laptop products displayed<br>- All products have required information<br>- URL updates appropriately                                        | - Test category switching between different categories<br>- Test browser back/forward navigation<br>- Test direct URL access |
| **TC004: Product Category Navigation - Monitors** |                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                         |
|                                                   | 1. From home page, click "Monitors" in categories sidebar<br>2. Wait for page to load and products to display<br>3. Verify URL contains monitors category reference<br>4. Verify only monitor products are displayed<br>5. Count number of monitor products shown<br>6. Verify each product has complete information                                                 | - Category filter works correctly<br>- Only monitor products displayed<br>- All products have required information<br>- URL updates appropriately                                       | - Test rapid consecutive clicks<br>- Test with browser refresh<br>- Test session persistence                                 |
| **TC005: Product Pagination**                     |                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                         |
|                                                   | 1. Load home page with all products<br>2. Scroll to bottom to check for pagination<br>3. If pagination exists, click "Next" button<br>4. Verify new products load<br>5. Click "Previous" button to return<br>6. Test direct page number clicking if available                                                                                                        | - Pagination controls work smoothly<br>- Products load correctly on each page<br>- Page numbers update appropriately<br>- Navigation is intuitive                                       | - Test with disabled JavaScript<br>- Test rapid pagination clicks<br>- Test browser navigation with paginated results        |

---

### Product Detail Tests

| Test ID                               | Test Steps                                                                                                                                                                                                                                                                         | Expected Results                                                                                                                                  | Edge Cases                                                                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **TC006: Product Detail Page Access** |                                                                                                                                                                                                                                                                                    |                                                                                                                                                   |
|                                       | 1. From home page, click on any product title/image<br>2. Verify product detail page loads<br>3. Verify product name, price, description display<br>4. Verify product image is shown<br>5. Verify "Add to cart" button is present<br>6. Test browser back button to return to home | - Product detail page loads correctly<br>- All product information displayed<br>- Navigation works properly<br>- Add to cart button is functional | - Test with products having long descriptions<br>- Test with products missing images<br>- Test with special characters in product names |

---

### Cart Management Tests

| Test ID                                            | Test Steps                                                                                                                                                                                                                                                       | Expected Results                                                                                                                                        | Edge Cases                                                                                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **TC007: Add Product to Cart (Guest User)**        |                                                                                                                                                                                                                                                                  |                                                                                                                                                         |
|                                                    | 1. Navigate to any product detail page<br>2. Click "Add to cart" button<br>3. Handle confirmation alert if present<br>4. Navigate to cart page<br>5. Verify product appears in cart<br>6. Verify correct price and product details                               | - Product successfully added to cart<br>- Confirmation message displayed<br>- Cart shows correct product and price<br>- Cart counter updates if present | - Test adding while not logged in<br>- Test adding same product multiple times<br>- Test with rapid consecutive clicks                                 |
| **TC008: Add Multiple Different Products to Cart** |                                                                                                                                                                                                                                                                  |                                                                                                                                                         |
|                                                    | 1. Add first product to cart from detail page<br>2. Return to home or navigate to different product<br>3. Add second different product to cart<br>4. Repeat for third product<br>5. Navigate to cart page<br>6. Verify all products present with correct details | - Multiple products successfully added<br>- Cart maintains all products<br>- Correct quantities and prices shown<br>- Total calculation is accurate     | - Test adding products from different categories<br>- Test with maximum number of different products<br>- Test session persistence across page reloads |
| **TC009: Cart Page Functionality**                 |                                                                                                                                                                                                                                                                  |                                                                                                                                                         |
|                                                    | 1. Add products to cart<br>2. Navigate to cart page<br>3. Verify all cart functionalities: view, edit quantities, remove<br>4. Test total price calculation<br>5. Test "Place Order" button presence<br>6. Test empty cart scenarios                             | - Cart displays all added products<br>- Quantities can be modified<br>- Total price updates correctly<br>- Place Order button works                     | - Test with empty cart<br>- Test with large quantities<br>- Test cart persistence across sessions                                                      |
| **TC010: Remove Product from Cart**                |                                                                                                                                                                                                                                                                  |                                                                                                                                                         |
|                                                    | 1. Add multiple products to cart<br>2. Navigate to cart page<br>3. Click "Delete" button for one product<br>4. Verify product is removed<br>5. Verify total price updates<br>6. Verify remaining products still present                                          | - Product successfully removed<br>- Cart total updates correctly<br>- Other products remain unaffected<br>- UI updates properly                         | - Test removing all products one by one<br>- Test removing while other users might be accessing<br>- Test undo functionality if available              |
| **TC011: Empty Cart State**                        |                                                                                                                                                                                                                                                                  |                                                                                                                                                         |
|                                                    | 1. Remove all products from cart OR start with empty cart<br>2. Navigate to cart page<br>3. Verify empty cart message<br>4. Verify no checkout options available<br>5. Test navigation back to shopping                                                          | - Appropriate empty cart message shown<br>- No checkout buttons available<br>- Clear call-to-action to continue shopping                                | - Test empty cart after removing all items<br>- Test direct navigation to cart when empty<br>- Test browser refresh with empty cart                    |

### Authentication Tests

| Test ID                                           | Test Steps                                                                                                                                                                                                       | Expected Results                                                                                                                                     | Edge Cases                                                                                                                                           |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TC012: User Registration - Valid New User**     |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Click "Sign up" in header navigation<br>2. Enter unique username<br>3. Enter password<br>4. Click "Sign up" button<br>5. Handle success/error messages<br>6. Verify account creation success                  | - Registration form submits successfully<br>- Success message displayed<br>- User can log in with new credentials<br>- Appropriate feedback provided | - Test with very long usernames<br>- Test with special characters<br>- Test with minimum/maximum password lengths                                    |
| **TC013: User Registration - Duplicate Username** |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Click "Sign up" in header navigation<br>2. Enter existing username<br>3. Enter password<br>4. Click "Sign up" button<br>5. Verify error message for duplicate username                                        | - Appropriate error message displayed<br>- Registration does not complete<br>- User remains on registration form<br>- Clear guidance provided        | - Test with case variations of existing username<br>- Test with usernames that are subsets of existing ones<br>- Test rapid successive registrations |
| **TC014: User Registration - Edge Cases**         |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Test empty username field<br>2. Test empty password field<br>3. Test special characters in username<br>4. Test very long username/password<br>5. Test whitespace handling<br>6. Test form validation messages | - Proper validation messages displayed<br>- Form prevents invalid submissions<br>- Clear error messaging<br>- Accessible error handling              | - Test with only whitespace characters<br>- Test with SQL injection attempts<br>- Test with extremely long inputs                                    |
| **TC015: User Login - Valid Credentials**         |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Click "Log in" in header navigation<br>2. Enter valid registered username<br>3. Enter correct password<br>4. Click "Log in" button<br>5. Verify successful login<br>6. Verify user state changes in UI        | - Login successful<br>- User state changes in header<br>- Welcome message or name display<br>- Access to user-specific features                      | - Test with different valid user accounts<br>- Test login persistence across browser sessions<br>- Test login after registration                     |
| **TC016: User Login - Invalid Credentials**       |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Click "Log in" in header navigation<br>2. Enter invalid username or password<br>3. Click "Log in" button<br>4. Verify error message<br>5. Verify user remains logged out<br>6. Test form reset functionality  | - Appropriate error message displayed<br>- User remains in logged out state<br>- Form allows retry<br>- Security measures in place                   | - Test with completely wrong credentials<br>- Test with correct username, wrong password<br>- Test with wrong username, correct password             |
| **TC017: User Login - Edge Cases**                |                                                                                                                                                                                                                  |                                                                                                                                                      |
|                                                   | 1. Test empty username field<br>2. Test empty password field<br>3. Test whitespace in credentials<br>4. Test case sensitivity<br>5. Test special characters<br>6. Test very long inputs                          | - Proper validation messages<br>- Form prevents invalid submissions<br>- Security measures active<br>- User-friendly error messages                  | - Test with injection attempts<br>- Test with Unicode characters<br>- Test with extremely long inputs                                                |

---

### Purchase Flow Tests

| Test ID                                              | Test Steps                                                                                                                                                                                                                                                     | Expected Results                                                                                                                                  | Edge Cases                                                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **TC018: Complete Purchase Flow - Valid Order**      |                                                                                                                                                                                                                                                                |                                                                                                                                                   |
|                                                      | 1. Add products to cart<br>2. Navigate to cart and click "Place Order"<br>3. Fill out all required fields (Name, Country, City, Card, Month, Year)<br>4. Click "Purchase" button<br>5. Verify purchase confirmation<br>6. Verify order details in confirmation | - Purchase completes successfully<br>- Confirmation message with order details<br>- Cart clears after purchase<br>- Appropriate thank you message | - Test with different credit card formats<br>- Test with international addresses<br>- Test with minimum and maximum field lengths |
| **TC019: Purchase Order - Field Validation**         |                                                                                                                                                                                                                                                                |                                                                                                                                                   |
|                                                      | 1. Navigate to place order form<br>2. Test each required field validation<br>3. Submit with empty fields<br>4. Submit with invalid data formats<br>5. Verify validation messages<br>6. Test successful submission with valid data                              | - All required fields validated<br>- Clear validation messages<br>- Form prevents invalid submissions<br>- Successful submission with valid data  | - Test with special characters in all fields<br>- Test with very long text in fields<br>- Test with numeric values in text fields |
| **TC020: Purchase Order - Invalid Credit Card Data** |                                                                                                                                                                                                                                                                |                                                                                                                                                   |
|                                                      | 1. Fill out purchase form<br>2. Enter invalid credit card number<br>3. Enter invalid expiry dates<br>4. Test various invalid combinations<br>5. Verify appropriate error handling<br>6. Test recovery with valid data                                          | - Invalid card data rejected<br>- Clear error messages displayed<br>- Form allows correction<br>- Valid data accepted after correction            | - Test with expired cards<br>- Test with impossible dates<br>- Test with known test card numbers                                  |
| **TC021: Purchase Order - Edge Cases**               |                                                                                                                                                                                                                                                                |                                                                                                                                                   |
|                                                      | 1. Test purchase with empty cart<br>2. Test purchase without login<br>3. Test purchase with session timeout<br>4. Test purchase with network interruption<br>5. Test purchase with JavaScript disabled<br>6. Test purchase form accessibility                  | - Appropriate handling of edge cases<br>- Clear error messages<br>- Graceful degradation<br>- Accessible form interactions                        | - Test with extremely large orders<br>- Test with rapid form submissions<br>- Test with browser refresh during purchase           |

---

### Contact & About Tests

| Test ID   | Objective               | Key Steps                                            | Pass Criteria                                       |
| --------- | ----------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| **TC022** | Contact form submission | Fill form → Submit → Verify confirmation             | Form submits, confirmation shown, form clears       |
| **TC023** | Contact form validation | Test empty fields → Invalid formats → Check messages | Proper validation, clear messages, prevents invalid |
| **TC024** | About Us modal          | Click About → Check content → Test close             | Modal opens, content readable, close works          |

### UI/UX Tests

| Test ID   | Objective                   | Key Steps                                      | Pass Criteria                              |
| --------- | --------------------------- | ---------------------------------------------- | ------------------------------------------ |
| **TC025** | Mobile responsiveness       | Test devices → Check navigation → Verify forms | Fully functional on mobile, touch-friendly |
| **TC026** | Cross-browser compatibility | Test Chrome/Firefox/Safari → Check consistency | Consistent functionality across browsers   |
| **TC027** | Accessibility compliance    | Screen readers → Keyboard nav → Color contrast | Accessible to users with disabilities      |

### Error Handling Tests

| Test ID   | Objective                | Key Steps                                         | Pass Criteria                                    |
| --------- | ------------------------ | ------------------------------------------------- | ------------------------------------------------ |
| **TC028** | Network failure handling | Disconnect → Attempt actions → Reconnect          | Graceful degradation, recovery on reconnection   |
| **TC029** | Rapid action handling    | Rapid clicks → Fast submissions → Check stability | System handles actions gracefully, no corruption |
| **TC030** | Data persistence         | Add items → Refresh → Check persistence           | Data persists appropriately across sessions      |

### Performance Tests

| Test ID   | Objective              | Key Steps                                                   | Pass Criteria                                             |
| --------- | ---------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| **TC031** | Performance validation | Measure load times → Test slow connections → Monitor memory | Page loads <3s, responsive interactions, efficient memory |

### Security Tests

| Test ID   | Objective          | Key Steps                                       | Pass Criteria                                   |
| --------- | ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| **TC032** | Input sanitization | SQL injection → XSS attempts → Script injection | Malicious input blocked, proper sanitization    |
| **TC033** | Session management | Test timeouts → Concurrent sessions → Logout    | Secure session management, appropriate timeouts |

### Integration Tests

| Test ID   | Objective       | Key Steps                                           | Pass Criteria                                |
| --------- | --------------- | --------------------------------------------------- | -------------------------------------------- |
| **TC034** | API integration | Monitor requests → Test endpoints → Check responses | API integrations work, proper error handling |
