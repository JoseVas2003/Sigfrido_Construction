const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');
const { MongoClient } = require('mongodb');

//Function to log in as admin
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
}



describe('Admin Deleting a User Acconut via the Admin Dashboard Functionality', async function() {
    it('Navigating to Admin Dashboard and Deleting a Specific (Testing) User', async function(){
        let driver = await new Builder().forBrowser('chrome').build();
        const uri = "mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB";
        let client = new MongoClient(uri);
        await client.connect();
        db = client.db('Node-APi');
        try {
            await driver.get('http://localhost:3000/')
            await driver.manage().window().maximize()
            await driver.sleep(2000)

             //inserting testing user into the db to delete
            const collection = db.collection('users');
            const testingUser = {
                firstName: "Testing",
                lastName: "AdminDelete",
                email: "TestingAdminDelete@example.com",
                phone: "1234512345",
                password: "Testing123#",
                admin: false
            };

            await collection.insertOne(testingUser);
            
            await loginAsAdmin(driver); //login as admin

            let menuButton = await driver.wait(until.elementLocated(By.id('MenueB')), 5000);
            await menuButton.click()
            await driver.sleep(1000)

            let dashboardButton = await driver.wait(until.elementLocated(By.id('dashboardButton')), 5000);
            await dashboardButton.click()
            await driver.sleep(5000)

            //scroll to bottom of page
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
            await driver.sleep(1000)

            //scroll to bottom of users list
            const div = await driver.wait(until.elementLocated(By.id('usersSection')), 5000);
            await driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight;", div);
            await driver.sleep(1000)

            let specificDeleteButton = await driver.wait(until.elementLocated(By.id('TestingAdminDelete@example.com')), 5000);
            await specificDeleteButton.click()
            await driver.sleep(1000)

            //checking to make sure user was deleted from the database
            //const collection = db.collection('users');
            const documents = await collection.find().toArray();
            //console.log('All users detected: ', documents);
            const users = await collection.find({ email: 'TestingAdminDelete@example.com'}).toArray();
            assert.strictEqual(users.length, 0, 'Test FAILED, user still found in database');

        } finally {
            await driver.quit();
            await client.close();
        }
    }).timeout(60000)
})