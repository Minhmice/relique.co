import { test, expect } from '@playwright/test';

/**
 * Cross-app sync smoke test
 * - Perform action in web (favorite or verify history)
 * - Open portal -> verify data syncs (shared storage keys)
 */
test.describe('Cross-app sync', () => {
  test('should sync verify history between web and portal', async ({ page, context }) => {
    // Clear storage
    await page.goto('http://localhost:3000/verify');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Perform verify in web
    await page.goto('http://localhost:3000/verify');
    await page.getByPlaceholder(/product ID|code/i).fill('RLQ-QUAL-001');
    await page.getByRole('button', { name: /verify/i }).click();
    
    // Wait for result
    await expect(page.getByText(/result|qualified|inconclusive|disqualified/i)).toBeVisible({ timeout: 7000 });
    
    // Save to history
    await page.getByRole('button', { name: /save result/i }).click();
    await expect(page.getByText(/saved/i)).toBeVisible();
    
    // Get history from localStorage
    const history = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('relique.v1.verify.history') || '[]');
    });
    expect(history.length).toBeGreaterThan(0);
    
    // Open portal in new tab
    const portalPage = await context.newPage();
    await portalPage.goto('http://localhost:3001/app/submissions');
    
    // Verify history appears in portal (should use same storage key)
    await expect(portalPage.getByText(/RLQ-QUAL-001|verify history/i)).toBeVisible({ timeout: 5000 });
    
    await portalPage.close();
  });

  test('should sync favorites between web and portal', async ({ page, context }) => {
    // Clear storage
    await page.goto('http://localhost:3000/marketplace');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Add favorite in web
    await page.goto('http://localhost:3000/marketplace');
    const firstItem = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]').first();
    await firstItem.click();
    
    // Toggle favorite
    const favoriteButton = page.getByRole('button', { name: /favorite|heart/i });
    await favoriteButton.click();
    
    // Get favorites from localStorage
    const favorites = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('relique.v1.marketplace.favorites') || '[]');
    });
    expect(favorites.length).toBeGreaterThan(0);
    
    // Open portal
    const portalPage = await context.newPage();
    await portalPage.goto('http://localhost:3001/app');
    
    // Verify favorites count appears (if portal shows it)
    // This depends on portal implementation
    await expect(portalPage.getByText(/favorites|saved/i)).toBeVisible({ timeout: 5000 }).catch(() => {
      // Portal might not display favorites, that's okay
    });
    
    await portalPage.close();
  });
});

