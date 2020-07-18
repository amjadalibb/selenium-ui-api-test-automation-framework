let Page = require('./basePage');
const faker = require('../utils/faker');


Page.prototype.login = async function() {
    let _signInBtn, _email, _password, _submitLogin, _accountInfo;

    _signInBtn = await this.findByClassName('login');
    _signInBtn.click();

    _email = await this.findById('email');
    await this.write(_email, process.env.EMAIL)
    _password = await this.findById('passwd');
    await this.write(_password, process.env.PASSWORD)

    _submitLogin = await this.findById('SubmitLogin')
    await _submitLogin.click();

    _accountInfo = await this.findByClassName('account');
    return await this.driver.wait(async function () {
        return await _accountInfo.getText();
    }, 5000);
};

Page.prototype.addProductToCart = async function(id) {
    let _addToCart = await this.findByXPath(`//a[contains(@data-id-product,'${id}') and contains(@title,'Add to cart')]`);
    await _addToCart.click();
};


Page.prototype.continueShopping = async function() {
    await this.waitForElemToVisibleById('layer_cart');
    let _continueShopping = await this.findByXPath(`//div[@id='layer_cart']/div[@class='clearfix']/div/div[@class='button-container']/span[@title='Continue shopping']`);
    await _continueShopping.click();
};

Page.prototype.proceedToCheckout = async function() {
    let _proceedCheckout, _proceedCheckoutSummary, _proceedAddress, _cgv, _processCarrier, _confirmOrder;
    await this.waitForElemToVisibleById('layer_cart');
    _proceedCheckout = await this.findByXPath('//a[contains(@title,\'Proceed to checkout\')]');
    _proceedCheckout.click();
    
    _proceedCheckoutSummary = await this.findByXPath(`//span[text()=\'Proceed to checkout\']`);
    _proceedCheckoutSummary.click();

    _proceedAddress = await this.findByName('processAddress');
    _proceedAddress.click();

    _cgv = await this.findById('cgv');
    _cgv.click();

    _processCarrier = await this.findByName('processCarrier');
    _processCarrier.click();

    _cheque = await this.findByClassName('cheque');
    _cheque.click();

    _confirmOrder = await this.findByXPath(`//span[text()=\'I confirm my order\']`);
    _confirmOrder.click();
};

Page.prototype.getAlertSuccessMessage = async function() {
    let _alertSuccessMessage = await this.findByClassName('alert alert-success');
    return await this.driver.wait(async function () {
        return await _alertSuccessMessage.getText();
    }, 5000);
};

Page.prototype.orderConfirmation = async function() {
    let _orderConfirmation = await this.findByClassName('box order-confirmation');
    return await this.driver.wait(async function () {
        return await _orderConfirmation.getText();
    }, 5000);
};

module.exports = Page;