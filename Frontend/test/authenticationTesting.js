const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('User Authentication Functionality', async function () {
    it('Non Logged In User Attempting to Navigate To Client Dashboard', async function () {
        let driver = await new Builder().forBrowser('chrome').build()
        try {
          await driver.get('http://localhost:3000/')
          await driver.manage().window().maximize()

          await driver.sleep(1000)
          let menuButton = await driver.findElement(By.id('MenueB'));
          await menuButton.click()
          await driver.sleep(1000)

          let clientDashboardButton = await driver.findElement(By.id('dashboardButton'));
          await clientDashboardButton.click()
          await driver.sleep(3000)

          //Check That The Login Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/login"), 'Authentication Test FAILED, Login Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non-Admin User That Is Logged In Attempting to Navigate To Admin Dashboard', async function () {
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
          await emailInput.sendKeys("testing.noreply12@gmail.com") //Valid Email
          await driver.sleep(3000)
      
          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("NewPassword123$") //Valid Password 
          await driver.sleep(3000)
      
          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(3000)

          await driver.get('http://localhost:3000/adminDashboard')
          await driver.sleep(2000)

          //Check That The Home Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/", 'Authentication Test FAILED, Home Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non-Admin User That Is Logged In Attempting to Navigate To Client Dashboard', async function () {
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
          await emailInput.sendKeys("testing.noreply12@gmail.com") //Valid Email
          await driver.sleep(3000)
      
          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("NewPassword123$") //Valid Password 
          await driver.sleep(3000)
      
          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(3000)


          await driver.sleep(1000)
          let menuButtons = await driver.findElement(By.id('MenueB'));
          await menuButtons.click()
          await driver.sleep(1000)

          let clientDashboardButton = await driver.findElement(By.id('dashboardButton'));
          await clientDashboardButton.click()
          await driver.sleep(3000)

          //Check That The Client Dashboard Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/clientDashboard", 'Authentication Test FAILED, Client Dashboard Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Admin User That Is Logged In Attempting to Navigate To Admin Dashboard', async function () {
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
          await emailInput.sendKeys("NewAdmin@account.com") //Valid Email
          await driver.sleep(3000)
      
          let passwordInput = await driver.findElement(By.id('passwordInput'));
          await passwordInput.click()
          await driver.sleep(1000)
          await passwordInput.sendKeys("Admin12345$") //Valid Password 
          await driver.sleep(3000)
      
          let loginButton = await driver.findElement(By.id('LoginButton'));
          await loginButton.click()
          await driver.sleep(3000)


          await driver.sleep(1000)
          let menuButtons = await driver.findElement(By.id('MenueB'));
          await menuButtons.click()
          await driver.sleep(1000)

          let adminDashboardButton = await driver.findElement(By.id('dashboardButton'));
          await adminDashboardButton.click()
          await driver.sleep(3000)

          //Check That The Admin Dashboard Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/adminDashboard", 'Authentication Test FAILED, Admin Dashboard Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)
})