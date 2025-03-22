const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

const categoriesToTest = [
    { id: 'category-ADU', name: 'ADU' },
    { id: 'category-Bathrooms', name: 'Bathrooms' },
    { id: 'category-Floors', name: 'Floors' },
    { id: 'category-Kitchen', name: 'Kitchen' },
    { id: 'category-Roofs', name: 'Roofs' },
    { id: 'category-Rooms', name: 'Rooms' },
  ];  

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

describe ('Portfolio functionality', async function () {
    for (const category of categoriesToTest) {    
        it(`Filtering projects by the "${category.name}" Category`, async function () {
            let driver = await new Builder().forBrowser('chrome').build()
            try {
                await driver.get('http://localhost:3000/portfolio');
                await driver.manage().window().maximize();
                await driver.sleep(1000);

                await driver.wait(until.elementLocated(By.id('filterButton')), 5000);
                await driver.sleep(1000);
                await driver.findElement(By.id('filterButton')).click();

                await driver.sleep(1000);
                await driver.wait(until.elementLocated(By.id(category.id)), 5000);
                await driver.sleep(1000);
                await driver.findElement(By.id(category.id)).click();
                await driver.sleep(1000);

                // Get all project cards
                const cards = await driver.findElements(By.css('[data-testid="project-category"]'));
                await driver.sleep(1000);

                // Loop through each category field and test it individually
                for (let card of cards) {
                    const text = await card.getText();
                    assert.ok(text.toLowerCase().includes(category.name.toLowerCase()),'❌ Card does not include the ADU category');
                }
                console.log(`✅ Test PASSED: "${category.name}" filter is functioning correctly.`);
                await driver.sleep(3000);    
            } finally {
            await driver.quit()
        }
    }).timeout(60000)
    }
    it('Filtering projects by the "All" Category', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000/portfolio');
            await driver.manage().window().maximize();
            await driver.sleep(1000);
    
            await driver.wait(until.elementLocated(By.id('filterButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('filterButton')).click();
    
            await driver.sleep(1000);
            await driver.wait(until.elementLocated(By.id('category-All')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('category-All')).click();
            await driver.sleep(2000);
    
            // Find all category fields in project cards
            const categoryElements = await driver.findElements(By.css('[data-testid="project-category"]'));
            assert.ok(categoryElements.length > 0, '❌ No project cards were displayed for "All" filter.');
    
            for (let el of categoryElements) {
                const text = await el.getText();
                assert.ok(
                    text.trim().length > 0,
                    '❌ One of the project cards has an empty category'
                );
            }
    
            console.log(`✅ Test PASSED: All filter shows projects with non-empty categories.`);
            await driver.sleep(3000);
        } finally {
            await driver.quit();
        }
    }).timeout(60000);
    it('Navigating To Edit Project Page Correctly from Portfolio Page', async function () { // we'd click on pencil icon and then click on a garbage icon (we'd have to assign those an id) and look for the 'Project has been deleted!' message.
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await loginAsAdmin(driver);
            await driver.sleep(1000);
    
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

            // Check that the URL is correct (starts with /editProject/)
            const url = await driver.getCurrentUrl();
            assert.ok(url.includes('/editProject/'), '❌ Did not navigate to editProject page. URL: ${url}');

            console.log(`✅ Test PASSED: Navigated to edit page: ${url}`);
            await driver.sleep(3000);
        } finally {
            await driver.quit()
        }
    }).timeout(60000)
    it('Deleting projects from Portfolio Page', async function () { // so we'd click on pencil icon (let's assign it an id) and then click on the Edit Project button (let's assign it an id as well) and read the current url
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await loginAsAdmin(driver);
            await driver.sleep(1000);
    
            await driver.wait(until.elementLocated(By.id('editButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('editButton')).click(); 
            await driver.sleep(1000);   

            const deleteButtons = await driver.findElements(By.id('deleteButton'));
            assert.ok(deleteButtons.length > 0, '❌ No delete buttons found on the portfolio page.');
            await driver.sleep(1000);

            // Click the first delete button
            await deleteButtons[0].click();
            await driver.sleep(1000);

            const notificationElement = await driver.wait(until.elementLocated(By.id('deleteNotification')),5000);
            const notificationText = await notificationElement.getText();

            assert.strictEqual(notificationText.trim(), 'Project has been deleted!', '❌ Notification message is incorrect or missing');
            console.log('✅ Test PASSED: Deleted project successfully');
            await driver.sleep(3000);
        } finally {
            await driver.quit()
        }
    }).timeout(60000)
})