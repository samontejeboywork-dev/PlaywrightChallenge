import { test, expect } from '@playwright/test';

test.describe('Spree Commerce E2E Challenge', () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const userEmail = `testuser_${randomNumber}@example.com`;
  const userPassword = 'Password123!';

test('Complete User Journey: Signup, Login, Shop, and Checkout', async ({ page }) => {

    await test.step('Navigate to Spree Commerce demo store', async () => {
      await page.goto('https://demo.spreecommerce.org/');
      await expect(page).toHaveTitle(/Spree/);
    });

    await test.step('Sign Up as a new user', async () => {
      await page.getByRole('button', { name: 'Open account panel' }).click();      
      await page.getByRole('link', { name: 'Sign up' }).click();
      await page.waitForTimeout(3000); 
 
      await page.getByRole('textbox', { name: 'Email' }).fill(userEmail);
      await page.getByRole('textbox', { name: 'Password', exact: true }).fill(userPassword);
      await page.getByRole('textbox', { name: 'Password Confirmation' }).fill(userPassword);
      await page.getByRole('button', { name: 'Sign Up' }).click();
      
    });

    await test.step('Browse products and open a product detail page', async () => {
      await page.locator('#block-6474').getByRole('link', { name: 'Shop All' }).click();
      await page.getByRole('img', { name: 'Ripped T-Shirt primary image' }).click();
      await page.locator('#block-40852').getByRole('button', { name: 'Add to wishlist' }).click();
      await page.getByRole('link', { name: 'Open wishlist' }).click();
    });

    await test.step('Add the product to cart', async () => {
      await page.getByRole('button', { name: 'Add To Cart' }).click();
    });

    await test.step('Go to cart and verify details', async () => {
      await page.getByRole('link', { name: 'Cart' }).click();
    });

    await test.step('Proceed to checkout and complete order', async () => {
    await page.getByRole('link', { name: 'Checkout' }).click();

    await page.getByRole('textbox', { name: 'First name' }).fill('Juan')
    await page.getByRole('textbox', { name: 'Last name' }).fill('Dela Cruz');
    await page.waitForTimeout(3000); 
    await page.getByRole('textbox', { name: 'Street and house number' }).fill('111');
    await page.waitForTimeout(3000); 
    await page.getByRole('option', { name: '1111 Franklin Avenue, Garden' }).click();  
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: 'Save and Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Shipping' })).toBeVisible();
    await page.getByRole('button', { name: 'Save and Continue' }).click();
    await page.locator('iframe[name="__privateStripeFrame1946"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
    await page.locator('iframe[name="__privateStripeFrame1946"]').contentFrame().getByRole('textbox', { name: 'Expiration date MM / YY' }).fill('12 / 26');
    await page.locator('iframe[name="__privateStripeFrame1946"]').contentFrame().getByRole('textbox', { name: 'Security code' }).fill('123');
    await page.getByRole('button', { name: 'Pay now' }).click();
});

    await test.step('Verify Order Confirmation and Assertions', async () => {
    await expect(page.getByText('Order placed successfully')).toBeVisible({ timeout: 15000 });
      
    const orderNumber = page.locator('.order-number');
    await expect(orderNumber).toBeVisible();
    });
  });
});