const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

// BEFORE STARTING TEST: Make sure password for NewNon-Admin@account.com is NonAdmin12345$
describe('Client Change Password Functionality', async function() {
  it('Entering Correct Current Password and Match New Password', async function() {
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

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('NonAdmin12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordSuccessPopup = await driver.findElement(By.id('passwordChangeSuccessPopup')).getText();
      assert.strictEqual(passwordSuccessPopup, 'Password Has Been Changed Successfully!', 'Test FAILED, Error Caught');

    } finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Invalid Current Password and Match New Password', async function() {
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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('NonAdmin12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('$TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('$TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'Current Password is Incorrect.', 'Test FAILED, Error Not Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Valid Current Password and NOT Match New Password', async function() {
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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('NonAdmin12345$')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('NonAdmin1234$')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'New Passwords Do Not Match.', 'Test FAILED, Error Not Caught');

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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'All Fields Are Required.', 'Test FAILED, Error Not Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Same Current Password and Same New Password', async function() {
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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'This Password is Already Your Current.', 'Test FAILED, Error Not Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Current Password and No Special Characters to New Password', async function() {
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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('TempPassword12345')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('TempPassword12345')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'Your Password Must Contain At Least 1 Special Character (!#$%^&*)', 'Test FAILED, Error Not Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)

  it('Entering Current Password and Less Than 8 Characters', async function() {
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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('Temp')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('Temp')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordError = await driver.findElement(By.id('passwordError')).getText();
      assert.strictEqual(passwordError, 'Your Password Must Be At Least 8 Characters', 'Test FAILED, Error Not Caught');

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
      await passwordInput.sendKeys("TempPassword12345$")
      await driver.sleep(1000)

      let loginButton = await driver.findElement(By.id('LoginButton'));
      await loginButton.click()
      await driver.sleep(3000)

      await driver.get('http://localhost:3000/clientDashboard')
      await driver.sleep(3000) 
      let clientSettingsButton = await driver.findElement(By.id('clientSettingsButton'))
      await clientSettingsButton.click()
      await driver.sleep(3000)

      let changePasswordButton = await driver.findElement(By.id('changePassword'))
      await changePasswordButton.click()
      await driver.sleep(3000)

      let currentPassword = await driver.findElement(By.id('currentPassword'))
      let newPassword = await driver.findElement(By.id('newPassword'))
      let confirmNewPassword = await driver.findElement(By.id('confirmNewPassword'))
      let confirmNewPasswordButton = await driver.findElement(By.id('confirmPasswordChangeButton'))
      await currentPassword.click()
      await driver.sleep(500)
      await currentPassword.sendKeys('TempPassword12345$')
      await driver.sleep(500)
      await newPassword.click()
      await driver.sleep(500)
      await newPassword.sendKeys('NonAdmin12345$')
      await driver.sleep(500)
      await confirmNewPassword.click()
      await driver.sleep(500)
      await confirmNewPassword.sendKeys('NonAdmin12345$')
      await driver.sleep(500)
      await confirmNewPasswordButton.click()
      await driver.sleep(1000)

      let passwordSuccessPopup = await driver.findElement(By.id('passwordChangeSuccessPopup')).getText();
      assert.strictEqual(passwordSuccessPopup, 'Password Has Been Changed Successfully!', 'Test FAILED, Error Caught');

    }finally{
      await driver.quit()
    }
  }).timeout(60000)
})