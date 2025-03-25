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
          await emailInput.sendKeys("Non-Admin@account.com") //Valid Email
          await driver.sleep(1000)

          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("NonAdmin123") //Valid Password
          await driver.sleep(1000)

          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(1000)
        
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

                await driver.findElement(By.id('emailInput')).sendKeys("Non-Admin@account.com");
                await driver.findElement(By.id('passwordInput')).sendKeys("NonAdmin123");
                await driver.findElement(By.id('LoginButton')).click();
                await driver.sleep(1000);

                await driver.get('http://localhost:3000/schedule');
                await driver.sleep(1000);
                
                let submitButton = await driver.findElement(By.id('submitButton'));
                await submitButton.click();
                await driver.sleep(1000);

                await driver.findElement(By.name('name')).sendKeys('Test User');
                await submitButton.click();
                await driver.sleep(1000);

                await driver.findElement(By.name('email')).sendKeys('testuser@senior191.com');
                await submitButton.click();
                await driver.sleep(1000);

                await driver.findElement(By.name('phone')).sendKeys('1234567890');
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
                await submitButton.click();
                await driver.sleep(2000);            

                await alert.accept();
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
            assert.strictEqual(successAlertText, 'Appointment scheduled successfully!', 'Test FAILED: Did successfully submit');
            await alert.accept();
            console.log("Test PASSED: Alert triggered correctly for missing date/time.");
    
            console.log("Field validation tests passed.");
        } finally {
            await driver.quit();
        }
    }).timeout(60000);
    

})
