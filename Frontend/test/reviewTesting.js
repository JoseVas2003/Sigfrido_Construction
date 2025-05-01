const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Reviews Functionality Tests', function () {
  this.timeout(90000);

  // Helper function to log in a user via UI
  async function loginUser(driver, email, password) {
    await driver.get('http://localhost:3000/');
    await driver.manage().window().maximize();
    await driver.sleep(1000);
    
    const menuButton = await driver.findElement(By.id('MenueB'));
    await menuButton.click();
    await driver.sleep(1000);
    
    const loginMenuButton = await driver.findElement(By.id('loginButton'));
    await loginMenuButton.click();
    await driver.sleep(1000);
    
    const emailInput = await driver.findElement(By.id('emailInput'));
    await emailInput.click();
    await driver.sleep(1000);
    await emailInput.sendKeys(email);
    await driver.sleep(3000);
    
    const passwordInput = await driver.findElement(By.id('passwordInput'));
    await passwordInput.click();
    await driver.sleep(1000);
    await passwordInput.sendKeys(password);
    await driver.sleep(3000);
    
    const loginButton = await driver.findElement(By.id('LoginButton'));
    await loginButton.click();
    // Wait for redirect after login
    await driver.wait(until.urlIs('http://localhost:3000/'), 10000);
  }

  // Helper to force sort order to "Newest First"
  async function setSortToNewest(driver) {
    // wait up to 20s for the <select> to appear
    const sortSelect = await driver.wait(
      until.elementLocated(By.css('select')),
      20000,
      'Sort dropdown never appeared'
    );
    // ensure it’s visible before sending keys
    await driver.wait(until.elementIsVisible(sortSelect), 5000);
    await sortSelect.sendKeys('Newest First');
    await driver.sleep(1000);
  }


  describe('Creating Reviews', function () {
    it('should allow a logged in user to leave a review that shows on the frontend', async function () {
      const driver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(driver, 'NewNon-Admin@account.com', 'NonAdmin12345$');
        await driver.get('http://localhost:3000/reviews');

        const leaveReviewButton = await driver.wait(
          until.elementLocated(By.css('button.leave_review')),
          20000,
          'leave_review button never appeared'
        );
        await driver.wait(until.elementIsVisible(leaveReviewButton), 5000);
        await leaveReviewButton.click();
        await driver.sleep(1000);

        const titleInput = await driver.findElement(By.name('title'));
        await titleInput.click();
        await titleInput.sendKeys('Selenium Test Review');
        await driver.sleep(1000);

        const contentInput = await driver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys('This review is created by a Selenium test.');
        await driver.sleep(1000);

        const starsInput = await driver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys('5');
        await driver.sleep(1000);

        const submitButton = await driver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await driver.sleep(3000);

        await setSortToNewest(driver);
        const reviewTitleElem = await driver.findElement(By.xpath("//*[contains(text(),'Selenium Test Review')]") );
        const reviewTitleText = await reviewTitleElem.getText();
        assert.ok(reviewTitleText.includes('Selenium Test Review'), 'Review did not appear on the frontend');
      } finally {
        await driver.quit();
      }
    }).timeout(60000);

    it('should prevent non-logged in users from leaving a review', async function () {
      const driver = await new Builder().forBrowser('chrome').build();
      try {
        await driver.get('http://localhost:3000/reviews');
        // Wait for the Leave Review button, then click
        const leaveReviewButton = await driver.wait(
          until.elementLocated(By.css('button.leave_review')),
          20000,
          'leave_review button never appeared for guest'
        );
        await driver.wait(until.elementIsVisible(leaveReviewButton), 5000);
        await leaveReviewButton.click();

        // Now expect redirect to login
        await driver.wait(until.urlContains('/login'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('/login'), 'Non-logged in user was not redirected to login page');
      } finally {
        await driver.quit();
      }
    }).timeout(60000);
  });

  describe('Deleting Reviews', function () {
    it('should allow a logged in non-admin user to delete their own review', async function () {
      const driver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(driver, 'NewNon-Admin@account.com', 'NonAdmin12345$');
        await driver.get('http://localhost:3000/reviews');

        const leaveReviewButton = await driver.wait(
          until.elementLocated(By.css('button.leave_review')),
          20000,
          'leave_review button never appeared'
        );
        await driver.wait(until.elementIsVisible(leaveReviewButton), 5000);
        await leaveReviewButton.click();
        await driver.sleep(1000);

        const titleInput = await driver.findElement(By.name('title'));
        await titleInput.click();
        await titleInput.sendKeys('Review To Delete');
        await driver.sleep(1000);

        const contentInput = await driver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys('This review will be deleted.');
        await driver.sleep(1000);

        const starsInput = await driver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys('4');
        await driver.sleep(1000);

        const submitButton = await driver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await driver.sleep(3000);

        await setSortToNewest(driver);
        const reviewCard = await driver.findElement(By.xpath("//*[contains(text(),'Review To Delete')]/ancestor::*[contains(@class, 'review-card')]"));
        const deleteButton = await reviewCard.findElement(By.css('.delete-button'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', deleteButton);
        await driver.wait(until.elementIsEnabled(deleteButton), 10000);
        await driver.executeScript('arguments[0].click();', deleteButton);

        await driver.wait(async () => {
          const elems = await driver.findElements(By.xpath("//*[contains(text(),'Review To Delete')]/ancestor::*[contains(@class, 'review-card')]"));
          return elems.length === 0;
        }, 10000, 'Review was not deleted from the frontend');
      } finally {
        await driver.quit();
      }
    }).timeout(60000);

    it('should allow an admin to delete a review left by a non-admin', async function () {
      // First: Create a review as a non-admin user.
      const nonAdminDriver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(nonAdminDriver, 'NewNon-Admin@account.com', 'NonAdmin12345$');
        await nonAdminDriver.get('http://localhost:3000/reviews');

        const leaveReviewButton = await nonAdminDriver.wait(
          until.elementLocated(By.css('button.leave_review')),
          20000,
          'leave_review button never appeared'
        );
        await nonAdminDriver.wait(until.elementIsVisible(leaveReviewButton), 5000);
        await leaveReviewButton.click();
        await nonAdminDriver.sleep(1000);

        const titleInput = await nonAdminDriver.findElement(By.name('title'));
        await titleInput.click();
        await titleInput.sendKeys('Review For Admin Deletion');
        await nonAdminDriver.sleep(1000);

        const contentInput = await nonAdminDriver.findElement(By.name('content'));
        await contentInput.click();
        await contentInput.sendKeys('This review will be deleted by admin.');
        await nonAdminDriver.sleep(1000);

        const starsInput = await nonAdminDriver.findElement(By.name('stars'));
        await starsInput.click();
        await starsInput.sendKeys('5');
        await nonAdminDriver.sleep(1000);

        const submitButton = await nonAdminDriver.findElement(By.css("button[type='submit']"));
        await submitButton.click();
        await nonAdminDriver.sleep(3000);

        await setSortToNewest(nonAdminDriver);
      } finally {
        await nonAdminDriver.quit();
      }
      
      // Second: Log in as admin and delete the review created above.
      const adminDriver = await new Builder().forBrowser('chrome').build();
      try {
        await loginUser(adminDriver, 'NewAdmin@account.com', 'Admin12345$');
        await adminDriver.get('http://localhost:3000/reviews');
        await setSortToNewest(adminDriver);

        const reviewCard = await adminDriver.wait(
          until.elementLocated(By.xpath("//*[contains(text(),'Review For Admin Deletion')]/ancestor::*[contains(@class, 'review-card')]")),
          15000,
          'Review For Admin Deletion did not appear for admin'
        );
        const deleteButton = await reviewCard.findElement(By.css('.delete-button'));
        await adminDriver.executeScript('arguments[0].scrollIntoView(true);', deleteButton);
        await adminDriver.wait(until.elementIsEnabled(deleteButton), 10000);
        await adminDriver.executeScript('arguments[0].click();', deleteButton);

        await adminDriver.wait(async () => {
          const elems = await adminDriver.findElements(By.xpath("//*[contains(text(),'Review For Admin Deletion')]/ancestor::*[contains(@class, 'review-card')]"));
          return elems.length === 0;
        }, 10000, 'Admin was unable to delete the review');
      } finally {
        await adminDriver.quit();
      }
    }).timeout(90000);
  });


  describe('Cleanup Selenium Test Review', function () {
    it('should remove the leftover Selenium Test Review', async function () {
      const driver = await new Builder().forBrowser('chrome').build();
      try {
        // Log in as admin so we can delete any user’s review
        await loginUser(driver, 'NewAdmin@account.com', 'Admin12345$');
        await driver.get('http://localhost:3000/reviews');
        await setSortToNewest(driver);

        // Wait for the test review card to show up
        const reviewCard = await driver.wait(
          until.elementLocated(By.xpath(
            "//*[contains(text(),'Selenium Test Review')]/ancestor::*[contains(@class,'review-card')]"
          )),
          15000,
          'Selenium Test Review not found for cleanup'
        );

        // Click its delete button
        const deleteButton = await reviewCard.findElement(By.css('.delete-button'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', deleteButton);
        await driver.wait(until.elementIsEnabled(deleteButton), 10000);
        await driver.executeScript('arguments[0].click();', deleteButton);

        // Verify it’s been removed
        await driver.wait(async () => {
          const elems = await driver.findElements(By.xpath(
            "//*[contains(text(),'Selenium Test Review')]/ancestor::*[contains(@class,'review-card')]"
          ));
          return elems.length === 0;
        }, 10000, 'Failed to clean up Selenium Test Review');

      } finally {
        await driver.quit();
      }
    }).timeout(60000);
  });
});
