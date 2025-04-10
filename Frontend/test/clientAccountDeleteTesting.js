const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

// BEFORE STARTING TEST: Make sure to create a new account with the email being Delete@account.com with a password of Delete12345$
describe('Client Account Deletion Functionality', async function() {
  it('Entering Incorrect Password', async function() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://localhost:3000/');
      await driver.manage().window().maximize();
      await driver.navigate().refresh();

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
      await emailInput.sendKeys("Delete@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("Delete12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(5000)

      let deleteAccountButton = await driver.findElement(By.id('accountDelete'))
      await deleteAccountButton.click()
      await driver.sleep(5000)

      let deletePasswordInput = await driver.findElement(By.id('deletePasswordInput'))
      let confirmAccountDelete = await driver.findElement(By.id('confirmAccountDeleteButton'))
      await deletePasswordInput.click()
      await driver.sleep(500)
      await deletePasswordInput.sendKeys('ljlsdfijasid')
      await driver.sleep(500)
      await confirmAccountDelete.click()
      await driver.sleep(1000)

      let accountDeleteError = await driver.findElement(By.id('accountDeleteError')).getText();
      assert.strictEqual(accountDeleteError, 'Current password is incorrect.', 'Test FAILED, Did Not Catch Error')
    } finally {
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Empty Field', async function() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://localhost:3000/');
      await driver.manage().window().maximize();
      await driver.navigate().refresh();

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
      await emailInput.sendKeys("Delete@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("Delete12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let deleteAccountButton = await driver.findElement(By.id('accountDelete'))
      await deleteAccountButton.click()
      await driver.sleep(3000)

      let currentPasswordInput = await driver.findElement(By.id('deletePasswordInput'))
      let confirmAccountDelete = await driver.findElement(By.id('confirmAccountDeleteButton'))
      await currentPasswordInput.click()
      await driver.sleep(500)
      await currentPasswordInput.sendKeys('')
      await driver.sleep(500)
      await confirmAccountDelete.click()
      await driver.sleep(1000)

      let accountDeleteError = await driver.findElement(By.id('accountDeleteError')).getText();
      assert.strictEqual(accountDeleteError, 'Field is required.', 'Test FAILED, Did Not Catch Error')
    } finally {
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Correct Password', async function() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://localhost:3000/');
      await driver.manage().window().maximize();
      await driver.navigate().refresh();

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
      await emailInput.sendKeys("Delete@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("Delete12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let deleteAccountButton = await driver.findElement(By.id('accountDelete'))
      await deleteAccountButton.click()
      await driver.sleep(3000)

      let currentPasswordInput = await driver.findElement(By.id('deletePasswordInput'))
      let confirmAccountDelete = await driver.findElement(By.id('confirmAccountDeleteButton'))
      await currentPasswordInput.click()
      await driver.sleep(500)
      await currentPasswordInput.sendKeys('Delete12345$')
      await driver.sleep(500)
      await confirmAccountDelete.click()
      await driver.sleep(1000)

      let accountDeleteSuccessPopup = await driver.findElement(By.id('accountDeleteSuccessPopup')).getText();
      assert.strictEqual(accountDeleteSuccessPopup, 'Account Deleted Successfully!', 'Test FAILED, Error Caught')
    } finally {
      await driver.quit()
    }
  }).timeout(60000)

  it('Verifying If Account is Deleted', async function() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://localhost:3000/');
      await driver.manage().window().maximize();
      await driver.navigate().refresh();

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
      await emailInput.sendKeys("Delete@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("Delete12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(5000)

      let loginError = await driver.findElement(By.id('accountError')).getText();
      assert.strictEqual(loginError, '* Invalid Email or Password *', 'Test FAILED, Account is Still Active.')
    } finally {
      await driver.quit()
    }
  }).timeout(60000)
})