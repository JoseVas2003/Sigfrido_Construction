const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

const categoriesToTest = [
    "ADU",
    "Bathrooms",
    "Floors",
    "Kitchens",
    "Roofs",
    "Rooms",
    "Pavement"
];
  
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
}

describe ('Portfolio functionality', async function () {
    for (const category of categoriesToTest) {
        it(`Filtering projects by the "${category}" Category`, async function () {
            let driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('http://localhost:3000/portfolio');
                await driver.manage().window().maximize();
                await driver.sleep(1000);
        
                const filterSelect = await driver.wait(until.elementLocated(By.id("filter")), 5000);
                await filterSelect.sendKeys(category); // This sets the <select>'s value by visible text
                await driver.sleep(3000); // Wait for the filter to apply
        
                const cards = await driver.findElements(By.css('[data-testid="project-card"]'));
                assert.ok(cards.length > 0, `❌ No projects found after selecting category "${category}"`);
        
                for (let card of cards) {
                    const catText = await card.getText();
                    assert.ok(
                        catText.toLowerCase().includes(category.toLowerCase()),
                        `❌ Card does not include the "${category}" category`
                    );
                }
      
                console.log(`✅ Test PASSED: "${category}" filter is functioning correctly.`);
                await driver.sleep(1000);
            } finally {
                await driver.quit();
            }
        }).timeout(60000);
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
            const filterSelect = await driver.wait(until.elementLocated(By.id("filter")), 5000);

            await driver.sleep(1000);
            await filterSelect.sendKeys("All");
            await driver.sleep(2000);
    
            const categoryElements = await driver.findElements(By.css('[id="project-category"]'));
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

    it('Navigating To Edit Project Page Correctly from Portfolio Page', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await loginAsAdmin(driver);
            await driver.sleep(1000);
    
            await driver.wait(until.elementLocated(By.id('editButton')), 5000);
            await driver.sleep(1000);
            await driver.findElement(By.id('editButton')).click(); 
            await driver.sleep(1000);   

            const editButtons = await driver.findElements(By.css('[data-testid="edit-project-button"]'));
            assert.ok(editButtons.length > 0, '❌ No edit buttons found');
            await driver.sleep(1000);

            await editButtons[0].click();
            await driver.sleep(1000);

            const url = await driver.getCurrentUrl();
            assert.ok(url.includes('/editProject/'), '❌ Did not navigate to editProject page. URL: ${url}');

            console.log(`✅ Test PASSED: Navigated to edit page: ${url}`);
            await driver.sleep(3000);
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Deleting projects from Portfolio Page', async function () { 
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

            await deleteButtons[0].click();
            await driver.sleep(1000);

            const notificationElement = await driver.wait(until.elementLocated(By.id('deleteNotification')),5000);
            const notificationText = await notificationElement.getText();

            assert.strictEqual(notificationText.trim(), '¡Proyecto eliminado!', '❌ Notification message is incorrect or missing');
            console.log('✅ Test PASSED: Deleted project successfully');
            await driver.sleep(3000);
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Scrolling through images in projects from Portfolio Page', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000/portfolio');
            await driver.manage().window().maximize();
            await driver.sleep(2000);
    
            await driver.wait(until.elementsLocated(By.css('[data-testid="project-card"]')), 5000);
            const cards = await driver.findElements(By.css('[data-testid="project-card"]'));
            assert.ok(cards.length > 0, '❌ No project cards found on the portfolio page.');
    
            const firstCard = cards[0];
            
            const nextArrow = await firstCard.findElement(By.css('[data-testid="next-arrow"]'));
            const prevArrow = await firstCard.findElement(By.css('[data-testid="prev-arrow"]'));
    
            assert.ok(nextArrow, '❌ Next arrow not found in the first card.');
            assert.ok(prevArrow, '❌ Previous arrow not found in the first card.');
    
            await nextArrow.click();
            await driver.sleep(500);
            await prevArrow.click();
            await driver.sleep(500);
    
            console.log('✅ Test PASSED: Arrow buttons found and clicked successfully.');
    
        } finally {
            await driver.quit();
        }
    }).timeout(60000);
})