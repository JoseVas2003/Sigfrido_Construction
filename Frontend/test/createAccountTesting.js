const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');

// ----------------------------------------------- FIRST NAME TESTING ---------------------------------------------------------------

describe('Create Account Functionality', async function () 
{
    it('Navigating To Create Account Page And Entering An INVALID First Name - Contains Numbers', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John1") //Invalid First Name Format
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid First Name Field, If So, Test PASSED.  Else, Test FAILED
          let firstNameError = await driver.findElement(By.id('firstNameError')).getText();
          assert.strictEqual(firstNameError, 'First Name Can Only Contain Letters', 'Test FAILED, Did Not Catch Create Account First Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID First Name - More Than 20 Characters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("JohnJohnJohnJohnJohnJohn") //Invalid First Name - More Than 20 Characters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid First Name Field, If So, Test PASSED.  Else, Test FAILED
          let firstNameError = await driver.findElement(By.id('firstNameError')).getText();
          assert.strictEqual(firstNameError, 'Please Enter 20 Characters or Less', 'Test FAILED, Did Not Catch Create Account First Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID First Name - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("") //Invalid First Name Format - Empty Field
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid First Name Field, If So, Test PASSED.  Else, Test FAILED
          let firstNameError = await driver.findElement(By.id('firstNameError')).getText();
          assert.strictEqual(firstNameError, 'Please Enter Your First Name', 'Test FAILED, Did Not Catch Create Account First Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- LAST NAME TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An INVALID Last Name - Contains Numbers', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe1") //Invalid Last Name Format - Contains Numbers
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Last Name Field, If So, Test PASSED.  Else, Test FAILED
          let lastNameError = await driver.findElement(By.id('lastNameError')).getText();
          assert.strictEqual(lastNameError, 'Last Name Can Only Contain Letters', 'Test FAILED, Did Not Catch Create Account Last Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Last Name - More Than 20 Characters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("DoeDoeDoeDoeDoeDoeDoe") //Invalid Last Name Format - More Than 20 Characters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Last Name Field, If So, Test PASSED.  Else, Test FAILED
          let lastNameError = await driver.findElement(By.id('lastNameError')).getText();
          assert.strictEqual(lastNameError, 'Please Enter 20 Characters or Less', 'Test FAILED, Did Not Catch Create Account Last Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Last Name - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("") //Invalid Last Name Format - Empty Field
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid First Name Field, If So, Test PASSED.  Else, Test FAILED
          let lastNameError = await driver.findElement(By.id('lastNameError')).getText();
          assert.strictEqual(lastNameError, 'Please Enter Your Last Name', 'Test FAILED, Did Not Catch Create Account First Name Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- PHONE NUMBER TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An INVALID Phone Number - Contains Letters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234AB") //Invalid Phone Number Format - Contains Letters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Phone Number Field, If So, Test PASSED.  Else, Test FAILED
          let phoneNumberError = await driver.findElement(By.id('phoneNumberError')).getText();
          assert.strictEqual(phoneNumberError, 'Your Phone Number Must Only Contain Numbers', 'Test FAILED, Did Not Catch Create Account Phone Number Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Phone Number - Is Not 10 Characters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("123456789") //Invalid Phone Number Format - Not 10 Characters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Phone Number Field, If So, Test PASSED.  Else, Test FAILED
          let phoneNumberError = await driver.findElement(By.id('phoneNumberError')).getText();
          assert.strictEqual(phoneNumberError, 'Your Phone Number Must Be 10 Characters', 'Test FAILED, Did Not Catch Create Account Phone Number Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Phone Number - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("") //Invalid Phone Number Format - Empty Field
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Phone Number Field, If So, Test PASSED.  Else, Test FAILED
          let phoneNumberError = await driver.findElement(By.id('phoneNumberError')).getText();
          assert.strictEqual(phoneNumberError, 'Please Enter Your Phone Number', 'Test FAILED, Did Not Catch Create Account Phone Number Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- EMAIL TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An INVALID Email - Input Is Not The Correct Format', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@") //Invalid Email Format
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Email Field, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, 'Please Enter A Valid Email', 'Test FAILED, Did Not Catch Create Account Phone Email Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Email- Does Not Contain an "@" ', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe") //Invalid Email Format - Does Not Contain An '@'
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Email Field, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, "Your Email Must Contain an '@' Symbol", 'Test FAILED, Did Not Catch Create Account Email Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Email - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("") //Invalid Email Format - Empty Field
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Email Field, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, "Please Enter Your Email", 'Test FAILED, Did Not Catch Create Account Email Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Email - User Already Exists', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("Non-Admin@account.com") //Invalid Email - User Already Exists
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Email Field, If So, Test PASSED.  Else, Test FAILED
          let emailError = await driver.findElement(By.id('emailError')).getText();
          assert.strictEqual(emailError, "Your Email Is Already Associated With An Account, Please Enter a New Email", 'Test FAILED, Did Not Catch Create Account Email Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- PASSWORD TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An INVALID Password - Less Than 8 Characters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("pass") //Invalid Password - Less Than 8 Chacracters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let passwordError = await driver.findElement(By.id('passwordError')).getText();
          assert.strictEqual(passwordError, "Your Password Must Be At Least 8 Characters", 'Test FAILED, Did Not Catch Create Account Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Password - Greater Than 20 Characters', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("passpasspasspasspasspass") //Invalid Password - Greater Than 20 Chacracters
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let passwordError = await driver.findElement(By.id('passwordError')).getText();
          assert.strictEqual(passwordError, "Your Password Must Be Less Than 20 Characters", 'Test FAILED, Did Not Catch Create Account Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Password - Does Not Contain A Capital Letter', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("password1$") //Invalid Password - Doesn't Contain A Capital Letter
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let passwordError = await driver.findElement(By.id('passwordError')).getText();
          assert.strictEqual(passwordError, "Your Password Must Contain At Least 1 Capital Letter", 'Test FAILED, Did Not Catch Create Account Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Password - Does Not Contain A Special Character', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("Password1") //Invalid Password - Doesn't Contain A Special Character
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let passwordError = await driver.findElement(By.id('passwordError')).getText();
          assert.strictEqual(passwordError, "Your Password Must Contain At Least 1 Special Character", 'Test FAILED, Did Not Catch Create Account Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Password - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("") //Invalid Password - Field Is Empty
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let passwordError = await driver.findElement(By.id('passwordError')).getText();
          assert.strictEqual(passwordError, "Please Enter Your Password", 'Test FAILED, Did Not Catch Create Account Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- CONFIRM PASSWORD TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An INVALID Confirm Password - Input Is Empty', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("Password123$") //Valid Password
          await driver.sleep(1000)

          let confirmPasswordInput = await driver.findElement(By.id('confirmPasswordInput'));
          await confirmPasswordInput.click()
          await driver.sleep(1000)
          await confirmPasswordInput.sendKeys("") //Invalid Confirm Password - Field Empty
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let confirmPasswordError = await driver.findElement(By.id('confirmPasswordError')).getText();
          assert.strictEqual(confirmPasswordError, "Please Confirm Your Password", 'Test FAILED, Did Not Catch Create Account Confirm Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    it('Navigating To Create Account Page And Entering An INVALID Confirm Password - Passwords Dont Match', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("Password123$") //Valid Password
          await driver.sleep(1000)

          let confirmPasswordInput = await driver.findElement(By.id('confirmPasswordInput'));
          await confirmPasswordInput.click()
          await driver.sleep(1000)
          await confirmPasswordInput.sendKeys("Password123") //Invalid Confirm Password - Passwords Dont Match
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That ERROR Message Displayed in Create Account Page For Invalid Passowrd Field, If So, Test PASSED.  Else, Test FAILED
          let confirmPasswordError = await driver.findElement(By.id('confirmPasswordError')).getText();
          assert.strictEqual(confirmPasswordError, "Your Passwords Don't Match", 'Test FAILED, Did Not Catch Create Account Confirm Password Error')
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)

    // ----------------------------------------------- VALID USER TESTING ---------------------------------------------------------------

    it('Navigating To Create Account Page And Entering An CORRECT Input Fields', async function () {
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

          let createAccountMenuButton = await driver.findElement(By.id('createAccountMenuButton'));
          await createAccountMenuButton.click();
          await driver.sleep(2000)

          let firstNameInput = await driver.findElement(By.id('firstNameInput'));
          await firstNameInput.click()
          await driver.sleep(1000)
          await firstNameInput.sendKeys("John") //Valid First Name
          await driver.sleep(1000)

          let lastNameInput = await driver.findElement(By.id('lastNameInput'));
          await lastNameInput.click()
          await driver.sleep(1000)
          await lastNameInput.sendKeys("Doe") //Valid Last Name
          await driver.sleep(1000)

          let phoneNumberInput = await driver.findElement(By.id('phoneNumberInput'));
          await phoneNumberInput.click()
          await driver.sleep(1000)
          await phoneNumberInput.sendKeys("1234567890") //Valid Phone Number
          await driver.sleep(1000)

          let createAcountEmailInput = await driver.findElement(By.id('createAcountEmailInput'));
          await createAcountEmailInput.click()
          await driver.sleep(1000)
          await createAcountEmailInput.sendKeys("JohnDoe@example.com") //Valid Email
          await driver.sleep(1000)

          let createAccountPasswordInput = await driver.findElement(By.id('createAccountPasswordInput'));
          await createAccountPasswordInput.click()
          await driver.sleep(1000)
          await createAccountPasswordInput.sendKeys("Password123$") //Valid Password
          await driver.sleep(1000)

          let confirmPasswordInput = await driver.findElement(By.id('confirmPasswordInput'));
          await confirmPasswordInput.click()
          await driver.sleep(1000)
          await confirmPasswordInput.sendKeys("Password123$") //Valid Confirm Password
          await driver.sleep(1000)

          let createAccountButton = await driver.findElement(By.id('createAccountButton'));
          await createAccountButton.click()
          await driver.sleep(2000)

          //Check That The Create Account Is The Current Ending Page, If So, Test PASSED.  Else, Test FAILED
          let endingURL = await driver.getCurrentUrl()
          assert.strictEqual(endingURL, "http://localhost:3000/createAccount", 'Create Account Testing FAILED, Left Create Account Page')

          //Check That SUCCESS Message Displayed in Create Account Page, If So, Test PASSED.  Else, Test FAILED
          let successPopup = await driver.findElement(By.id('successPopup'));
          let successDisplayed = await successPopup.isDisplayed();
          assert.strictEqual(successDisplayed, true, 'Create Account Testing FAILED, Popup Was Not Displayed');
          
        } finally {
          await driver.quit()
        }
        
    }).timeout(60000)
})
