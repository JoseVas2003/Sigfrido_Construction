const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Reviews Functionality Tests', function () {
  this.timeout(90000);

  // Helper function to log in a user using the same steps as your login tests.
  async function loginUser(driver, email, password) {
    await driver.get('http://localhost:3000/');
    await driver.manage().window().maximize();
    await driver.sleep(1000);
    
    let menuButton = await driver.findElement(By.id('MenueB'));
    await menuButton.click();
    await driver.sleep(1000);
    
    let loginMenuButton = await driver.findElement(By.id('loginButton'));
    await loginMenuButton.click();
    await driver.sleep(1000);
    
    let emailInput = await driver.findElement(By.id('emailInput'));
    await emailInput.click();
    await driver.sleep(1000);
    await emailInput.sendKeys(email);
    await driver.sleep(3000);
    
    let passwordInput = await driver.findElement(By.id('passwordInput'));
    await passwordInput.click();
    await driver.sleep(1000);
    await passwordInput.sendKeys(password);
    await driver.sleep(3000);
    
    let loginButton = await driver.findElement(By.id('LoginButton'));
    await loginButton.click();
    await driver.sleep(3000);
  }

  // Helper to force sort order to "Newest First"
  async function setSortToNewest(driver) {
    let sortSelect = await driver.findElement(By.css('select'));
    // Send keys to set to "Newest First"
    await sortSelect.sendKeys("Newest First");
    await driver.sleep(1000);
  }

  describe('Creating Reviews', function () {
    it('should allow a logged in user to leave a review that shows on the frontend', async function () {
      let driver = await new Builder().forBrowser('chrome').build();
      try {
        // Using any valid account; you can leave as is or update
        await loginUser(driver, 'jimbocarry12@gmail.com', 'Testing123$');
        await driver.get('http://localhost:3000/reviews');
        await driver.sleep(2000);
        let leaveReviewButton = await driver.findElement(By.css('.leave_review'));
        await leaveReviewButton.click();
        await driver.sleep(1000);
        let titleInput = await driver.findElement(By.name('title'));
        await titleInput.click();
        await titleInput.sendKeys("Selenium Test Review");
        await driver.sleep(1000);
        let contentInput = await driver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys("This review is created by a Selenium test.");
        await driver.sleep(1000);
        let starsInput = await driver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys("5");
        await driver.sleep(1000);
        let submitButton = await driver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await driver.sleep(3000);
        await setSortToNewest(driver);
        let reviewTitleElem = await driver.findElement(By.xpath("//*[contains(text(),'Selenium Test Review')]"));
        let reviewTitleText = await reviewTitleElem.getText();
        assert.ok(reviewTitleText.includes("Selenium Test Review"), "Review did not appear on the frontend");
      } finally {
        await driver.quit();
      }
    }).timeout(60000);

    it('should prevent non-logged in users from leaving a review', async function () {
      let driver = await new Builder().forBrowser('chrome').build();
      try {
        await driver.get('http://localhost:3000/reviews');
        await driver.sleep(2000);
        let leaveReviewButton = await driver.findElement(By.css('.leave_review'));
        await leaveReviewButton.click();
        await driver.sleep(3000);
        let currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('/login'), "Non-logged in user was not redirected to login page");
      } finally {
        await driver.quit();
      }
    }).timeout(60000);
  });

  
});
