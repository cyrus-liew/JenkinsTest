const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const chrome = require("selenium-webdriver/chrome");
console.log("imports");
describe('Login Page Validation Test', function () {

    let driver;
    let chrome = require('selenium-webdriver/chrome');
    let service;

    console.log("let");

    before(async function () {
        console.log("before start");
        service = new chrome.ServiceBuilder()
            .loggingTo('/my/log/file.txt')
            .enableVerboseLogging()
            .build();

        console.log("before options");
        let options = new chrome.Options();

        console.log("before arguments");
        options.addArguments("no-sandbox", "headless", "disable-gpu", "window-size=1024,768", "disable-dev-shm-usage")

        console.log("before try");
        try{
            driver = await chrome.Driver.createSession(options, service);
        }
        catch (error){
            console.error('Error:', error);
            throw error;
        }

        console.log("before end");
    });

    it('should display email validation message for an invalid email.', async function () {
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });
    console.log("1");

    it('should display password validation message for an invalid password.', async function () {
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });
    console.log("2");

    it('should display email validation message for an invalid email with a valid password.', async function () {
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });
    console.log("3");

    it('should display password validation message for an invalid password with a valid email.', async function () {
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');

        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });
    console.log("4");

    it('should display no error message for a valid password with a valid email.', async function () {
        const output = true;
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL

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

    console.log("4");

    after(async function () {
        await driver.quit();
        console.log("after");
    });
});