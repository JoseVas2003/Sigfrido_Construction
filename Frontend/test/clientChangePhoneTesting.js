const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

// BEFORE STARTING TEST: Make sure phone number for NewNon-Admin@account.com is 1234567890
describe('Client Change Phone Functionality', async function() {
  it('Entering Correct Current Phone Number and Match New Phone Number', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('1234567890')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(1000)

      let phoneSuccessPopup = await driver.findElement(By.id('phoneChangeSuccessPopup')).getText();
      await driver.sleep(3000)
      await driver.navigate().refresh();
      await driver.sleep(3000)
      assert.strictEqual(phoneSuccessPopup, 'Phone Number Has Been Changed Successfully!', 'Test FAILED, Error Caught');

    } finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Invalid Current Phone Number and Match New Phone Number', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('1293847098')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('1234567890')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('1234567890')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'Current phone number is incorrect.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Valid Current Phone Number and NOT Match New Phone Number', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('1283947279')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('4597698476')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'New phone number does not match.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Empty Fields', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'All fields are required.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Same Current Phone Number and Same New Phone Number', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'This phone number is already your current.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Current Phone Number and Special Characters to New Phone Number', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('das^*&@#')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('das^*&@#')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'Phone numbers can only contain digits.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Current Phone Number and Less Than 10 Digits', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('123456789')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('123456789')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneError = await driver.findElement(By.id('phoneError')).getText();
      assert.strictEqual(phoneError, 'Phone number must be exactly 10 digits.', 'Test FAILED, Did Not Catch Error')

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Switching Number Back To Default', async function() {
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
      await emailInput.sendKeys("NewNon-Admin@account.com")
      await driver.sleep(1000)

      let passwordInput = await driver.findElement(By.id('passwordInput'));
      await passwordInput.click()
      await driver.sleep(1000)
      await passwordInput.sendKeys("NonAdmin12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePhoneNumberButton = await driver.findElement(By.id('phoneChange'))
      await changePhoneNumberButton.click()
      await driver.sleep(3000)

      let oldPhoneInput = await driver.findElement(By.id('oldPhoneInput'))
      let newPhoneInput = await driver.findElement(By.id('newPhoneInput'))
      let confirmNewPhoneInput = await driver.findElement(By.id('confirmNewPhoneInput'))
      let confirmNewPhoneButton = await driver.findElement(By.id('confirmNewPhoneButton'))
      await oldPhoneInput.click()
      await driver.sleep(500)
      await oldPhoneInput.sendKeys('9876543210')
      await driver.sleep(500)
      await newPhoneInput.click()
      await driver.sleep(500)
      await newPhoneInput.sendKeys('1234567890')
      await driver.sleep(500)
      await confirmNewPhoneInput.click()
      await driver.sleep(500)
      await confirmNewPhoneInput.sendKeys('1234567890')
      await driver.sleep(500)
      await confirmNewPhoneButton.click()
      await driver.sleep(2000)

      let phoneSuccessPopup = await driver.findElement(By.id('phoneChangeSuccessPopup')).getText();
      await driver.sleep(2000)
      await driver.navigate().refresh();
      await driver.sleep(3000)
      assert.strictEqual(phoneSuccessPopup, 'Phone Number Has Been Changed Successfully!', 'Test FAILED, Error Not Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)
})