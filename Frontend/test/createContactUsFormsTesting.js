const { Builder, By, until, logging, Capabilities } = require('selenium-webdriver');
const assert = require('assert');
const caps = Capabilities.chrome();
caps.set('goog:loggingPrefs', { browser: 'ALL' });
const { describe } = require('node:test');

// ------------ MISSING INPUT TESTING ------------

describe('Create Contact Us Form Functionality', async function()
{
    it('Navigating to Contact Us Page and Entering ONLY a First Name', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Navigating to Contact Us Page and Entering ONLY a First Name and Last Name', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Navigating to Contact Us Page and Entering ONLY a First Name, Last Name and Email', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Navigating to Contact Us Page and Entering ONLY a First Name, Last Name, Email and Phone', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing Message', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing Subject', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing Phone', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing Email', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing Last Name', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting Contact Us Form Missing First Name', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    // ------------ INCORRECT INPUT TEST ------------
    it('Submitting a Contact Us Form With INVALID Email Format', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testingemail.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)

    it('Submitting a Contact Us Form With INVALID Phone Format', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("1234567890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form wasn't submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, false, 'Test FAILED, Did not catch missing inputs')
        } finally {
            await driver.quit()
        }
    }).timeout(60000)


    // ------------ CORRECT INPUT TEST ------------
    it('Succesfully Submitting a Contact Us Form', async function() {
        let driver = await new Builder().forBrowser('chrome').withCapabilities(caps).build();
        try {
            await driver.get('http://localhost:3000/contactPage')
            await driver.manage().window().maximize()

            await driver.sleep(1000)
            let firstNameIn = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
            await driver.sleep(1000)
            await firstNameIn.sendKeys("TestingFirst")
            await driver.sleep(1000)

            let lastNameIn = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
            await driver.sleep(1000)
            await lastNameIn.sendKeys("TestingLast")
            await driver.sleep(1000)

            let emailIn = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await driver.sleep(1000)
            await emailIn.sendKeys("Testing@email.com")
            await driver.sleep(1000)

            let phoneIn = await driver.wait(until.elementLocated(By.id('phone')), 5000);
            await driver.sleep(1000)
            await phoneIn.sendKeys("123-456-7890")
            await driver.sleep(1000)

            let subjectIn = await driver.wait(until.elementLocated(By.id('subject')), 5000);
            await driver.sleep(1000)
            await subjectIn.sendKeys("Testing Subject")
            await driver.sleep(1000)

            let messageIn = await driver.wait(until.elementLocated(By.id('message')), 5000);
            await driver.sleep(1000)
            await messageIn.sendKeys("Testing Message")
            await driver.sleep(1000)

            let submitButton = await driver.findElement(By.id('submitButton'));
            await submitButton.click()
            await driver.sleep(2000)

            //Check to make sure form was submitted via logs
            const logs = await driver.manage().logs().get('browser');
            //print logs for debugging
            logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
            //check to see if submition message exists
            const messageExists = logs.some(log => log.message.includes("SUBMITTED"));
            assert.strictEqual(messageExists, true, 'Test FAILED, Did not submit form');
        } finally {
            await driver.quit()
        }
}).timeout(60000)

})