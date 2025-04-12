const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');
const path = require('path');

async function loginAsAdmin(driver) {
    await driver.get('http://localhost:3000/login');
    await driver.manage().window().maximize();

    await driver.sleep(1000);
    const emailInput = await driver.wait(until.elementLocated(By.id('emailInput')), 5000);
    await driver.sleep(1000);
    await emailInput.sendKeys("NewAdmin@account.com");

    await driver.sleep(1000);
    const passwordInput = await driver.wait(until.elementLocated(By.id('passwordInput')), 5000);
    await driver.sleep(1000);
    await passwordInput.sendKeys("Admin12345$");

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
    const createButton = await driver.wait(until.elementLocated(By.id('createButton')), 10000);
    await driver.sleep(1000);
    await driver.wait(until.elementIsVisible(createButton), 5000);
    await driver.sleep(1000);
    await createButton.click();
}

describe ('Create Project Functionality', function () {
    it('Navigating To Create Project Page And Entering CORRECT input', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);

            await driver.sleep(1000);
            const projectInput = await driver.wait(until.elementLocated(By.id('projectName')), 5000);
            await driver.sleep(1000);
            await projectInput.sendKeys("Project Example");

            await driver.sleep(1000);
            const descriptionInput = await driver.wait(until.elementLocated(By.id('descriptionText')), 5000);
            await driver.sleep(1000);
            await descriptionInput.sendKeys("This project description is simply an example.");

            await driver.sleep(1000);
            const timeInput = await driver.wait(until.elementLocated(By.id('timeTaken')), 5000);
            await driver.sleep(1000);
            await timeInput.sendKeys("35 days");

            await driver.sleep(1000);
            const costInput = await driver.wait(until.elementLocated(By.id('cost')), 5000);
            await driver.sleep(1000);
            await costInput.sendKeys("$50,000");

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
            const kitchenCheckbox = await driver.wait(until.elementLocated(By.id('category-kitchens')), 5000);
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
            const pavementCheckbox = await driver.wait(until.elementLocated(By.id('category-pavement')), 5000);
            await driver.wait(until.elementIsVisible(aduCheckbox), 5000);
            await pavementCheckbox.click();

            await driver.sleep(1000);

            for (let i = 0; i < 5; i++) {
                const imageBoxes = await driver.findElements(By.css('div[style*="width: 100px"][style*="height: 100px"]'));
                
                if (imageBoxes[i]) {
                await imageBoxes[i].click();
                await driver.sleep(500);
            
                const imagePath = path.resolve(__dirname, './testImages/sample.jpeg');
                const fileInput = await driver.wait(until.elementLocated(By.id('imageFile')), 5000);
                await fileInput.sendKeys(imagePath);
                await driver.sleep(1000);
                } else {
                throw new Error(`❌ Image box ${i} not found`);
                }
            }
  
            const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
            await submitButton.click();

            await driver.sleep(3000);
            const currentUrl = await driver.getCurrentUrl();

            if (currentUrl.includes("message=%C2%A1El%20proyecto%20se%20cre%C3%B3%20correctamente!")) {
                console.log("✅ Test PASSED: Project was created successfully.");
            } else {
                throw new Error("❌ Test FAILED: Project success message not found in URL. Project was not created.");
            }
            await driver.sleep(3000);    
        } finally {
            await driver.quit()
        }
    }).timeout(60000)
    it('Navigating To Create Project Page And Entering EMPTY input', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);

            await driver.sleep(1000);
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(500); 

            const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
            await submitButton.click();

            const projectNameError = await driver.findElement(By.id('projectNameError')).getText();
            assert.strictEqual(projectNameError, "El nombre del proyecto no puede estar vacío.", '❌ Did not catch missing Project Name');
    
            const descriptionError = await driver.findElement(By.id('descriptionError')).getText();
            assert.strictEqual(descriptionError, "La descripción no puede estar vacía.", '❌ Did not catch missing Description');
    
            const timeTakenError = await driver.findElement(By.id('timeTakenError')).getText();
            assert.strictEqual(timeTakenError, "La duración no puede estar vacía.", '❌ Did not catch missing Time Taken');
    
            const costError = await driver.findElement(By.id('costError')).getText();
            assert.strictEqual(costError, "El costo no puede estar vacío.", '❌ Did not catch missing Cost');
    
            const categoriesError = await driver.findElement(By.id('categoriesError')).getText();
            assert.strictEqual(categoriesError, "Selecciona al menos una categoría para el proyecto.", '❌ Did not catch missing Category');
    
            const imageError = await driver.findElement(By.id('imageError')).getText();
            assert.strictEqual(imageError, "Por favor, sube al menos una imagen (en uno de los 5 recuadros).", '❌ Did not catch missing Image');

            let endingURL = await driver.getCurrentUrl()
            assert.strictEqual(endingURL, "http://localhost:3000/createProject", '❌ App Left Login Page')
    
            console.log("✅ Test PASSED: All required field errors displayed correctly.");

            await driver.sleep(3000);    
        } finally {
        await driver.quit()
        }
    }).timeout(60000)

    it('Navigating To Create Project Page And Entering INVALID input', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await loginAsAdmin(driver);
            await driver.sleep(1000);

            await driver.findElement(By.id('projectName')).sendKeys('A'.repeat(31)); 
            await driver.findElement(By.id('descriptionText')).sendKeys('B'.repeat(301)); 
            await driver.findElement(By.id('timeTaken')).sendKeys('C'.repeat(16)); 
            await driver.findElement(By.id('cost')).sendKeys('D'.repeat(16)); 

            await driver.sleep(1000);
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(500); 

            await driver.sleep(1000);
            const imageBoxes = await driver.findElements(By.css('div[style*="width: 100px"][style*="height: 100px"]'));
            await imageBoxes[0].click();
            await driver.sleep(500);
            
            const imagePath = path.resolve(__dirname, './testImages/sample.pdf');
            const fileInput = await driver.wait(until.elementLocated(By.id('imageFile')), 5000);
            await fileInput.sendKeys(imagePath);
            await driver.sleep(1000);

            const projectNameError = await driver.findElement(By.id('projectNameError')).getText();
            assert.strictEqual(projectNameError, "Ha llegado al límite de 30 caracteres.", '❌ Name character limit not enforced');
    
            const descriptionError = await driver.findElement(By.id('descriptionError')).getText();
            assert.strictEqual(descriptionError, "Ha llegado al límite de 300 caracteres.", '❌ Description character limit not enforced');
    
            const timeTakenError = await driver.findElement(By.id('timeTakenError')).getText();
            assert.strictEqual(timeTakenError, "Ha llegado al límite de 15 caracteres.", '❌ TimeTaken character limit not enforced');

            const costError = await driver.findElement(By.id('costError')).getText();
            assert.strictEqual(costError, "Ha llegado al límite de 15 caracteres.", '❌ Cost character limit not enforced');
    
            const imageError = await driver.findElement(By.id('imageError')).getText();
            assert.strictEqual(imageError, "Solo se permiten imágenes en formato HEIC, PNG o JPEG.", '❌ Did not catch incorrect Image type');
    
            console.log("✅ Test PASSED: All required field errors displayed correctly.");

            await driver.sleep(3000);    
        } finally {
        await driver.quit()
        }        
    }).timeout(60000)
})