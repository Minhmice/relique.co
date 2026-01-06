import { test, expect } from '@playwright/test';

/**
 * Web /verify flow smoke test
 * - Enter code -> loading ~5s -> display result -> save history
 */
test.describe('Web /verify flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('http://localhost:3000/verify');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should verify product code and show result', async ({ page }) => {
    await page.goto('http://localhost:3000/verify');
    
    // Enter product code
    const input = page.getByPlaceholder(/product ID|code/i);
    await input.fill('RLQ-QUAL-001');
    
    // Click verify button
    await page.getByRole('button', { name: /verify/i }).click();
    
    // Wait for loading (5s)
    await expect(page.getByText(/analyzing|loading/i)).toBeVisible();
    
    // Wait for result (5s + buffer)
    await expect(page.getByText(/result|qualified|inconclusive|disqualified/i)).toBeVisible({ timeout: 7000 });
    
    // Verify result table is displayed
    await expect(page.getByText(/product ID|item name|signatures/i)).toBeVisible();
  });

  test('should save result to history', async ({ page }) => {
    await page.goto('http://localhost:3000/verify');
    
    // Enter and verify
    await page.getByPlaceholder(/product ID|code/i).fill('RLQ-QUAL-001');
    await page.getByRole('button', { name: /verify/i }).click();
    
    // Wait for result
    await expect(page.getByText(/result|qualified|inconclusive|disqualified/i)).toBeVisible({ timeout: 7000 });
    
    // Save result
    await page.getByRole('button', { name: /save result/i }).click();
    
    // Verify saved state
    await expect(page.getByText(/saved/i)).toBeVisible();
    
    // Navigate to history
    await page.getByRole('button', { name: /view history/i }).click();
    
    // Verify history contains entry
    await expect(page.getByText(/RLQ-QUAL-001/i)).toBeVisible();
  });
});

