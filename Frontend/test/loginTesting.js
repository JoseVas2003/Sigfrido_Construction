const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('Login Functionality', async function () {
    it('Navigating To Login Page And Entering CORRECT Credentials', async function () {
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
          await emailInput.sendKeys("jimbocarry12@gmail.com") //Valid Email
          await driver.sleep(3000)

          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("Testing123$") //Valid Password
          await driver.sleep(3000)

          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(3000)

          //Check That The Homepage Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/", 'Login FAILED, Home Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Login Page And Entering INCORRECT Credentials', async function () {
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
        await emailInput.sendKeys("jimbocarry12@gmail.com") //Valid Email
        await driver.sleep(3000)

        let passwordInput = await driver.findElement(By.id('passwordInput'));
        await passwordInput.click()
        await driver.sleep(1000)
        await passwordInput.sendKeys("INCORRECT-PASSWORD") //Invalid Passowrd
        await driver.sleep(3000)

        let loginButton = await driver.findElement(By.id('LoginButton'));
        await loginButton.click()
        await driver.sleep(3000)

        //Check That ERROR Message Displayed in Login Page, If So, Test PASSED.  Else, Test FAILED
        let loginError = await driver.findElement(By.id('accountError')).getText();
        assert.strictEqual(loginError, '* Invalid Email or Password *', 'Test FAILED, Did Not Catch Login Error')

        //Check That The Login Page Is Still The Current Page, If So, Test PASSED.  Else, Test FAILED
        let endingURL = await driver.getCurrentUrl()
        assert.strictEqual(endingURL, "http://localhost:3000/login", 'Test FAILED, App Left Login Page')
        
      } finally {
        await driver.quit()
      }
      
  }).timeout(60000)

  it('Navigating To Login Page And NOT Entering Credentials', async function () {
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
      await emailInput.sendKeys("") //Empty Email Field
      await driver.sleep(3000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("") //Empty Password Field
      await driver.sleep(3000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      //Check That ERROR Message Displayed in Login Page For Empty Email Field, If So, Test PASSED.  Else, Test FAILED
      let emailError = await driver.findElement(By.id('emailError')).getText();
      assert.strictEqual(emailError, 'Please Enter Your Email', 'Test FAILED, Did Not Catch Login Error')

      //Check That ERROR Message Displayed in Login Page For Empty Password Field, If So, Test PASSED.  Else, Test FAILED
      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'Your Password Must Be At Least 8 Characters', 'Test FAILED, Did Not Catch Login Error')

      //Check That The Homepage Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
      let endingURL = await driver.getCurrentUrl()
      assert.strictEqual(endingURL, "http://localhost:3000/login", 'Test FAILED, App Left Login Page')
      
    } finally {
      await driver.quit()
    }
    
}).timeout(60000)

it('Navigating To Login Page And Entering A INORRECT Format For An Email', async function () {
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
    await emailInput.sendKeys("IncorrectFormat@") //Incorrect Format Email Field
    await driver.sleep(3000)

    let passwordInput = await driver.findElement(By.id('passwordInput'));
    await passwordInput.click()
    await driver.sleep(1000)
    await passwordInput.sendKeys("") //Empty Password Field
    await driver.sleep(3000)

    let loginButton = await driver.findElement(By.id('LoginButton'));
    await loginButton.click()
    await driver.sleep(3000)

    //Check That ERROR Message Displayed in Login Page For Invalid Format For Email Field, If So, Test PASSED.  Else, Test FAILED
    let emailError = await driver.findElement(By.id('emailError')).getText();
    assert.strictEqual(emailError, 'Please Enter A Valid Email', 'Test FAILED, Did Not Catch Login Error')

    //Check That ERROR Message Displayed in Login Page For Empty Password Field, If So, Test PASSED.  Else, Test FAILED
    let passwordError = await driver.findElement(By.id('passwordError')).getText();
    assert.strictEqual(passwordError, 'Your Password Must Be At Least 8 Characters', 'Test FAILED, Did Not Catch Login Error')

    //Check That The Homepage Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
    let endingURL = await driver.getCurrentUrl()
    assert.strictEqual(endingURL, "http://localhost:3000/login", 'Test FAILED, App Left Login Page')
    
  } finally {
    await driver.quit()
  }
  
}).timeout(60000)

it('Navigating To Login Page And Entering A Email Without An "@" Symbol', async function () {
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
    await emailInput.sendKeys("IncorrectFormat") //Incorrect Format Email Field
    await driver.sleep(3000)

    let passwordInput = await driver.findElement(By.id('passwordInput'));
    await passwordInput.click()
    await driver.sleep(1000)
    await passwordInput.sendKeys("") //Empty Password Field
    await driver.sleep(3000)

    let loginButton = await driver.findElement(By.id('LoginButton'));
    await loginButton.click()
    await driver.sleep(3000)

    //Check That ERROR Message Displayed in Login Page For Email Field Without An '@', If So, Test PASSED.  Else, Test FAILED
    let emailError = await driver.findElement(By.id('emailError')).getText();
    assert.strictEqual(emailError, 'Your Email Must Contain "@"', 'Test FAILED, Did Not Catch Login Error')

    //Check That ERROR Message Displayed in Login Page For Empty Password Field, If So, Test PASSED.  Else, Test FAILED
    let passwordError = await driver.findElement(By.id('passwordError')).getText();
    assert.strictEqual(passwordError, 'Your Password Must Be At Least 8 Characters', 'Test FAILED, Did Not Catch Login Error')

    //Check That The Homepage Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
    let endingURL = await driver.getCurrentUrl()
    assert.strictEqual(endingURL, "http://localhost:3000/login", 'Test FAILED, App Left Login Page')
    
  } finally {
    await driver.quit()
  }
  
}).timeout(60000)
})
