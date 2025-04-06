import { Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#email';
  private passwordInput = '#password';
  private submitButton = "//button[text()='Submit']";
  private logoutButton = 'button:has-text("Log out")';

  //Base URL
  private baseUrl = 'http://localhost:8080/signup';
  
  async url(){
    await this.page.goto(this.baseUrl);
  }


  // Fill the form
  async fillSignUpForm(firstName: string, lastName: string, email: string, password: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
  }

  // Click on the submit button
  async submitForm() {
    await this.page.locator(this.submitButton).click();
  }

  // Verify that Logout button is visible
  async verifyLogoutButtonVisible() {
    await this.page.locator(this.logoutButton).isVisible();
  }

  // Verify if the button is clickable
  async isSubmitButtonClickable() {
    try {
      const locator = this.page.locator(this.submitButton);
      await locator.waitFor(); // It waits until the element appears on DOM
      const isVisible = await locator.isVisible();
      const isEnabled = await locator.isEnabled();
  
      if (isVisible && isEnabled) {
        await locator.click(); 
        return true;
      }
  
      return false;
    } catch (error) {
      return false;
    }
  }
}