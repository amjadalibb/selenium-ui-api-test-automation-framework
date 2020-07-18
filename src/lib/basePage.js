require('chromedriver');
const {Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let chromeOptions = new chrome.Options();
// chromeOptions.addArguments('start-fullscreen');
chromeOptions.addArguments('disable-infobars');
// o.addArguments('headless');
chromeOptions.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(chromeOptions)
        .forBrowser('chrome')
        .build();     

    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };
    
    this.title = async function() {
        return await this.driver.getTitle();
    };

    this.quit = async function() {
        return await this.driver.quit();
    };

    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, `Looking for element by id ${id}`);
        return await this.driver.findElement(By.id(id));
    };

    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, `Looking for element by name ${name}`);
        return await this.driver.findElement(By.name(name));
    };

    this.findByClassName = async function(className) {
        await this.driver.wait(until.elementLocated(By.className(className)), 15000, `Looking for element by classname ${className}`);
        return await this.driver.findElement(By.className(className));
    };

    this.findByXPath = async function(xpath) {
        await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, `Looking for element by xpath ${xpath}`);
        return await this.driver.findElement(By.xpath(xpath));
    };

    this.findElemsByXPath = async function(xpath) {
        await this.driver.wait(until.elementsLocated(By.xpath(xpath)), 15000, `Looking for element by xpath ${xpath}`);
        return await this.driver.findElements(By.xpath(xpath));
    };

    this.moveToElem = async function(elem) {
        await this.driver.actions().mouseMove(elem).mouseUp().mouseDown().perform();
        this.driver.sleep(1000);
    };

    this.scrollToElem = async function(elem) {
        await this.driver.executeScript("arguments[0].scrollIntoView()", elem);
        this.driver.sleep(1000);
    };

    this.waitForElemToVisibleById = async function(id) {
        const _elem = this.driver.findElement(By.id(id));
        return await this.driver.wait(until.elementIsVisible(_elem), 15000, `Looking for element by id ${id}`);
    }

    this.waitForElemToVisibleByXPath = async function(xpath) {
        const _elem = this.driver.findElement(By.xpath(xpath));
        return await this.driver.wait(until.elementIsVisible(_elem), 15000, `Looking for element by xpath ${xpath}`);
    }
    
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};

module.exports = Page;