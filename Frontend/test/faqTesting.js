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
  
});
