const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { MongoClient } = require('mongodb');

// Function to log in as admin
async function loginAsAdmin(driver) {
    await driver.get('http://localhost:3000/login');
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    const emailInput = await driver.wait(until.elementLocated(By.id('emailInput')), 5000);
    await emailInput.sendKeys("NewAdmin@account.com");

    const passwordInput = await driver.wait(until.elementLocated(By.id('passwordInput')), 5000);
    await passwordInput.sendKeys("Admin12345$");

    const loginButton = await driver.wait(until.elementLocated(By.id('LoginButton')), 5000);
    await loginButton.click();

    await driver.sleep(1000);
}

describe('Admin Deleting a Review via Admin Dashboard', function () {
    it('Navigates to Dashboard and Deletes a Test Review', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        const uri = "mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/Node-APi?retryWrites=true&w=majority&appName=BackendDB";
        let client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Node-API');
        const collection = db.collection('reviews');

        try {
            // Insert a test review into the database
            const testReview = {
                reviewText: "Test review for deletion",
                userId: 1,
                rating: 5
            };
            const insertedReview = await collection.insertOne(testReview);
            const reviewId = insertedReview.insertedId.toString();
            console.log(`Inserted test review with ID: ${reviewId}`);

            await driver.get('http://localhost:3000/');
            await driver.manage().window().maximize();
            await driver.sleep(2000);

            // Login as admin
            await loginAsAdmin(driver);

            let menuButton = await driver.wait(until.elementLocated(By.id('MenueB')), 5000);
            await menuButton.click();
            await driver.sleep(1000);

            let dashboardButton = await driver.wait(until.elementLocated(By.id('dashboardButton')), 5000);
            await dashboardButton.click();
            await driver.sleep(5000);

            // Scroll to the reviews section
            const reviewsDiv = await driver.wait(until.elementLocated(By.id('reviewsSection')), 5000);
            await driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight;", reviewsDiv);
            await driver.sleep(1000);

            // Find the delete button for the specific review
            let deleteButton = await driver.wait(until.elementLocated(By.id(`delete-${reviewId}`)), 5000);
            await deleteButton.click();
            await driver.sleep(1000);

            // Verify review has been removed from the database
            const deletedReview = await collection.findOne({ _id: insertedReview.insertedId });
            assert.strictEqual(deletedReview, null, 'Test FAILED: Review still found in database');

            console.log('Test PASSED: Review successfully deleted');

        } finally {
            await driver.quit();
            await client.close();
        }
    }).timeout(60000);
});