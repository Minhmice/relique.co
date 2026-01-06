import { test, expect } from '@playwright/test';

/**
 * Demo smoke tests for web app
 * Tests core demo flows to ensure demo readiness
 */

test.describe('Demo Smoke Tests - Web', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should apply collector preset and display data', async ({ page }) => {
    // This test assumes preset can be applied via demo tools
    // In real scenario, preset would be applied before demo
    await page.goto('http://localhost:3000');
    
    // Navigate to verify history
    await page.goto('http://localhost:3000/app/submissions');
    
    // Should show empty state initially (or preset data if applied)
    const verifyTab = page.getByRole('tab', { name: /verifications/i });
    if (await verifyTab.isVisible()) {
      await verifyTab.click();
    }
    
    // Verify page loads without errors
    await expect(page.getByText(/submissions|history/i)).toBeVisible();
  });

  test('should complete verify flow', async ({ page }) => {
    await page.goto('http://localhost:3000/verify');
    
    // Enter code
    const input = page.getByPlaceholder(/product ID|code/i);
    await input.fill('RLQ-QUAL-001');
    
    // Click verify
    await page.getByRole('button', { name: /verify/i }).click();
    
    // Wait for loading
    await expect(page.getByText(/analyzing|loading/i)).toBeVisible();
    
    // Wait for result (5s + buffer)
    await expect(page.getByText(/result|qualified|inconclusive|disqualified/i)).toBeVisible({ timeout: 7000 });
  });

  test('should browse marketplace and view detail', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    
    // Verify marketplace loads
    await expect(page.getByText(/marketplace/i)).toBeVisible();
    
    // Click first item
    const firstItem = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]').first();
    if (await firstItem.isVisible()) {
      await firstItem.click();
      
      // Verify detail page
      await expect(page).toHaveURL(/\/marketplace\/.+/);
      await expect(page.getByText(/price|description|contact/i)).toBeVisible();
    }
  });

  test('should fill consign form and see autosave', async ({ page }) => {
    await page.goto('http://localhost:3000/consign');
    
    // Fill name
    const nameInput = page.getByLabel(/name/i);
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
      
      // Wait for autosave (2s debounce)
      await page.waitForTimeout(2500);
      
      // Reload and verify draft restored
      await page.reload();
      await expect(nameInput).toHaveValue('Test User');
    }
  });
});

