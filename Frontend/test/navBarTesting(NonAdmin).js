const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

describe('Navigation Bar Testing (Logged in as a Non Admin User)', async function () {
    it('Non Admin User Logged In Attempting to Navigate To Home Page', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let homeButton = await driver.findElement(By.id('homeButton'));
            await homeButton.click()
            await driver.sleep(3000)

          //Check That The Home Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/"), 'NavBar Test FAILED, Home Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non Admin User Logged In Attempting to Navigate To Portfolio Page', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let portfolioButton = await driver.findElement(By.id('portfolioButton'));
            await portfolioButton.click()
            await driver.sleep(3000)

          //Check That The Portfolio Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/portfolio"), 'NavBar Test FAILED, Portfolio Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non Admin User Logged In Attempting to Navigate To Meet The Owner Page', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let meetTheOwnerButton = await driver.findElement(By.id('meetTheOwnerButton'));
            await meetTheOwnerButton.click()
            await driver.sleep(3000)

          //Check That The Meet The Owner Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/meetTheOwner"), 'NavBar Test FAILED, Meet The Owner Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non Admin User Logged In Attempting to Navigate To Reviews Page', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let reviewsButton = await driver.findElement(By.id('reviewsButton'));
            await reviewsButton.click()
            await driver.sleep(3000)

          //Check That The Reviews Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/reviews"), 'NavBar Test FAILED, Reviews Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non Admin User Logged In Attempting to Navigate To Client Dashboard Page', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let dashboardButton = await driver.findElement(By.id('dashboardButton'));
            await dashboardButton.click()
            await driver.sleep(3000)

          //Check That The Admin Dashboard Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/clientDashboard"), 'NavBar Test FAILED, Client Dashboard Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Non Admin User Logged In Attempting to Navigate To The Logout Button', async function () {
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
            await emailInput.sendKeys("NewNon-Admin@account.com") //Valid Non Admin Email
            await driver.sleep(3000)
  
            let passwordInput = await driver.findElement(By.id('passwordInput'));
            await passwordInput.click()
            await driver.sleep(1000)
            await passwordInput.sendKeys("NonAdmin12345$") //Valid Non Admin Password
            await driver.sleep(3000)
  
            let loginButton = await driver.findElement(By.id('LoginButton'));
            await loginButton.click()
            await driver.sleep(3000)

            let menuButtons = await driver.findElement(By.id('MenueB'));
            await menuButtons.click()
            await driver.sleep(1000)

            let logoutButton = await driver.findElement(By.id('logoutButton'));
            await logoutButton.click()
            await driver.sleep(3000)

          //Check That The Home Page Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert(endingURL.includes("http://localhost:3000/"), 'NavBar Test FAILED, Home Page Not Found')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)
})