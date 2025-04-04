import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[0]

    await page
      .locator('#email') //Instead of using long locators that starts with "root..", I prefered to use "id" (email) as an locator
      .pressSequentially(existingUser.email)

    await page
      .locator('#password')//Instead of using long locators that starts with "root..", I prefered to use "id" (password) as an locator
      .pressSequentially(existingUser.password)


      const button = page.locator('form .MuiButton-sizeMedium')
      // Click on the button
      button.click()

    // Wait for 1 second until page is fully loaded
    //await page.waitForTimeout(1000)
    await page.waitForSelector('text=Log out', { visible: true });// Having a hard wait in a code might cause unacceptable issues. Log out message might appear in a 05. milisecond for example but in this case we would wait 0.5 second more.
                                                                  //Having {visible: true} will avoid the time waste
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
