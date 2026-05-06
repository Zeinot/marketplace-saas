import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("has title and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SaaS Directory/);
    await expect(page.getByRole("heading", { name: /SaaS builders/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore Products/i })).toBeVisible();
  });

  test("can navigate to pricing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /View Pricing/i }).click();
    await expect(page).toHaveURL(/pricing/);
    await expect(page.getByRole("heading", { name: /Simple pricing/i })).toBeVisible();
  });
});

test.describe("Auth", () => {
  test("can navigate to login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Log in/i }).first().click();
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole("button", { name: /Sign in/i })).toBeVisible();
  });

  test("can navigate to signup", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Sign up/i }).first().click();
    await expect(page).toHaveURL(/signup/);
    await expect(page.getByRole("button", { name: /Create account/i })).toBeVisible();
  });
});
