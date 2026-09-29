import { expect, test } from "@playwright/test";

test("home page renders the student-facing survey experience", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your voice shapes UVA Wise." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Take the survey/ })).toHaveAttribute("href", "/survey");
  await page.getByRole("link", { name: /Take the survey/ }).click();
  await expect(page.getByRole("heading", { name: "UVA Wise Campus Life Survey" })).toBeVisible();
  await expect(page.getByText("This is a front-end-only prototype")).toBeVisible();
});

test("survey flow validates required answers, preserves state, and resets correctly", async ({ page }) => {
  await page.goto("/survey");
  await page.getByRole("button", { name: "Start the survey" }).click();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Please select an option.")).toBeVisible();

  await page.getByRole("radio", { name: "Positive" }).check();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByRole("radio", { name: "Connected" }).check();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByRole("radio", { name: "Positive" })).toBeChecked();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("radio", { name: "Connected" }).check();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Please choose at least one option.")).toBeVisible();

  await page.getByRole("checkbox", { name: "Sense of belonging" }).check();
  await page.getByRole("checkbox", { name: "Academic support" }).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Finish" }).click();

  await expect(page.getByText("This demo does not save or send responses.")).toBeVisible();
  await page.getByRole("button", { name: "Start over" }).click();
  await expect(page.getByRole("heading", { name: "UVA Wise Campus Life Survey" })).toBeVisible();
});
