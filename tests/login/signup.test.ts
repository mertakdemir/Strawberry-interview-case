import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../pages/signupPage';
import { LoginPage } from '../../pages/loginPage';

test.describe.configure({ mode: 'serial' });

test.describe('Sign up form validations', () => {
  let signUpPage: SignUpPage;
  let loginPage : LoginPage;
  let page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    signUpPage = new SignUpPage(page);
    await signUpPage.url();
  });

  const generateValidData = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 9 }),
  });

  test('should sign up successfully with valid data', async () => {
    const { firstName, lastName, email, password } = generateValidData();

    await signUpPage.fillSignUpForm(firstName, lastName, email, password);
    await signUpPage.submitForm();
    await signUpPage.verifyLogoutButtonVisible(); // Success check

    loginPage = new LoginPage(page); 
    await loginPage.url();
    await loginPage.fillLoginForm(email, password);  //Verifies that Log in can be done with the User created in the Sign Up phase.
    await loginPage.submitLogin();
    await loginPage.verifyLogoutButtonVisible();

  });

  test('should not sign up without first name', async () => {
    const { lastName, email, password } = generateValidData();

    await signUpPage.fillSignUpForm('', lastName, email, password);
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });

  test('should not sign up without last name', async () => {
    const { firstName, email, password } = generateValidData();

    await signUpPage.fillSignUpForm(firstName, '', email, password);
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });

  test('should not sign up without email', async () => {
    const { firstName, lastName, password } = generateValidData();

    await signUpPage.fillSignUpForm(firstName, lastName, '', password);
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });

  test('should not sign up without password', async () => {
    const { firstName, lastName, email } = generateValidData();

    await signUpPage.fillSignUpForm(firstName, lastName, email, '');
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });

  test('should not sign up with a password shorter than 9 characters', async () => {
    const { firstName, lastName, email } = generateValidData();
    const shortPassword = faker.internet.password({ length: 8 });

    await signUpPage.fillSignUpForm(firstName, lastName, email, shortPassword);
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });

  test('should not accept invalid email format', async () => {
    const { firstName, lastName, password } = generateValidData();
    const invalidEmail = 'invalid-email-format';

    await signUpPage.fillSignUpForm(firstName, lastName, invalidEmail, password);
    const isButtonClickable = await signUpPage.isSubmitButtonClickable();

    expect(isButtonClickable).toBe(false);
  });
});
