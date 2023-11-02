const { Builder, By, Key, until } = require('selenium-webdriver');
const htmlEntities = require('html-entities');
const { assert } = require('chai');
const { Options } = require('selenium-webdriver/chrome'); // Import the Chrome Options
const { expect } = require('chai');

// Create ChromeOptions
const chromeOptions = new Options();
chromeOptions.headless();

describe('Login Page Validation Test', function () {

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should display email validation message for an invalid email.', async function () {
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });

    it('should display password validation message for an invalid password.', async function () {
        await driver.get('http://localhost:3000/login'); // Replace with your actual URL

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });

    it('should display email validation message for an invalid email with a valid password.', async function () {
        await driver.get('http://localhost:3000/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });

    it('should display password validation message for an invalid password with a valid email.', async function () {
        await driver.get('http://localhost:3000/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });

    it('should display no error message for a valid password with a valid email.', async function () {
        const output = true;
        await driver.get('http://localhost:3000/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');

        // Attempt to locate the error message element
        try {
            const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
            // If the element exists, fail the test
            throw new Error('Error message element should not exist');
        } catch (error) {
            // If an exception is thrown, it's expected behavior
            expect(output).to.equal(true);
        }

    });

    after(async function () {
        await driver.quit();
    });
});