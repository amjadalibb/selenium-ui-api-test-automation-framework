require('chromedriver');
var reporter = require('cucumber-html-reporter');

const {Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

var Page = function() {
    let chromeOptions = new chrome.Options();
    if(process.env.VIEWPORT) {
        let _dim = process.env.VIEWPORT.split('x');
        chromeOptions.addArguments(`window-size=${_dim[0]},${_dim[1]}`);
    } else 
        chromeOptions.addArguments('start-fullscreen');
    if(process.env.HEADLESS && process.env.HEADLESS == 'true')
        chromeOptions.addArguments('headless');
    this.driver = new Builder()
        .setChromeOptions(chromeOptions)
        .forBrowser('chrome')
        .build();
    var reporterOptions = {
        name: 'WooliesX Tech Challenge',
        theme: 'hierarchy',
        jsonFile: './test/report/cucumber_report.json',
        output: './test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        storeScreenshots: false,
        metadata: {
            "Base URL": process.env.BASE_URL,
            "View Port": process.env.VIEWPORT,
            "Browser": "Chrome ^84.0.0",
            "Platform": "Windows 10",
            "Headless": process.env.HEADLESS,
            "Email": process.env.EMAIL
        }
    };
    reporter.generate(reporterOptions);

    this.generateReport = async function() {
        reporterOptions.launchReport = true;
        reporterOptions.storeScreenshots = true;
        await reporter.generate(reporterOptions);
    };

    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };
    
    this.windowWidth = async function() {
        return await this.driver.executeScript('return window.innerWidth;');
    }

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

    this.findByCssSelector = async function(cssSelector) {
        const _elem = await this.driver.findElement(By.css(cssSelector));
        await this.driver.wait(until.elementIsEnabled(_elem), 15000, `Looking for element by id ${cssSelector}`);
        return await this.driver.findElement(By.css(cssSelector));
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

    this.waitForElemToVisibleById = async function(id) {
        const _elem = await this.driver.findElement(By.id(id));
        return await this.driver.wait(until.elementIsVisible(_elem), 15000, `Looking for element by id ${id}`);
    }
    
    this.waitForElemToVisibleByClassName= async function(className) {
        const _elem = await this.driver.findElement(By.className(className));
        return await this.driver.wait(until.elementIsVisible(_elem), 15000, `Looking for element by classname ${className}`);
    }

    this.switchToFrame = async function(iframe) {
        await this.driver.switchTo().frame(iframe);
    }

    this.switchToDefault = async function() {
        await this.driver.switchTo().defaultContent();
    }

    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};

module.exports = Page;