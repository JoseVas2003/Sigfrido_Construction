const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('FAQ - Add Question Test', function () {
  it('Should add a new FAQ question and save it', async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/faq');
      await driver.manage().window().maximize();
      await driver.sleep(1000);

      // Click Edit
      const editBtn = await driver.wait(until.elementLocated(By.id("editButton")), 5000);
      await driver.wait(until.elementIsVisible(editBtn), 5000);
      await driver.wait(until.elementIsEnabled(editBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", editBtn);

      // Click Add Question
      const addQuestionBtn = await driver.wait(until.elementLocated(By.id("addQuestionButton")), 5000);
      await driver.wait(until.elementIsVisible(addQuestionBtn), 5000);
      await driver.wait(until.elementIsEnabled(addQuestionBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", addQuestionBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", addQuestionBtn);

      // Fill in question
      const questionInputs = await driver.findElements(By.css('input.faq-question-input'));
      const questionInput = questionInputs[questionInputs.length - 1]; // get last one
      await questionInput.clear();
      await questionInput.sendKeys("What is your refund policy?");

      // Fill in answer
      const answerInputs = await driver.findElements(By.css('textarea.faq-answer-input'));
      const answerInput = answerInputs[answerInputs.length - 1]; // get last one
      await answerInput.clear();
      await answerInput.sendKeys("We offer a full refund within 30 days of purchase.");

      // Click Save
      const saveBtn = await driver.findElement(By.id("editButton")); // same button toggles mode
      await driver.wait(until.elementIsVisible(saveBtn), 5000);
      await driver.wait(until.elementIsEnabled(saveBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", saveBtn);

      // Confirm success
      await driver.sleep(2000);
      const addedQuestion = await driver.findElement(By.xpath("//*[contains(text(),'What is your refund policy?')]"));
      assert.ok(addedQuestion, "❌ Question was not added successfully");

      console.log("✅ Test PASSED: Question added and saved successfully.");
      await driver.sleep(1500);
    } finally {
      await driver.quit();
    }
  }).timeout(60000);

  it('Should delete the last FAQ question and save changes', async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/faq');
      await driver.manage().window().maximize();
      await driver.sleep(1000);
  
      // Click Edit
      const editBtn = await driver.wait(until.elementLocated(By.id("editButton")), 5000);
      await driver.wait(until.elementIsVisible(editBtn), 5000);
      await driver.wait(until.elementIsEnabled(editBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", editBtn);
  
      // Grab all delete buttons for questions
      await driver.sleep(1000);
      const deleteButtons = await driver.findElements(By.css('.delete-icon'));
      const lastDeleteBtn = deleteButtons[deleteButtons.length - 1];
  
      // Scroll and click the last delete button
      await driver.executeScript("arguments[0].scrollIntoView(true);", lastDeleteBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", lastDeleteBtn);
  
      // Save
      const saveBtn = await driver.findElement(By.id("editButton"));
      await driver.wait(until.elementIsVisible(saveBtn), 5000);
      await driver.wait(until.elementIsEnabled(saveBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", saveBtn);
  
      // Wait and check that the question is gone
      await driver.sleep(2000);
      const deletedQuestion = await driver.findElements(By.xpath("//*[contains(text(),'What is your refund policy?')]"));
      assert.strictEqual(deletedQuestion.length, 0, "❌ Question was not deleted.");
  
      console.log("✅ Test PASSED: Question was deleted successfully.");
      await driver.sleep(1500);
    } finally {
      await driver.quit();
    }
  }).timeout(60000);

  it('Should add a new FAQ title and save it', async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/faq');
      await driver.manage().window().maximize();
      await driver.sleep(1000);
  
      // Click Edit
      const editBtn = await driver.wait(until.elementLocated(By.id("editButton")), 5000);
      await driver.wait(until.elementIsVisible(editBtn), 5000);
      await driver.wait(until.elementIsEnabled(editBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", editBtn);
  
      // Click Add Title
      const addTitleBtn = await driver.wait(until.elementLocated(By.id("addTitleButton")), 5000);
      await driver.wait(until.elementIsVisible(addTitleBtn), 5000);
      await driver.wait(until.elementIsEnabled(addTitleBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", addTitleBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", addTitleBtn);
  
      // Find the last title input and update it
      const titleInputs = await driver.findElements(By.css('input.faq-title-input'));
      const lastTitleInput = titleInputs[titleInputs.length - 1];
      await lastTitleInput.clear();
      await lastTitleInput.sendKeys("Customer Service");
  
      // Click Save
      const saveBtn = await driver.findElement(By.id("editButton"));
      await driver.wait(until.elementIsVisible(saveBtn), 5000);
      await driver.wait(until.elementIsEnabled(saveBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", saveBtn);
  
      // Confirm the title is added
      await driver.sleep(2000);
      const addedTitle = await driver.findElement(By.xpath("//*[contains(text(),'Customer Service')]"));
      assert.ok(addedTitle, "❌ Title was not added successfully");
  
      console.log("✅ Test PASSED: Title added and saved successfully.");
      await driver.sleep(1500);
    } finally {
      await driver.quit();
    }
  }).timeout(60000);
  
  it('Should delete the last FAQ title and save changes', async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/faq');
      await driver.manage().window().maximize();
      await driver.sleep(1000);
  
      // Click Edit
      const editBtn = await driver.wait(until.elementLocated(By.id("editButton")), 5000);
      await driver.wait(until.elementIsVisible(editBtn), 5000);
      await driver.wait(until.elementIsEnabled(editBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", editBtn);
  
      // Get all title inputs to find the last one
      const titleInputs = await driver.findElements(By.css('input.faq-title-input'));
      const lastTitleInput = titleInputs[titleInputs.length - 1];
      const titleText = await lastTitleInput.getAttribute("value");
  
      // Find all delete buttons (assumes titles and questions share .delete-icon)
      const deleteButtons = await driver.findElements(By.css(".delete-icon"));
      const lastDeleteBtn = deleteButtons[deleteButtons.length - 1];
  
      await driver.executeScript("arguments[0].scrollIntoView(true);", lastDeleteBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", lastDeleteBtn);
  
      // Click Save
      const saveBtn = await driver.findElement(By.id("editButton"));
      await driver.wait(until.elementIsVisible(saveBtn), 5000);
      await driver.wait(until.elementIsEnabled(saveBtn), 5000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
      await driver.sleep(300);
      await driver.executeScript("arguments[0].click();", saveBtn);
  
      // Confirm the title is gone
      await driver.sleep(2000);
      const deletedTitle = await driver.findElements(By.xpath(`//*[contains(text(),'${titleText}')]`));
      assert.strictEqual(deletedTitle.length, 0, "❌ Title was not deleted.");
  
      console.log("✅ Test PASSED: Title was deleted successfully.");
      await driver.sleep(1500);
    } finally {
      await driver.quit();
    }
  }).timeout(60000);  
  
});
