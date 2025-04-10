// adminEditProjectProgressTest.js
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { MongoClient, ObjectId } = require('mongodb');

async function loginAsAdmin(driver) {
    await driver.get('http://localhost:3000/login');
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.id('emailInput')).sendKeys("NewAdmin@account.com");
    await driver.findElement(By.id('passwordInput')).sendKeys("Admin12345$");
    await driver.findElement(By.id('LoginButton')).click();
    await driver.sleep(1000);
}

describe('Admin Editing Project Progress (Completion Date)', function () {
    it('Should update when a project is marked as completed', async function () {
        const driver = await new Builder().forBrowser('chrome').build();
        const uri = "mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/Node-APi?retryWrites=true&w=majority&appName=BackendDB";
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Node-APi');
        const collection = db.collection('projects');

        // Insert test project
        const testProject = {
            clientName: "Test Project",
            email: "test@project.com",
            status: "In Progress",
            estimatedCompletionDate: "2025-05-01"
        };

        const inserted = await collection.insertOne(testProject);
        const projectId = inserted.insertedId.toString();
        console.log(`Inserted test project with ID: ${projectId}`);

        try {
            await loginAsAdmin(driver);
            await driver.get("http://localhost:3000/AdminProjects");
            await driver.sleep(2000);

            // Click edit button for the test project (adjust this ID or selector as needed)
            const editBtn = await driver.wait(until.elementLocated(By.id(`edit-${projectId}`)), 5000);
            await editBtn.click();
            await driver.sleep(1000);

            // Update the estimated completion date
            const dateInput = await driver.findElement(By.name("estimatedCompletionDate"));
            await dateInput.clear();
            await dateInput.sendKeys("2025-06-01");

            // Submit the form
            const submitBtn = await driver.findElement(By.id("submitEdit"));
            await submitBtn.click();
            await driver.sleep(2000);

            // Verify DB updated
            const updated = await collection.findOne({ _id: inserted.insertedId });
            assert.strictEqual(updated.estimatedCompletionDate, "2025-06-01");
            console.log("Test PASSED: Project completion date successfully updated");
        } finally {
            await collection.deleteOne({ _id: inserted.insertedId }); // Clean up
            await driver.quit();
            await client.close();
        }
    }).timeout(60000);
});
