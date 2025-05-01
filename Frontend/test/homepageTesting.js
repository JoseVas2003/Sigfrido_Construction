const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const { describe } = require("node:test");

describe("Home Page Testing", async function () {
  it("Should load the homepage and display hero section", async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get("http://localhost:3000/");
      await driver.manage().window().maximize();
      await driver.sleep(1000);

      // Hero has two titles: "Sigfrido Vasquez" and "Construction"
      let heroTitles = await driver.findElements(By.css(".hero-title"));
      assert.strictEqual(heroTitles.length, 2, "Expected two hero titles");
      let title1 = await heroTitles[0].getText();
      let title2 = await heroTitles[1].getText();
      assert.strictEqual(
        title1,
        "Sigfrido Vasquez",
        "First hero title mismatch"
      );
      assert.strictEqual(title2, "Construction", "Second hero title mismatch");

      // Hero description
      let desc = await driver
        .findElement(By.css(".hero-description"))
        .getText();
      assert.ok(
        desc.includes("At Sigfrido Vasquez Construction"),
        "Hero description incorrect"
      );
    } finally {
      await driver.quit();
    }
  }).timeout(60000);

  it("Clicking the CTA button navigates to login page", async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get("http://localhost:3000/");
      await driver.manage().window().maximize();
      await driver.sleep(1000);

      let cta = await driver.findElement(By.css(".cta-button"));
      await cta.click();
      await driver.sleep(2000);

      let url = await driver.getCurrentUrl();
      assert.strictEqual(
        url,
        "http://localhost:3000/login",
        "CTA did not navigate to login"
      );
    } finally {
      await driver.quit();
    }
  }).timeout(60000);

  it("Services section contains six service cards with correct titles", async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get("http://localhost:3000/");
      await driver.manage().window().maximize();
      await driver.sleep(1000);

      // Scroll to services
      let servicesSection = await driver.findElement(By.id("services"));
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        servicesSection
      );
      await driver.sleep(1000);

      // Check six cards
      let cards = await driver.findElements(By.css(".service-card"));
      assert.strictEqual(cards.length, 6, "Expected 6 service cards");

      // Verify each title
      const expected = [
        "Pre-Construction Services",
        "Project Planning",
        "Design Consultation",
        "General Contracting",
        "Site Preparation",
        "Structural and Finishing",
      ];
      for (let i = 0; i < expected.length; i++) {
        let t = await cards[i].findElement(By.css(".service-title")).getText();
        assert.strictEqual(
          t,
          expected[i],
          `Service title at index ${i} mismatch`
        );
      }
    } finally {
      await driver.quit();
    }
  }).timeout(60000);
});
