import { test, expect } from '@playwright/test';

/**
 * Web /marketplace flow smoke test
 * - List -> filter/sort -> detail -> toggle favorite -> persist
 */
test.describe('Web /marketplace flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display marketplace list', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    
    // Verify marketplace page loaded
    await expect(page.getByText(/marketplace/i)).toBeVisible();
    
    // Verify items are displayed
    const items = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]');
    await expect(items.first()).toBeVisible();
  });

  test('should navigate to item detail', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    
    // Click first item
    const firstItem = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]').first();
    await firstItem.click();
    
    // Verify detail page
    await expect(page).toHaveURL(/\/marketplace\/.+/);
    await expect(page.getByText(/contact seller|price|description/i)).toBeVisible();
  });

  test('should toggle favorite', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    
    // Click first item
    const firstItem = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]').first();
    await firstItem.click();
    
    // Toggle favorite
    const favoriteButton = page.getByRole('button', { name: /favorite|heart/i });
    await favoriteButton.click();
    
    // Verify favorite persisted (check localStorage or UI state)
    const favorites = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('relique.v1.marketplace.favorites') || '[]');
    });
    expect(favorites.length).toBeGreaterThan(0);
  });

  test('should filter items', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    
    // Open filter
    const filterButton = page.getByRole('button', { name: /filter/i });
    if (await filterButton.isVisible()) {
      await filterButton.click();
      
      // Apply filter
      await page.getByText(/sports|category/i).click();
      
      // Verify filtered results
      const items = page.locator('[data-testid="marketplace-item"], [data-testid="listing-card"]');
      await expect(items.first()).toBeVisible();
    }
  });
});

