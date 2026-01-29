import { test as baseTest } from "./base-test.fixture";

//Import DemoBlaze page objects
import { HomePage } from "../page-objects/pages/home.page";
import { ProductDetailPage } from "../page-objects/pages/product-details.page";
import { CartPage } from "../page-objects/pages/cart.page";
import { LoginModal } from "../page-objects/modals/login.modal";
import { SignupModal } from "../page-objects/modals/signup.modal";
import { ContactModal } from "../page-objects/modals/contact.modal";
import { PlaceOrderModal } from "../page-objects/modals/place-order.modal";
import { ConfirmationAlert } from "../page-objects/alerts/confirmation.alert";

type DemoBlazePageFixture = {
  //DemoBlaze Pages
  homePage: HomePage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;

  //Modals
  placeOrderModal: PlaceOrderModal;
  loginModal: LoginModal;
  signupModal: SignupModal;
  contactModal: ContactModal;

  //Alerts
  confirmationAlert: ConfirmationAlert;
};

// Initialize the DemoBlaze page objects with instances
export const test = baseTest.extend<DemoBlazePageFixture>({
  //DemoBlaze Pages
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  //Modals
  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },
  signupModal: async ({ page }, use) => {
    await use(new SignupModal(page));
  },
  contactModal: async ({ page }, use) => {
    await use(new ContactModal(page));
  },
  placeOrderModal: async ({ page }, use) => {
    await use(new PlaceOrderModal(page));
  },

  //Alerts
  confirmationAlert: async ({ page }, use) => {
    await use(new ConfirmationAlert(page));
  },
});
