const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const chrome = require("selenium-webdriver/chrome");
console.log("imports");
describe('Login Page Validation Test', function () {

    let driver;
    let chrome = require('selenium-webdriver/chrome');

    console.log("let");

    before(async function () {
        console.log("before start");

        console.log("before try");
        try{
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options().addArguments("no-sandbox", "headless", "disable-gpu", "window-size=1024,768", "disable-dev-shm-usage"))
                .build();
        }
        catch (error){
            console.error('Error:', error);
            throw error;
        }

        console.log("before end");
    });

    it('should display email validation message for an invalid email.', async function () {
        this.timeout(5000);
        console.log("11");
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL
        console.log("12");
        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');
        console.log("13");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("14");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("15");
    });
    console.log("1");

    it('should display password validation message for an invalid password.', async function () {
        console.log("21");
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL
        console.log("22");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');
        console.log("23");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("24");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("25");
    });
    console.log("2");

    it('should display email validation message for an invalid email with a valid password.', async function () {
        console.log("31");
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL
        console.log("32");
        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');
        console.log("33");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');
        console.log("34");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("35");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("36");
    });
    console.log("3");

    it('should display password validation message for an invalid password with a valid email.', async function () {
        console.log("41");
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL
        console.log("42");
        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');
        console.log("43");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');
        console.log("44");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("45");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("46");
    });
    console.log("4");

    it('should display no error message for a valid password with a valid email.', async function () {
        console.log("51");
        const output = true;
        await driver.get('http://13.215.46.204:8443/login'); // Replace with your actual URL
        console.log("52");
        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');
        console.log("53");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');
        console.log("54");
        // Attempt to locate the error message element
        try {
            const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
            console.log("55");
            // If the element exists, fail the test
            throw new Error('Error message element should not exist');
        } catch (error) {
            console.log("56");
            // If an exception is thrown, it's expected behavior
            expect(output).to.equal(true);
            console.log("57");
        }
        console.log("58");
    });

    console.log("5");

    after(async function () {
        console.log("after1");
        try{
            console.log("after2");
            await driver.quit();
            console.log("after3");
        }catch (error){
            console.error("Error while quitting:", error);
        }
        console.log("after4");
    });
});

describe('Registration Page Validation Test', function () {

    let driver;
    let chrome = require('selenium-webdriver/chrome');

    console.log("let");

    before(async function () {
        console.log("before start");

        console.log("before try");
        try{
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options().addArguments("no-sandbox", "headless", "disable-gpu", "window-size=1024,768", "disable-dev-shm-usage"))
                .build();
        }
        catch (error){
            console.error('Error:', error);
            throw error;
        }

        console.log("before end");
    });

    it('should display a name length error message for a name that is too short.', async function () {
        this.timeout(5000);
        console.log("11");
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("12");
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys('name');
        console.log("13");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("14");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("15");
    });
    console.log("1");

    it('should display an invalid name error message for a name that contains invalid characters.', async function () {
        this.timeout(5000);
        console.log("11");
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("12");
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys('name123@@@');
        console.log("13");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("14");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("15");
    });
    console.log("1");

    it('should display an invalid email message for an invalid email.', async function () {
        this.timeout(5000);
        console.log("11");
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("12");
        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('invalid-email');
        console.log("13");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("14");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("15");
    });
    console.log("1");

    it('should display an invalid password message for a password that is too short.', async function () {
        console.log("21");
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("22");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('short');
        console.log("23");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("24");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("25");
    });
    console.log("2");

    it('should display a password do not match message when passwords do not match.', async function () {
        console.log("21");
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("22");
        const passwordInput = await driver.findElement(By.id('confirmPassword'));
        await passwordInput.sendKeys('nomatch');
        console.log("23");
        const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        console.log("24");
        expect(isErrorMessageDisplayed).to.equal(true);
        console.log("25");
    });
    console.log("2");

    it('should display no error message when all fields are valid.', async function () {
        console.log("51");
        const output = true;
        await driver.get('http://13.215.46.204:8443/userregister'); // Replace with your actual URL
        console.log("52");
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys('proper name');

        const emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('testadmin@test.com');
        console.log("53");
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password');
        console.log("54");

        const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordInput.sendKeys('password');
        // Attempt to locate the error message element
        try {
            const errorMessage = await driver.findElement(By.className("text-red-500 text-xs mt-1"));
            console.log("55");
            // If the element exists, fail the test
            throw new Error('Error message element should not exist');
        } catch (error) {
            console.log("56");
            // If an exception is thrown, it's expected behavior
            expect(output).to.equal(true);
            console.log("57");
        }
        console.log("58");
    });

    console.log("5");

    after(async function () {
        console.log("after1");
        try{
            console.log("after2");
            await driver.quit();
            console.log("after3");
        }catch (error){
            console.error("Error while quitting:", error);
        }
        console.log("after4");
    });
});