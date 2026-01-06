import { test, expect } from '@playwright/test';

/**
 * Demo smoke tests for portal app
 * Tests portal-specific flows
 */

test.describe('Demo Smoke Tests - Portal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/app');
  });

  test('should display dashboard', async ({ page }) => {
    await page.goto('http://localhost:3001/app');
    
    // Verify dashboard loads
    await expect(page.getByText(/welcome|dashboard/i)).toBeVisible();
  });

  test('should show submissions center', async ({ page }) => {
    await page.goto('http://localhost:3001/app/submissions');
    
    // Verify submissions page loads
    await expect(page.getByText(/submissions|verifications/i)).toBeVisible();
  });

  test('should sync verify history from web', async ({ page, context }) => {
    // First, perform verify in web
    const webPage = await context.newPage();
    await webPage.goto('http://localhost:3000/verify');
    await webPage.getByPlaceholder(/product ID|code/i).fill('RLQ-QUAL-001');
    await webPage.getByRole('button', { name: /verify/i }).click();
    await expect(webPage.getByText(/result|qualified/i)).toBeVisible({ timeout: 7000 });
    await webPage.getByRole('button', { name: /save result/i }).click();
    await webPage.close();
    
    // Then check portal
    await page.goto('http://localhost:3001/app/submissions');
    
    // Verify history should appear (may need to wait for sync)
    await expect(page.getByText(/RLQ-QUAL-001|verify history/i)).toBeVisible({ timeout: 5000 });
  });
});

