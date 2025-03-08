const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('Forgot Password Functionality', async function () 
{
    it('Navigating To Forgot Password Page And Entering A INORRECT Format For An Email', async function () {
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

          let forgotPasswordButton = await driver.findElement(By.id('forgotPasswordButton')); 
          await forgotPasswordButton.click()
          await driver.sleep(1000)
      
          let forgotPasswordEmailInput = await driver.findElement(By.id('forgotPasswordEmailInput'));
          await forgotPasswordEmailInput.click()
          await driver.sleep(1000)
          await forgotPasswordEmailInput.sendKeys("IncorrectFormat@") //Incorrect Format Email Field
          await driver.sleep(3000)
      
          let sendButton = await driver.findElement(By.id('openPopup'));
          await sendButton.click()
          await driver.sleep(3000)
      
          //Check That ERROR Message Displayed in Forgot PAssword Page For Invalid Format For Email Field, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, 'Please Enter A Valid Email', 'Test FAILED, Did Not Catch Login Error')
            
          
        } finally {
          await driver.quit()
        }
        
      }).timeout(60000)
      
      it('Navigating To Forgot Password Page And Entering A Email Without An "@" Symbol', async function () {
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

          let forgotPasswordButton = await driver.findElement(By.id('forgotPasswordButton')); 
          await forgotPasswordButton.click()
          await driver.sleep(1000)
      
          let forgotPasswordEmailInput = await driver.findElement(By.id('forgotPasswordEmailInput'));
          await forgotPasswordEmailInput.click()
          await driver.sleep(1000)
          await forgotPasswordEmailInput.sendKeys("IncorrectFormat") //Incorrect Format Email Field - No "@" Symbol
          await driver.sleep(3000)
            
          let sendButton = await driver.findElement(By.id('openPopup'));
          await sendButton.click()
          await driver.sleep(3000)
      
          //Check That ERROR Message Displayed in Forgot Password Page For Email Field Without An '@', If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, "Your Email Must Contain an '@' Symbol", 'Test FAILED, Did Not Catch Login Error')
          
        } finally {
          await driver.quit()
        }
        
      }).timeout(60000)

      it('Navigating To Forgot Password Page And Entering A INVALID Email - Empty Field', async function () {
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

          let forgotPasswordButton = await driver.findElement(By.id('forgotPasswordButton')); 
          await forgotPasswordButton.click()
          await driver.sleep(1000)
      
          let forgotPasswordEmailInput = await driver.findElement(By.id('forgotPasswordEmailInput'));
          await forgotPasswordEmailInput.click()
          await driver.sleep(1000)
          await forgotPasswordEmailInput.sendKeys("") //Incorrect Format Email Field - Empty Field
          await driver.sleep(3000)
            
          let sendButton = await driver.findElement(By.id('openPopup'));
          await sendButton.click()
          await driver.sleep(3000)
      
          //Check That ERROR Message Displayed in Forgot Password Page For Email Field Without An '@', If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, 'Please Enter Your Email', 'Test FAILED, Did Not Catch Login Error')
          
        } finally {
          await driver.quit()
        }
        
      }).timeout(60000)

      it('Navigating To Forgot Password Page And Entering A Email Not Associated With An Account', async function () {
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

          let forgotPasswordButton = await driver.findElement(By.id('forgotPasswordButton')); 
          await forgotPasswordButton.click()
          await driver.sleep(1000)
      
          let forgotPasswordEmailInput = await driver.findElement(By.id('forgotPasswordEmailInput'));
          await forgotPasswordEmailInput.click()
          await driver.sleep(1000)
          await forgotPasswordEmailInput.sendKeys("NotAUser@example.com") //Non User Account Email
          await driver.sleep(3000)
            
          let sendButton = await driver.findElement(By.id('openPopup'));
          await sendButton.click()
          await driver.sleep(3000)
      
          //Check That ERROR Message Displayed in Forgot Password Page For Not A User, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, 'This Email Is Not Associated With An Account', 'Test FAILED, Did Not Catch Login Error')
          
        } finally {
          await driver.quit()
        }
        
      }).timeout(60000)

      it('Navigating To Forgot Password Page And Entering A VALID Email', async function () {
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

          let forgotPasswordButton = await driver.findElement(By.id('forgotPasswordButton')); 
          await forgotPasswordButton.click()
          await driver.sleep(1000)
      
          let forgotPasswordEmailInput = await driver.findElement(By.id('forgotPasswordEmailInput'));
          await forgotPasswordEmailInput.click()
          await driver.sleep(1000)
          await forgotPasswordEmailInput.sendKeys("jimbocarry12@gmail.com") //Valid User Email
          await driver.sleep(3000)
            
          let sendButton = await driver.findElement(By.id('openPopup'));
          await sendButton.click()
          await driver.sleep(7000)
      
          //Check That SUCCESS Message Displayed in Forgot Password Page, If So, Test PASSED.  Else, Test FAILED
          let successPopup = await driver.findElement(By.id('popup'));
          let successDisplayed = await successPopup.isDisplayed();
          assert.strictEqual(successDisplayed, true, 'Forgot Password Testing FAILED, Popup Was Not Displayed');
          
        } finally {
          await driver.quit()
        }
        
      }).timeout(60000)
})