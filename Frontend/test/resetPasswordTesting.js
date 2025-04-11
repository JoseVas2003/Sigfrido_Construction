const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('Reset Password Functionality', async function () 
{
    it('Navigating To Reset Password Page And Entering An INVALID Password - Less Than 8 Characters', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("pass") //Invalid Password - Less Than 8 Chacracters
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)


        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let passwordError = await driver.findElement(By.id('passwordError')).getText();
        assert.strictEqual(passwordError, "Your Password Must Be At Least 8 Characters", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Reset Password Page And Entering An INVALID Password - Greater Than 20 Characters', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("passpasspasspasspasspass") //Invalid Password - Greater Than 20 Chacracters
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)
        
        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let passwordError = await driver.findElement(By.id('passwordError')).getText();
        assert.strictEqual(passwordError, "Your Password Must Be Less Than 20 Characters", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Reset Password Page And Entering An INVALID Password - Does Not Contain A Capital Letter', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("password1$") //Invalid Password - Doesn't Contain A Capital Letter
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let passwordError = await driver.findElement(By.id('passwordError')).getText();
        assert.strictEqual(passwordError, "Your Password Must Contain At Least 1 Capital Letter", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Reset Password Page And Entering An INVALID Password - Does Not Contain A Special Character', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("Password1") //Invalid Password - Doesn't Contain A Special Character
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let passwordError = await driver.findElement(By.id('passwordError')).getText();
        assert.strictEqual(passwordError, "Password Requires At Least 1 Special Character", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Reset Password Page And Entering An INVALID Password - Input Is Empty', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("") //Invalid Password - Field Is Empty
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let passwordError = await driver.findElement(By.id('passwordError')).getText();
        assert.strictEqual(passwordError, "Please Enter Your Password", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- CONFIRM PASSWORD TESTING ---------------------------------------------------------------

    it('Navigating To Reset Password Page And Entering An INVALID Confirm Password - Input Is Empty', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("Password123$") //Valid Password
        await driver.sleep(1000)

        let resetPasswordConfirmInput = await driver.findElement(By.id('resetPasswordConfirmInput'));
        await resetPasswordConfirmInput.click()
        await driver.sleep(1000)
        await resetPasswordConfirmInput.sendKeys("") //Invalid Confirm Password - Field Empty
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let confirmPasswordError = await driver.findElement(By.id('confirmPasswordError')).getText();
        assert.strictEqual(confirmPasswordError, "Please Confirm Your Password", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Reset Password Page And Entering An INVALID Confirm Password - Passwords Dont Match', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("Password123$") //Valid Password
        await driver.sleep(1000)

        let resetPasswordConfirmInput = await driver.findElement(By.id('resetPasswordConfirmInput'));
        await resetPasswordConfirmInput.click()
        await driver.sleep(1000)
        await resetPasswordConfirmInput.sendKeys("Password123") //Invalid Confirm Password - Passwords Dont Match
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Didn't Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'none', 'Reset Password Testing FAILED, Success Popup Did Open');

        //Check That ERROR Message Displayed in Reset Password Page For Invalid Password Field, If So, Test PASSED.  Else, Test FAILED
        let confirmPasswordError = await driver.findElement(By.id('confirmPasswordError')).getText();
        assert.strictEqual(confirmPasswordError, "Your Passwords Don't Match", 'Reset Password Test FAILED, Did Not Catch Reset Password Error')
        
        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- VALID RESET PASSWORD TESTING ---------------------------------------------------------------
    it('Navigating To Reset Password Page And Entering A VALID New Password', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
        await driver.get('http://localhost:3000/resetPassword/ResetToken')
        await driver.manage().window().maximize()
        await driver.sleep(1000)

        let resetPasswordInput = await driver.findElement(By.id('resetPasswordInput'));
        await resetPasswordInput.click()
        await driver.sleep(1000)
        await resetPasswordInput.sendKeys("Password123$") //Valid Password
        await driver.sleep(1000)

        let resetPasswordConfirmInput = await driver.findElement(By.id('resetPasswordConfirmInput'));
        await resetPasswordConfirmInput.click()
        await driver.sleep(1000)
        await resetPasswordConfirmInput.sendKeys("Password123$") //Valid Confirm Password
        await driver.sleep(1000)

        let saveButton = await driver.findElement(By.id('saveButton'));
        await saveButton.click()
        await driver.sleep(2000)

        //Check That The Reset Password Success Popup Did Open, If So, Test PASSED.  Else, Test FAILED
        let popup = await driver.findElement(By.css('.popup'));
        let display = await popup.getCssValue('display');
        assert.strictEqual(display, 'flex', 'Reset Password Testing FAILED, Success Popup Did Not Open');

        } finally {
        await driver.quit()
        }
        
    }).timeout(60000)
})
