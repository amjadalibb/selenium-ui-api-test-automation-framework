require('dotenv').config();
const path = require("path");
const { expect } = require("chai");

const { Given, When, Then, BeforeAll, Before, After, AfterAll, setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

const Page = require('../lib/automationPractice');
const { pageMenu } = require('../fixtures/endpoints');

let driver, page;

BeforeAll(async function () {
  page = new Page();
  driver = page.driver;
});

AfterAll(async function () {
  await page.generateReport();
  await driver.quit();
});

Before(async function () {
  await driver.manage().deleteAllCookies();
})

After(async function () {
  let screenshot = await driver.takeScreenshot();
  this.attach(screenshot, 'image/png');
});

Given('I have opened website', async function () {
  await page.visit(process.env.BASE_URL);
  expect(await page.title()).to.equal('My Store');
});

When('I login account', async function () {
  const account = await page.login();
  expect(account).to.equal('Amjad Ali');
});

When("I navigate to section {string}", async function (location) {
  await page.navigateTo(location);
});

When('I continue shopping', async function () {
  await page.continueShopping();
});

When('I add {string} to cart', async function (dressName) {
  await page.addProductToCart(dressName);
});

When('I add two items in cart', async function () {
  await page.visit(path.join(process.env.BASE_URL, pageMenu.women.main));
  await page.addProductToCart(1);
  await page.continueShopping();
  await page.addProductToCart(2);
});

When('I proceed to checkout', async function () {
  await page.proceedToCheckout();
});

Then('I validate order', async function () {
  const alertSuccessMessage = await page.getAlertSuccessMessage();
  expect(alertSuccessMessage).to.equal('Your order on My Store is complete.');
  const orderConfirmation = await page.orderConfirmation();
  expect(orderConfirmation).to.contain('YOUR CHECK MUST INCLUDE');
  expect(orderConfirmation).to.contain('Payment amount.');
  expect(orderConfirmation).to.contain('Payable to the order of pradeep');
  expect(orderConfirmation).to.contain('Mail to xyz');
  expect(orderConfirmation).to.contain('Do not forget to include your order reference');
  expect(orderConfirmation).to.contain('An email has been sent to you with this information.');
  expect(orderConfirmation).to.contain('Your order will be sent as soon as we receive your payment.');
  expect(orderConfirmation).to.contain('If you have questions, comments or concerns, please contact our customer service department.');
});