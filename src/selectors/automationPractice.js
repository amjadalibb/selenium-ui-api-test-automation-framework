module.exports = {
    login: {
        loginBtn: 'login',
        email: 'email',
        password: 'passwd',
        submitLoginBtn: 'SubmitLogin'
    },
    home: {
        accountName: 'account',
        topMenu: 'block_top_menu',
        topMenuItem: '//div[@id=\'block_top_menu\']/ul/li/a[@title=\'{location}\']'
    },
    cart: {
        mainDiv: 'center_column',
        productItem: '//div[@class=\'product-image-container\']/a[@title=\'{name}\']',
        quickViewBlock: 'buy_block',
        addToCart: '#add_to_cart > button',
        quickViewFrame: 'fancybox-iframe',
    },
    continue: {
        mainDiv: 'layer_cart',
        continueShopping: '//div[@id=\'layer_cart\']/div[@class=\'clearfix\']/div/div[@class=\'button-container\']/span[@title=\'Continue shopping\']',
        proceedToCheckout: '//a[contains(@title,\'Proceed to checkout\')]',
        proceedToCheckoutSummary: '//span[text()=\'Proceed to checkout\']',
        processAddress: 'processAddress',
        acceptTerms: 'cgv',
        processCarrier: 'processCarrier',
        paymentCheque: 'cheque',
        confirmOrder: '//span[text()=\'I confirm my order\']'
    },
    contents: {
        alertSuccess: 'alert alert-success',
        boxOrderConfirmation: 'box order-confirmation'
    }
};