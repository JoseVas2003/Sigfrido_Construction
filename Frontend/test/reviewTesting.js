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

  describe('Deleting Reviews', function () {
    it('should allow a logged in non-admin user to delete their own review', async function () {
      let driver = await new Builder().forBrowser('chrome').build();
      try {
        // Log in as the non-admin account
        await loginUser(driver, 'NewNon-Admin@account.com', 'NonAdmin12345$');
        await driver.get('http://localhost:3000/reviews');
        await driver.sleep(2000);
        // Create a review that will be deleted
        let leaveReviewButton = await driver.findElement(By.css('.leave_review'));
        await leaveReviewButton.click();
        await driver.sleep(1000);
        let titleInput = await driver.findElement(By.name('title'));
        await titleInput.click();
        await titleInput.sendKeys("Review To Delete");
        await driver.sleep(1000);
        let contentInput = await driver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys("This review will be deleted.");
        await driver.sleep(1000);
        let starsInput = await driver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys("4");
        await driver.sleep(1000);
        let submitButton = await driver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await driver.sleep(3000);
        await setSortToNewest(driver);
        // Locate the review card for "Review To Delete"
        let reviewCard = await driver.findElement(By.xpath("//*[contains(text(),'Review To Delete')]/ancestor::*[contains(@class, 'review-card')]"));
        let deleteButton = await reviewCard.findElement(By.css('.delete-button'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", deleteButton);
        await driver.wait(until.elementIsEnabled(deleteButton), 10000);
        await driver.executeScript("arguments[0].click();", deleteButton);
        // Wait until the review card is removed using a custom wait
        await driver.wait(async () => {
          let elems = await driver.findElements(By.xpath("//*[contains(text(),'Review To Delete')]/ancestor::*[contains(@class, 'review-card')]"));
          return elems.length === 0;
        }, 10000, "Review was not deleted from the frontend");
      } finally {
        await driver.quit();
      }
    }).timeout(60000);

    it('should allow an admin to delete a review left by a non-admin', async function () {
      // First: Create a review as a non-admin user.
      let nonAdminDriver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(nonAdminDriver, 'NewNon-Admin@account.com', 'NonAdmin12345$');
        await nonAdminDriver.get('http://localhost:3000/reviews');
        await nonAdminDriver.sleep(2000);
        let leaveReviewButton = await nonAdminDriver.findElement(By.css('.leave_review'));
        await leaveReviewButton.click();
        await nonAdminDriver.sleep(1000);
        let titleInput = await nonAdminDriver.findElement(By.name('title'));
        await titleInput.click();
        // Use a unique title to identify the review for admin deletion
        await titleInput.sendKeys("Review For Admin Deletion");
        await nonAdminDriver.sleep(1000);
        let contentInput = await nonAdminDriver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys("This review will be deleted by admin.");
        await nonAdminDriver.sleep(1000);
        let starsInput = await nonAdminDriver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys("5");
        await nonAdminDriver.sleep(1000);
        let submitButton = await nonAdminDriver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await nonAdminDriver.sleep(3000);
        await setSortToNewest(nonAdminDriver);
      } finally {
        await nonAdminDriver.quit();
      }
      
      // Second: Log in as admin and delete the review created above.
      let adminDriver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(adminDriver, 'NewAdmin@account.com', 'Admin12345$');
        await adminDriver.get('http://localhost:3000/reviews');
        await adminDriver.sleep(2000);
        await setSortToNewest(adminDriver);
        // Locate the review card for "Review For Admin Deletion"
        let reviewCard = await adminDriver.findElement(By.xpath("//*[contains(text(),'Review For Admin Deletion')]/ancestor::*[contains(@class, 'review-card')]"));
        let deleteButton = await reviewCard.findElement(By.css('.delete-button'));
        await adminDriver.executeScript("arguments[0].scrollIntoView(true);", deleteButton);
        await adminDriver.wait(until.elementIsEnabled(deleteButton), 10000);
        await adminDriver.executeScript("arguments[0].click();", deleteButton);
        // Wait until the review card is removed using a custom wait
        await adminDriver.wait(async () => {
          let elems = await adminDriver.findElements(By.xpath("//*[contains(text(),'Review For Admin Deletion')]/ancestor::*[contains(@class, 'review-card')]"));
          return elems.length === 0;
        }, 10000, "Admin was unable to delete the review");
      } finally {
        await adminDriver.quit();
      }
    }).timeout(90000);
  });
});
