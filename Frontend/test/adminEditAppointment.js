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

describe('Admin Editing an Appointment via Dashboard', function () {
    it('Should open edit form and update appointment fields', async function () {
        const driver = await new Builder().forBrowser('chrome').build();
        const uri = "mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/Node-APi?retryWrites=true&w=majority&appName=BackendDB";
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Node-APi'); // Note the lowercase 'i'
        const collection = db.collection('appointments');

        // Insert a test appointment
        const testAppointment = {
            clientName: "Original Client",
            serviceType: "Initial Service",
            date: "2025-04-20",
            time: "12:00"
        };

        const inserted = await collection.insertOne(testAppointment);
        const appointmentId = inserted.insertedId.toString();
        console.log(`Inserted test appointment with ID: ${appointmentId}`);

        try {
            await loginAsAdmin(driver);

            // Navigate to Admin Appointments page
            await driver.get("http://localhost:3000/AdminAppointments");
            await driver.sleep(2000);

            // Click the edit button for that specific appointment
            const editButton = await driver.wait(until.elementLocated(By.id(`edit-${appointmentId}`)), 5000);
            await editButton.click();
            await driver.sleep(1000);

            // Fill new values in the form
            await driver.findElement(By.name("clientName")).clear();
            await driver.findElement(By.name("clientName")).sendKeys("Updated Client");

            await driver.findElement(By.name("serviceType")).clear();
            await driver.findElement(By.name("serviceType")).sendKeys("Updated Service");

            await driver.findElement(By.name("date")).clear();
            await driver.findElement(By.name("date")).sendKeys("2025-05-01");

            await driver.findElement(By.name("time")).clear();
            await driver.findElement(By.name("time")).sendKeys("15:30");

            // Submit
            await driver.findElement(By.id("submitEdit")).click();
            await driver.sleep(2000);

            // Fetch from DB and verify update
            const updated = await collection.findOne({ _id: inserted.insertedId });

            assert.strictEqual(updated.clientName, "Updated Client");
            assert.strictEqual(updated.serviceType, "Updated Service");
            assert.strictEqual(updated.date, "2025-05-01");
            assert.strictEqual(updated.time, "15:30");

            console.log("Test PASSED: Appointment successfully updated");

        } finally {
            await collection.deleteOne({ _id: inserted.insertedId }); // Clean up
            await driver.quit();
            await client.close();
        }
    }).timeout(60000);
});