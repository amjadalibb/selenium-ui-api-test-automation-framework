let Page = require('./basePage');
const selectors = require('../selectors/automationPractice');

Page.prototype.login = async function() {
    let _signInBtn, _email, _password, _submitLogin, _accountInfo;

    _signInBtn = await this.findByClassName(selectors.login.loginBtn);
    _signInBtn.click();

    _email = await this.findById(selectors.login.email);
    await this.write(_email, process.env.EMAIL)
    _password = await this.findById(selectors.login.password);
    await this.write(_password, process.env.PASSWORD)

    _submitLogin = await this.findById(selectors.login.submitLoginBtn)
    await _submitLogin.click();

    _accountInfo = await this.findByClassName(selectors.home.accountName);
    return await this.driver.wait(async function () {
        return await _accountInfo.getText();
    }, 5000);
};

Page.prototype.navigateTo = async function(location) {
    await this.waitForElemToVisibleById(selectors.home.topMenu);
    let _elem = await this.findByXPath(selectors.home.topMenuItem.replace('{location}',location));
    await _elem.click();
};

Page.prototype.addProductToCart = async function(name) {
    await this.waitForElemToVisibleById(selectors.cart.mainDiv);
    let _product = await this.findByXPath(selectors.cart.productItem.replace('{name}',name));
    await _product.click();
    const _windowWidth = await this.windowWidth();
    if( parseInt(_windowWidth, 10) < 1200 ) {
        await this.waitForElemToVisibleById(selectors.cart.quickViewBlock);
        let _addToCart = await this.findByCssSelector(selectors.cart.addToCart);
        await _addToCart.click();
    } else {
        await this.waitForElemToVisibleByClassName(selectors.cart.quickViewFrame);
        let _elemFrame = await this.findByClassName(selectors.cart.quickViewFrame);
        await this.switchToFrame(_elemFrame)
        let _addToCart = await this.findByCssSelector(selectors.cart.addToCart);
        await _addToCart.click();
        await this.switchToDefault()
    }
};

Page.prototype.continueShopping = async function() {
    await this.waitForElemToVisibleById(selectors.continue.mainDiv);
    let _continueShopping = await this.findByXPath(selectors.continue.continueShopping);
    await _continueShopping.click();
};

Page.prototype.proceedToCheckout = async function() {
    let _proceedCheckout, _proceedCheckoutSummary, _proceedAddress, _cgv, _processCarrier, _confirmOrder;
    await this.waitForElemToVisibleById(selectors.continue.mainDiv);
    _proceedCheckout = await this.findByXPath(selectors.continue.proceedToCheckout);
    _proceedCheckout.click();
    
    _proceedCheckoutSummary = await this.findByXPath(selectors.continue.proceedToCheckoutSummary);
    _proceedCheckoutSummary.click();

    _proceedAddress = await this.findByName(selectors.continue.processAddress);
    _proceedAddress.click();

    _cgv = await this.findById(selectors.continue.acceptTerms);
    _cgv.click();

    _processCarrier = await this.findByName(selectors.continue.processCarrier);
    _processCarrier.click();

    _cheque = await this.findByClassName(selectors.continue.paymentCheque);
    _cheque.click();

    _confirmOrder = await this.findByXPath(selectors.continue.confirmOrder);
    _confirmOrder.click();
};

Page.prototype.getAlertSuccessMessage = async function() {
    let _alertSuccessMessage = await this.findByClassName(selectors.contents.alertSuccess);
    return await this.driver.wait(async function () {
        return await _alertSuccessMessage.getText();
    }, 5000);
};

Page.prototype.orderConfirmation = async function() {
    let _orderConfirmation = await this.findByClassName(selectors.contents.boxOrderConfirmation);
    return await this.driver.wait(async function () {
        return await _orderConfirmation.getText();
    }, 5000);
};

module.exports = Page;