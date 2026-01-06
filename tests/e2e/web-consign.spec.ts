import { test, expect } from '@playwright/test';

/**
 * Web /consign flow smoke test
 * - Create draft -> fill fields -> upload files (mock) -> autosave -> refresh -> data persists
 */
test.describe('Web /consign flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/consign');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should create draft and fill form', async ({ page }) => {
    await page.goto('http://localhost:3000/consign');
    
    // Fill name
    await page.getByLabel(/name/i).fill('John Doe');
    
    // Fill email
    await page.getByLabel(/email/i).fill('john@example.com');
    
    // Fill description
    await page.getByLabel(/description|item description/i).fill('Test item description for consignment');
    
    // Verify form filled
    await expect(page.getByLabel(/name/i)).toHaveValue('John Doe');
    await expect(page.getByLabel(/email/i)).toHaveValue('john@example.com');
  });

  test('should autosave draft', async ({ page }) => {
    await page.goto('http://localhost:3000/consign');
    
    // Fill form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    
    // Wait for autosave debounce (usually 2s)
    await page.waitForTimeout(2500);
    
    // Verify draft saved to localStorage
    const drafts = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('relique.v1.consign.drafts') || 'null');
    });
    expect(drafts).toBeTruthy();
  });

  test('should restore draft on reload', async ({ page }) => {
    await page.goto('http://localhost:3000/consign');
    
    // Fill form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    
    // Wait for autosave
    await page.waitForTimeout(2500);
    
    // Reload page
    await page.reload();
    
    // Verify form restored
    await expect(page.getByLabel(/name/i)).toHaveValue('John Doe');
    await expect(page.getByLabel(/email/i)).toHaveValue('john@example.com');
  });
});

