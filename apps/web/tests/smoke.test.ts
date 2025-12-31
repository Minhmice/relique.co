/**
 * Smoke Tests for Critical Flows
 * 
 * These tests verify that critical user flows work correctly.
 * Run with: pnpm test
 */

describe("Smoke Tests - Critical Flows", () => {
  describe("Flow 1: Home → Verify → Loading → Result → Save", () => {
    it("should navigate from home to verify page", () => {
      // Navigate to home
      cy.visit("/");
      cy.contains("Verify").click();
      cy.url().should("include", "/verify");
    });

    it("should submit verification and show loading", () => {
      cy.visit("/verify");
      cy.get('input[placeholder*="product ID"]').type("REL-2024-001");
      cy.contains("Verify").click();
      cy.contains("Analyzing").should("be.visible");
    });

    it("should show result after loading", () => {
      cy.visit("/verify");
      cy.get('input[placeholder*="product ID"]').type("REL-2024-001");
      cy.contains("Verify").click();
      cy.wait(6000); // Wait for 5s loading + buffer
      cy.contains("Result").should("be.visible");
    });

    it("should save result to history", () => {
      cy.visit("/verify");
      cy.get('input[placeholder*="product ID"]').type("REL-2024-001");
      cy.contains("Verify").click();
      cy.wait(6000);
      cy.contains("Save Result").click();
      cy.contains("Saved").should("be.visible");
    });
  });

  describe("Flow 2: Auth Mock - Login → Dashboard → Logout", () => {
    it("should login with email/password", () => {
      cy.visit("/login");
      cy.get('input[type="email"]').type("test@example.com");
      cy.get('input[type="password"]').type("password123");
      cy.contains("Login").click();
      cy.url().should("include", "/app");
    });

    it("should show dashboard after login", () => {
      cy.visit("/login");
      cy.get('input[type="email"]').type("test@example.com");
      cy.get('input[type="password"]').type("password123");
      cy.contains("Login").click();
      cy.contains("Dashboard").should("be.visible");
    });

    it("should logout and redirect to home", () => {
      // Assume already logged in
      cy.visit("/app");
      cy.contains("Log out").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Flow 3: Consign - Form → Upload → Autosave → Reload → Restore", () => {
    it("should fill consign form", () => {
      cy.visit("/consign");
      cy.get('input[name="name"]').type("John Doe");
      cy.get('input[name="email"]').type("john@example.com");
      cy.get('textarea[name="description"]').type("Test item description");
    });

    it("should upload files", () => {
      cy.visit("/consign");
      cy.get('input[type="file"]').attachFile("test-image.jpg");
      cy.contains("Upload").should("be.visible");
    });

    it("should autosave draft", () => {
      cy.visit("/consign");
      cy.get('input[name="name"]').type("John Doe");
      cy.wait(2000); // Wait for autosave debounce
      // Draft should be saved to localStorage
    });

    it("should restore draft on reload", () => {
      cy.visit("/consign");
      cy.get('input[name="name"]').type("John Doe");
      cy.wait(2000);
      cy.reload();
      cy.get('input[name="name"]').should("have.value", "John Doe");
    });
  });

  describe("Flow 4: Marketplace - List → Detail → Back → Filter", () => {
    it("should show marketplace list", () => {
      cy.visit("/marketplace");
      cy.contains("Marketplace").should("be.visible");
      cy.get('[data-testid="marketplace-item"]').should("have.length.greaterThan", 0);
    });

    it("should navigate to item detail", () => {
      cy.visit("/marketplace");
      cy.get('[data-testid="marketplace-item"]').first().click();
      cy.url().should("include", "/marketplace/");
      cy.contains("Contact Seller").should("be.visible");
    });

    it("should go back to list", () => {
      cy.visit("/marketplace");
      cy.get('[data-testid="marketplace-item"]').first().click();
      cy.go("back");
      cy.url().should("include", "/marketplace");
    });

    it("should filter items", () => {
      cy.visit("/marketplace");
      cy.get('button[aria-label*="filter"]').click();
      cy.contains("Sports").click();
      cy.get('[data-testid="marketplace-item"]').should("have.length.greaterThan", 0);
    });
  });
});

