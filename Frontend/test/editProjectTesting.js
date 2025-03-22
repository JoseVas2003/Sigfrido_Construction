const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');
const path = require('path');
const { Key } = require('selenium-webdriver');

async function loginAsAdmin(driver) {
    await driver.get('http://localhost:3000/login');
    await driver.manage().window().maximize();

    await driver.sleep(1000);
    const emailInput = await driver.wait(until.elementLocated(By.id('emailInput')), 5000);
    await driver.sleep(1000);
    await emailInput.sendKeys("Admin@Admin.com");

    await driver.sleep(1000);
    const passwordInput = await driver.wait(until.elementLocated(By.id('passwordInput')), 5000);
    await driver.sleep(1000);
    await passwordInput.sendKeys("Admin12345");

    await driver.sleep(1000);
    const loginButton = await driver.wait(until.elementLocated(By.id('LoginButton')), 5000);
    await driver.sleep(1000);
    await loginButton.click();

    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.id('MenueB')), 5000);
    await driver.sleep(1000);
    await driver.findElement(By.id('MenueB')).click();

    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.id('portfolioButton')), 5000);
    await driver.sleep(1000);
    await driver.findElement(By.id('portfolioButton')).click();
    await driver.sleep(1000);
}

describe ('Edit Project Functionality', async function () {
    it('Navigating To Edit Project Page And Entering CORRECT input', async function () { // go to portfolio page, click on pencil icon, click on a project to edit and then just fill everything with random stuff and click on the save changes button and look for: Project Updated successfully!
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);
    
            await driver.wait(until.elementLocated(By.id('editButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('editButton')).click(); 
            await driver.sleep(1000);   

            // Wait for edit buttons to appear
            const editButtons = await driver.findElements(By.css('[data-testid="edit-project-button"]'));
            assert.ok(editButtons.length > 0, '❌ No edit buttons found');
            await driver.sleep(1000);

            // Click the first edit button
            await editButtons[0].click();
            await driver.sleep(1000);
            const projectInput = await driver.wait(until.elementLocated(By.id('projectName')), 5000);
            await driver.sleep(1000);
            await projectInput.clear();
            await projectInput.sendKeys("Edited Project Example");
    
            await driver.sleep(1000);
            const descriptionInput = await driver.wait(until.elementLocated(By.id('descriptionText')), 5000);
            await driver.sleep(1000);
            await descriptionInput.clear();
            await descriptionInput.sendKeys("This project description is simply an edited example.");
    
            await driver.sleep(1000);
            const timeInput = await driver.wait(until.elementLocated(By.id('timeTaken')), 5000);
            await driver.sleep(1000);
            await timeInput.clear();
            await timeInput.sendKeys("36 days");
    
            await driver.sleep(1000);
            const costInput = await driver.wait(until.elementLocated(By.id('cost')), 5000);
            await driver.sleep(1000);
            await costInput.clear();
            await costInput.sendKeys("$51,000");
    
    
            await driver.sleep(1000);
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(500); 
                          
            const aduCheckbox = await driver.wait(until.elementLocated(By.id('category-ADU')), 5000);
            await driver.wait(until.elementIsVisible(aduCheckbox), 5000);
            await aduCheckbox.click();
    
            await driver.sleep(1000);
            const bathroomsCheckbox = await driver.wait(until.elementLocated(By.id('category-bathrooms')), 5000);
            await driver.wait(until.elementIsVisible(bathroomsCheckbox), 5000);
            await bathroomsCheckbox.click();
    
            await driver.sleep(1000);
            const floorsCheckbox = await driver.wait(until.elementLocated(By.id('category-floors')), 5000);
            await driver.wait(until.elementIsVisible(floorsCheckbox), 5000);
            await floorsCheckbox.click();
    
            await driver.sleep(1000);
            const kitchenCheckbox = await driver.wait(until.elementLocated(By.id('category-kitchen')), 5000);
            await driver.wait(until.elementIsVisible(kitchenCheckbox), 5000);
            await kitchenCheckbox.click();
    
            await driver.sleep(1000);
            const roofsCheckbox = await driver.wait(until.elementLocated(By.id('category-roofs')), 5000);
            await driver.wait(until.elementIsVisible(roofsCheckbox), 5000);
            await roofsCheckbox.click();
    
            await driver.sleep(1000);
            const roomsCheckbox = await driver.wait(until.elementLocated(By.id('category-rooms')), 5000);
            await driver.wait(until.elementIsVisible(aduCheckbox), 5000);
            await roomsCheckbox.click();
                
            await driver.sleep(1000);
            const imagePath = path.resolve(__dirname, './testImages/sample.jpeg');
            const fileInput = await driver.wait(until.elementLocated(By.id('imageFile')), 5000);
            await fileInput.sendKeys(imagePath); 
            await driver.sleep(1000);
        
            const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
            await submitButton.click();
            // ✅ Confirming project update success
            await driver.sleep(3000);
            const currentUrl = await driver.getCurrentUrl();
    
            if (currentUrl.includes("http://localhost:3000/portfolio?message=Project%20updated%20successfully!")) {
                console.log("✅ Test PASSED: Project was updated successfully.");
            }   else {
                    throw new Error("❌ Test FAILED: Project update message not found in URL. Project was not edited properly.");
                }
            await driver.sleep(3000);    
            } finally {
                await driver.quit()
            }
    }).timeout(60000)
    it('Navigating To Edit Project Page And Entering EMPTY input', async function () { // deleting everything (obv except for image) and look for the inline errors
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);
    
            await driver.wait(until.elementLocated(By.id('editButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('editButton')).click(); 
            await driver.sleep(1000);   

            // Wait for edit buttons to appear
            const editButtons = await driver.findElements(By.css('[data-testid="edit-project-button"]'));
            assert.ok(editButtons.length > 0, '❌ No edit buttons found');
            await driver.sleep(1000);

            // Click the first edit button
            await editButtons[0].click();
            await driver.sleep(1000);

            const projectInput = await driver.wait(until.elementLocated(By.id('projectName')), 5000);
            await driver.sleep(1000);
            await projectInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
                
            await driver.sleep(1000);
            const descriptionInput = await driver.wait(until.elementLocated(By.id('descriptionText')), 5000);
            await driver.sleep(1000);
            await descriptionInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
    
            await driver.sleep(1000);
            const timeInput = await driver.wait(until.elementLocated(By.id('timeTaken')), 5000);
            await driver.sleep(1000);
            await timeInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
    
            await driver.sleep(1000);
            const costInput = await driver.wait(until.elementLocated(By.id('cost')), 5000);
            await driver.sleep(1000);
            await costInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
                          
            const aduCheckbox = await driver.wait(until.elementLocated(By.id('category-ADU')), 5000);
            await driver.wait(until.elementIsVisible(aduCheckbox), 5000);
            if (await aduCheckbox.isSelected()) {
                await aduCheckbox.click();
            }    
            await driver.sleep(1000);
            const bathroomsCheckbox = await driver.wait(until.elementLocated(By.id('category-bathrooms')), 5000);
            await driver.wait(until.elementIsVisible(bathroomsCheckbox), 5000);
            if (await bathroomsCheckbox.isSelected()) {
                await bathroomsCheckbox.click();
            }                
            await driver.sleep(1000);
            const floorsCheckbox = await driver.wait(until.elementLocated(By.id('category-floors')), 5000);
            await driver.wait(until.elementIsVisible(floorsCheckbox), 5000);
            if (await floorsCheckbox.isSelected()) {
                await floorsCheckbox.click();
            }     
            await driver.sleep(1000);
            const kitchenCheckbox = await driver.wait(until.elementLocated(By.id('category-kitchen')), 5000);
            await driver.wait(until.elementIsVisible(kitchenCheckbox), 5000);
            if (await kitchenCheckbox.isSelected()) {
                await kitchenCheckbox.click();
            }     
            await driver.sleep(1000);
            const roofsCheckbox = await driver.wait(until.elementLocated(By.id('category-roofs')), 5000);
            await driver.wait(until.elementIsVisible(roofsCheckbox), 5000);
            if (await roofsCheckbox.isSelected()) {
                await roofsCheckbox.click();
            }      
            await driver.sleep(1000);
            const roomsCheckbox = await driver.wait(until.elementLocated(By.id('category-rooms')), 5000);
            await driver.wait(until.elementIsVisible(aduCheckbox), 5000);
            if (await roomsCheckbox.isSelected()) {
                await roomsCheckbox.click();
            }  
            await driver.sleep(1000);
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(500); 

            const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
            await submitButton.click();

            const projectNameError = await driver.findElement(By.id('projectNameError')).getText();
            assert.strictEqual(projectNameError, "Project Name cannot be empty.", '❌ Did not catch missing Project Name');
    
            const descriptionError = await driver.findElement(By.id('descriptionError')).getText();
            assert.strictEqual(descriptionError, "Description cannot be empty.", '❌ Did not catch missing Description');
    
            const timeTakenError = await driver.findElement(By.id('timeTakenError')).getText();
            assert.strictEqual(timeTakenError, "Time Taken cannot be empty.", '❌ Did not catch missing Time Taken');
    
            const costError = await driver.findElement(By.id('costError')).getText();
            assert.strictEqual(costError, "Cost cannot be empty.", '❌ Did not catch missing Cost');
    
            const categoriesError = await driver.findElement(By.id('categoriesError')).getText();
            assert.strictEqual(categoriesError, "Please select at least one project category.", '❌ Did not catch missing Category');

            const url = await driver.getCurrentUrl();
            assert.ok(url.includes('/editProject/'), '❌ Left the editProject page.');
    
            console.log("✅ Test PASSED: All required field errors displayed correctly.");

            await driver.sleep(3000);    
            } finally {
                await driver.quit()
            }
    }).timeout(60000)
    it('Navigating To Edit Project Page And Entering INVALID Input', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);
    
            await driver.wait(until.elementLocated(By.id('editButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('editButton')).click(); 
            await driver.sleep(1000);   

            // Wait for edit buttons to appear
            const editButtons = await driver.findElements(By.css('[data-testid="edit-project-button"]'));
            assert.ok(editButtons.length > 0, '❌ No edit buttons found');
            await driver.sleep(1000);

            // Click the first edit button
            await editButtons[0].click();
            await driver.sleep(1000);

            const projectInput = await driver.wait(until.elementLocated(By.id('projectName')), 5000);
            await driver.sleep(1000);
            await projectInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
                
            await driver.sleep(1000);
            const descriptionInput = await driver.wait(until.elementLocated(By.id('descriptionText')), 5000);
            await driver.sleep(1000);
            await descriptionInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
    
            await driver.sleep(1000);
            const timeInput = await driver.wait(until.elementLocated(By.id('timeTaken')), 5000);
            await driver.sleep(1000);
            await timeInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
    
            await driver.sleep(1000);
            const costInput = await driver.wait(until.elementLocated(By.id('cost')), 5000);
            await driver.sleep(1000);
            await costInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
                
            await driver.findElement(By.id('projectName')).sendKeys('A'.repeat(31)); 
            await driver.findElement(By.id('descriptionText')).sendKeys('B'.repeat(301)); 
            await driver.findElement(By.id('timeTaken')).sendKeys('C'.repeat(16)); 
            await driver.findElement(By.id('cost')).sendKeys('D'.repeat(16)); 

            await driver.sleep(1000);
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(500); 

            await driver.sleep(1000);
            const imagePath = path.resolve(__dirname, './testImages/sample.pdf');
            const fileInput = await driver.wait(until.elementLocated(By.id('imageFile')), 5000);
            await fileInput.sendKeys(imagePath); 
            await driver.sleep(1000);

            const projectNameError = await driver.findElement(By.id('projectNameError')).getText();
            assert.strictEqual(projectNameError, "30 character max limit reached", '❌ Name character limit not enforced');
    
            const descriptionError = await driver.findElement(By.id('descriptionError')).getText();
            assert.strictEqual(descriptionError, "300 character max limit reached", '❌ Description character limit not enforced');
    
            const timeTakenError = await driver.findElement(By.id('timeTakenError')).getText();
            assert.strictEqual(timeTakenError, "15 character max limit reached", '❌ TimeTaken character limit not enforced');

            const costError = await driver.findElement(By.id('costError')).getText();
            assert.strictEqual(costError, "15 character max limit reached", '❌ Cost character limit not enforced');
    
            const imageError = await driver.findElement(By.id('imageError')).getText();
            assert.strictEqual(imageError, "Only HEIC, PNG and JPEG images are allowed.", '❌ Did not catch incorrect Image type');
    
            console.log("✅ Test PASSED: All required field errors displayed correctly.");
            await driver.sleep(3000);    
            } finally {
                await driver.quit()
            }
    }).timeout(60000)
    it('Navigating To Edit Project Page And Entering TOO LARGE Image', async function () {
            let driver = await new Builder().forBrowser('chrome').build()
            try {
                await loginAsAdmin(driver);
    
                await driver.wait(until.elementLocated(By.id('editButton')), 5000);
                await driver.sleep(1000);
                await driver.findElement(By.id('editButton')).click(); 
                await driver.sleep(1000);   
    
                // Wait for edit buttons to appear
                const editButtons = await driver.findElements(By.css('[data-testid="edit-project-button"]'));
                assert.ok(editButtons.length > 0, '❌ No edit buttons found');
                await driver.sleep(1000);
    
                // Click the first edit button
                await editButtons[0].click();
                await driver.sleep(1000);
    
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        
                await driver.sleep(1000);
                const imagePath = path.resolve(__dirname, './testImages/largeImageSample.png');
                const fileInput = await driver.wait(until.elementLocated(By.id('imageFile')), 5000);
                await fileInput.sendKeys(imagePath); 
                await driver.sleep(1000);
        
                const imageError = await driver.findElement(By.id('imageError')).getText();
                assert.strictEqual(imageError, "Image must be less than 10MB.", '❌ Did not catch Image size error');
            
                console.log("✅ Test PASSED: All required image size errors displayed correctly.");
                await driver.sleep(3000);    
            } finally {
                await driver.quit()
            }        
    }).timeout(60000)
})