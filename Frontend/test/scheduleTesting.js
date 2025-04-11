const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('Scheduling Appointment Functionality', async function () {
    it('Navigating To Login Page And head to the Scheduling Page', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
          await driver.get('http://localhost:3000/')
          await driver.manage().window().maximize()

          await driver.sleep(1000)
          let menuButton = await driver.findElement(By.id('MenueB'));
          await menuButton.click()
          await driver.sleep(1000)

          let loginMenuButton = await driver.findElement(By.id('loginButton'));
          await loginMenuButton.click()
          await driver.sleep(1000)

          let emailInput = await driver.findElement(By.id('emailInput'));
          await emailInput.click()
          await driver.sleep(1000)
          await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Email
          await driver.sleep(1000)

          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("NonAdmin12345$") //Valid Password
          await driver.sleep(1000)

          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(3000)
        
          await driver.get('http://localhost:3000/schedule')
          await driver.sleep(3000)

          //Check That The schedule Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/schedule", 'Login SUCCESSFUL, Home Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

        it('Form Submission Validation - Missing Fields Triggers Alerts', async function () {
            let driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('http://localhost:3000/login');
                await driver.manage().window().maximize();

                await driver.findElement(By.id('emailInput')).sendKeys("NewNon-Admin@account.com");
                await driver.findElement(By.id('passwordInput')).sendKeys("NonAdmin12345$");
                await driver.findElement(By.id('LoginButton')).click();
                await driver.sleep(3000);

                await driver.get('http://localhost:3000/schedule');
                await driver.sleep(1000);
                
                let submitButton = await driver.findElement(By.id('submitButton'));
                await submitButton.click();
                await driver.sleep(1000);

                const nameInput = await driver.findElement(By.name('name'));
                await nameInput.sendKeys('Test User1');
                await submitButton.click();
                await driver.sleep(1000);

                await nameInput.clear();
                await nameInput.sendKeys('Test User');
                await submitButton.click();
                await driver.sleep(1000);

                const emailInput = await driver.findElement(By.name('email'));
                await emailInput.sendKeys('senior191.com');
                await submitButton.click();
                await driver.sleep(1000);                

                await emailInput.clear();
                await emailInput.sendKeys('testuser@senior191.com');
                await submitButton.click();
                await driver.sleep(1000);

                const phoneInput = await driver.findElement(By.name('phone'));

                await phoneInput.sendKeys('1234567890A');
                await submitButton.click();
                await driver.sleep(1000);

                await phoneInput.clear();
                await phoneInput.sendKeys('12');
                await submitButton.click();
                await driver.sleep(1000);

                await phoneInput.clear();
                await phoneInput.sendKeys('adfghjklqw');
                await submitButton.click();
                await driver.sleep(1000);

                await phoneInput.clear();
                await phoneInput.sendKeys('1234567890'); 
                await submitButton.click();
                await driver.sleep(1000);

                await driver.findElement(By.name('message')).sendKeys('Test');
                await submitButton.click();
                await driver.sleep(1000);

                await driver.wait(until.alertIsPresent(), 5000);
                let alert = await driver.switchTo().alert();
                let alertText = await alert.getText();
                console.log("ALERT:", alertText);
                assert.strictEqual(alertText, 'Please select a date and time.', 'Test FAILED: Did Not Catch Missing Date/Time Alert');
                await alert.accept();
                console.log("Test PASSED: Alert triggered correctly for missing date/time.");

                // Select a date
                 let nextMonthButton = await driver.findElement(By.xpath("//button[text()='Next']"));
                await nextMonthButton.click();
                await driver.sleep(2000);            
                

                await submitButton.click();
                await driver.sleep(2000);                        
            
            await driver.wait(until.alertIsPresent(), 5000);
            console.log("ALERT:", alertText);
            assert.strictEqual(alertText, 'Please select a date and time.', 'Test FAILED: Did Not Catch Missing Date/Time Alert');
            await alert.accept();
            console.log("Test PASSED: Alert triggered correctly for missing date/time.");

    
            console.log("Field validation tests passed.");
        } finally {
            await driver.quit();
        }
    }).timeout(60000);

    it('Form Submission Validation - Successful submission', async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000/login');
            await driver.manage().window().maximize();

            await driver.findElement(By.id('emailInput')).sendKeys("NewNon-Admin@account.com");
            await driver.findElement(By.id('passwordInput')).sendKeys("NonAdmin12345$");
            await driver.findElement(By.id('LoginButton')).click();
            await driver.sleep(3000);

            await driver.get('http://localhost:3000/schedule');
            await driver.sleep(1000);
            
            let submitButton = await driver.findElement(By.id('submitButton'));
            await driver.sleep(1000);

            await driver.findElement(By.name('name')).sendKeys('Test User');
            await driver.sleep(1000);

            await driver.findElement(By.name('email')).sendKeys('testuser@senior191.com');
            await driver.sleep(1000);

            await driver.findElement(By.name('phone')).sendKeys('1234567890');
            await driver.sleep(1000);

            await driver.findElement(By.name('message')).sendKeys('Test');
            await driver.sleep(1000);

            // Select a date
             let nextMonthButton = await driver.findElement(By.xpath("//button[text()='Next']"));
            await nextMonthButton.click();
            await driver.sleep(2000);            
            
            let calendarDays = await driver.findElements(By.css('.calendarDay'));

            for (let day of calendarDays) {
                let classes = await day.getAttribute('class');
                let text = await day.getText();
            
                if (!classes.includes('disabledDay') && text.trim() !== '') {
                    console.log("Clicking on calendar day:", text);
                    await day.click();
                    await driver.sleep(2000);
                    break;
                }
            }
            await driver.sleep(2000);            

            // Select a time
        let timeButton = await driver.findElement(By.css('.timeSlotButton'));
        await timeButton.click();
        await driver.sleep(2000);

        await submitButton.click();
        await driver.sleep(10000);            
        
        await driver.wait(until.alertIsPresent(), 5000);
        let successAlert = await driver.switchTo().alert();
        let successAlertText = await successAlert.getText();
        console.log("ALERT:", successAlertText);
        assert.strictEqual(successAlertText, 'Appointment scheduled!', 'Test FAILED: Did successfully submit');
        await successAlert.accept();
        console.log("Test PASSED: Alert triggered correctly for missing date/time.");

        console.log("Field validation tests passed.");
    } finally {
        await driver.quit();
    }
}).timeout(60000);

it('Reschedule Form Submission Validation - Missing Fields Triggers Alerts - USER', async function () {
    let driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get('http://localhost:3000/login');
        await driver.manage().window().maximize();

        // Login
        await driver.findElement(By.id('emailInput')).sendKeys("NewNon-Admin@account.com");
        await driver.findElement(By.id('passwordInput')).sendKeys("NonAdmin12345$");
        await driver.sleep(1000);
        await driver.findElement(By.id('LoginButton')).click();
        await driver.sleep(3000);

        await driver.get('http://localhost:3000/schedule');
        await driver.sleep(2000);

        // Click the first reschedule button
        const rescheduleButtons = await driver.findElements(By.css('.rescheduleButton'));
        if (rescheduleButtons.length === 0) throw new Error("No appointments found to reschedule.");
        await rescheduleButtons[0].click();
        await driver.sleep(1000);

        // Should see custom alert for missing date/time
        const alert1 = await driver.wait(until.alertIsPresent(), 3000);
        const alertText1 = await alert1.getText();
        console.log("ALERT 1:", alertText1);
        assert.strictEqual(alertText1, "Please select a new date and time before rescheduling.");
        await driver.sleep(3000);
        await alert1.accept();

        // Select a date
        const nextMonthButton = await driver.findElement(By.xpath("//button[text()='Next']"));
        await nextMonthButton.click();
        await driver.sleep(1000);

        const calendarDays = await driver.findElements(By.css('.calendarDay:not(.disabledDay)'));
        for (let day of calendarDays) {
            const dayText = await day.getText();
            if (dayText.trim()) {
                await day.click();
                break;
            }
        }
        await driver.sleep(1000);

        // Click reschedule again — still missing time
        await rescheduleButtons[0].click();
        const alert2 = await driver.wait(until.alertIsPresent(), 3000);
        const alertText2 = await alert2.getText();
        console.log("ALERT 2:", alertText2);
        assert.strictEqual(alertText2, "Please select a new date and time before rescheduling.");
        await driver.sleep(3000);
        await alert2.accept();

        // Now select a time
        const timeButtons = await driver.findElements(By.css('.timeSlotButton'));
        assert.ok(timeButtons.length > 0, "No available time buttons found.");
        await timeButtons[0].click();
        await driver.sleep(1000);

        // Enter message 
        const messageInput = await driver.findElement(By.name('message'));
        await messageInput.clear();
        await messageInput.sendKeys("Rescheduling from test.");

        // Reschedule with date/time selected
        await rescheduleButtons[0].click();

        // Wait for custom modal and confirm
        const modal = await driver.wait(until.elementLocated(By.css('.popup-content')), 5000);
        const modalText = await modal.findElement(By.css('.popup-message')).getText();
        console.log("MODAL CONFIRMATION:", modalText);
        assert.ok(modalText.includes("Are you sure you want to reschedule"), "Missing expected confirmation message.");
        await driver.sleep(3000);
        await modal.findElement(By.css('.confirm-button')).click();

        console.log("Reschedule test passed with validation and modal steps.");
    } finally {
        await driver.quit();
    }
}).timeout(60000);

it('Reschedule Form Submission Validation - Successful submission - ADMIN', async function () {
    let driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get('http://localhost:3000/login');
        await driver.manage().window().maximize();

        // Login
        await driver.findElement(By.id('emailInput')).sendKeys("NewAdmin@account.com");
        await driver.findElement(By.id('passwordInput')).sendKeys("Admin12345$");
        await driver.sleep(1000);
        await driver.findElement(By.id('LoginButton')).click();
        await driver.sleep(3000);

        await driver.get('http://localhost:3000/schedule');
        await driver.sleep(2000);

        // Click the first reschedule button
        const rescheduleButtons = await driver.findElements(By.css('.rescheduleButton'));
        if (rescheduleButtons.length === 0) throw new Error("No appointments found to reschedule.");

        // Select a date
        const nextMonthButton = await driver.findElement(By.xpath("//button[text()='Next']"));
        await nextMonthButton.click();
        await driver.sleep(1000);

        const calendarDays = await driver.findElements(By.css('.calendarDay:not(.disabledDay)'));
        for (let day of calendarDays) {
            const dayText = await day.getText();
            if (dayText.trim()) {
                await day.click();
                break;
            }
        }
        await driver.sleep(1000);

        // Now select a time
        const timeButtons = await driver.findElements(By.css('.timeSlotButton'));
        assert.ok(timeButtons.length > 0, "No available time buttons found.");
        await timeButtons[0].click();
        await driver.sleep(1000);

        // Enter message 
        const messageInput = await driver.findElement(By.name('message'));
        await messageInput.clear();
        await messageInput.sendKeys("Rescheduling from test.");

        // Reschedule with date/time selected
        await rescheduleButtons[0].click();

        // Wait for custom modal and confirm
        const modal = await driver.wait(until.elementLocated(By.css('.popup-content')), 5000);
        const modalText = await modal.findElement(By.css('.popup-message')).getText();
        console.log("MODAL CONFIRMATION:", modalText);
        assert.ok(modalText.includes("Are you sure you want to reschedule"), "Missing expected confirmation message.");
        await driver.sleep(3000);
        await modal.findElement(By.css('.confirm-button')).click();

        // Wait for final success alert
        const successAlert = await driver.wait(until.alertIsPresent(), 5000);
        const successText = await successAlert.getText();
        console.log("SUCCESS ALERT:", successText);
        assert.strictEqual(successText, "Appointment rescheduled successfully.");
        await driver.sleep(3000);
        await successAlert.accept();

        console.log("Reschedule test passed with validation and modal steps.");
    } finally {
        await driver.quit();
    }
}).timeout(60000);

it('Cancel Appointment Test - Works for User', async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to login page
        await driver.get('http://localhost:3000/login');
        await driver.manage().window().maximize();

        // Login (update creds if testing admin)
        await driver.findElement(By.id('emailInput')).sendKeys("NewNon-Admin@account.com");
        await driver.findElement(By.id('passwordInput')).sendKeys("NonAdmin12345$");
        await driver.findElement(By.id('LoginButton')).click();
        await driver.sleep(3000);

        // Navigate to scheduling page
        await driver.get('http://localhost:3000/schedule');
        await driver.sleep(2000);

        // Find and click the first cancel button
        const cancelButtons = await driver.findElements(By.css('.cancelButton'));
        assert.ok(cancelButtons.length > 0, "No cancel buttons found — make sure there are appointments.");
        await cancelButtons[0].click();
        await driver.sleep(1000);

        // Wait for confirmation modal
        const modal = await driver.wait(until.elementLocated(By.css('.popup-content')), 5000);
        const modalText = await modal.findElement(By.css('.popup-message')).getText();
        console.log("CANCEL MODAL TEXT:", modalText);
        assert.ok(
            modalText.includes("Are you sure you want to cancel this appointment"),
            "Missing expected cancel confirmation message."
        );
        await driver.sleep(2000);

        // Click Confirm button
        const confirmBtn = await modal.findElement(By.css('.confirm-button'));
        await confirmBtn.click();

        // Wait for final success alert
        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        console.log("ALERT (Success):", alertText);
        assert.strictEqual(alertText, "Appointment canceled successfully.");
        await driver.sleep(2000);
        await alert.accept();

        console.log("Cancel appointment test passed.");
    } finally {
        await driver.quit();
    }
}).timeout(60000);

it('Cancel Appointment Test - Works for Admin', async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to login page
        await driver.get('http://localhost:3000/login');
        await driver.manage().window().maximize();

        // Login (update creds if testing admin)
        await driver.findElement(By.id('emailInput')).sendKeys("NewAdmin@account.com");
        await driver.findElement(By.id('passwordInput')).sendKeys("Admin12345$");
        await driver.findElement(By.id('LoginButton')).click();
        await driver.sleep(3000);

        // Navigate to scheduling page
        await driver.get('http://localhost:3000/schedule');
        await driver.sleep(2000);

        // Find and click the first cancel button
        const cancelButtons = await driver.findElements(By.css('.cancelButton'));
        assert.ok(cancelButtons.length > 0, "No cancel buttons found — make sure there are appointments.");
        await cancelButtons[0].click();
        await driver.sleep(1000);

        // Wait for confirmation modal
        const modal = await driver.wait(until.elementLocated(By.css('.popup-content')), 5000);
        const modalText = await modal.findElement(By.css('.popup-message')).getText();
        console.log("CANCEL MODAL TEXT:", modalText);
        assert.ok(
            modalText.includes("Are you sure you want to cancel this appointment"),
            "Missing expected cancel confirmation message."
        );
        await driver.sleep(2000);

        // Click Confirm button
        const confirmBtn = await modal.findElement(By.css('.confirm-button'));
        await confirmBtn.click();

        // Wait for final success alert
        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        console.log("ALERT (Success):", alertText);
        assert.strictEqual(alertText, "Appointment canceled successfully.");
        await driver.sleep(2000);
        await alert.accept();

        console.log("Cancel appointment test passed.");
    } finally {
        await driver.quit();
    }
}).timeout(60000);

})