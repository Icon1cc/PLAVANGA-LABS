import { expect, test } from "@playwright/test";

test("homepage is responsive and exposes every primary section", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  await expect(
    page.getByRole("banner").getByRole("link", { name: "Plavanga Labs home" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software & AI systems",
  );
  await expect(page.locator("#about")).toBeAttached();
  await expect(page.locator("#works")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  if (testInfo.project.name !== "desktop-chrome") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.getByRole("button", { name: "Close navigation" }).click();
  }

  await page.locator(".hero-image").evaluate(async (image: HTMLImageElement) => {
    await image.decode();
  });

  await page.screenshot({
    path: testInfo.outputPath("homepage.png"),
    fullPage: false,
  });
});

test("contact form reports a successful submission", async ({ page }) => {
  await page.route("/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Thanks. We will be in touch soon." }),
    });
  });

  await page.goto("/#contact");
  const form = page.locator(".contact-form");

  await form.getByLabel("Name *").fill("Asha Mehta");
  await form.getByLabel("Work email *").fill("asha@example.com");
  await form.getByLabel("What can we help with? *").selectOption("AI integration");
  await form
    .getByLabel("Tell us about the project *")
    .fill("We need an AI search experience for our customer portal.");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send enquiry" }).click();

  await expect(form.getByRole("status")).toContainText(
    "Thanks. We will be in touch soon.",
  );
});

test("contact endpoint rejects invalid submissions", async ({ request }, testInfo) => {
  const runId = Date.now();
  const thirdOctet = Math.floor(runId / 255) % 255;
  const fourthOctet = (runId + testInfo.workerIndex) % 255;
  const response = await request.post("/api/contact", {
    data: {},
    headers: {
      "x-forwarded-for": `198.18.${thirdOctet}.${fourthOctet}`,
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toEqual({
    message: "Please check the form and try again.",
  });
});
