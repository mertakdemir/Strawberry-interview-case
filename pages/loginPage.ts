import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput = '#email';
  private passwordInput = '#password';
  private submitButton = 'form .MuiButton-sizeMedium';
  private logoutButton = 'button:has-text("Log out")';

  constructor(page: Page) {
    this.page = page;
  }

  //Base URL
  private baseUrl = 'http://localhost:8080/login';
  async url(){
    await this.page.goto(this.baseUrl);
  }

  // Entering the email and password
  async fillLoginForm(email: string, password: string) {
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
  }

  async fillLoginFormAfterSigningUp(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
  }

  // Clicking the login button
  async submitLogin() {
    await this.page.locator(this.submitButton).click();
  }

  // Verify that Log out button is visible
  async verifyLogoutButtonVisible() {
    await this.page.locator(this.logoutButton).isVisible();
  }
}