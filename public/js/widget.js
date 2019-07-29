(function() {
    'use strict';
    window.PayPal = window.PayPal || {};
    window.PayPal.initCustomPayPalApp = function(config) {
    var iFrame = document.createElement('iframe');
    var src = config.src;
    var defaultProps = {
        height: config.height || 700,
        style: 'width: 355px;',
        name: 'injectedCustomPayPalApp',
        frameborder: 0,
        scrolling: 'no',
        sandbox:
            'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation',
    };
    var queryParams = '?';
    for (var param in config) {
        queryParams =
            queryParams + param + '=' + encodeURIComponent(config[param]) + '&';
    }
    defaultProps.src = src + queryParams;
    Object.keys(defaultProps).forEach(function(attr) {
        iFrame.setAttribute(attr, defaultProps[attr]);
    });

    var postMessageKey = ['signUpFlow_LOADED','payments_LOADED'];
    document.getElementById(config.parentId).appendChild(iFrame);

        window.addEventListener('message',function(e) {
            var key = e.message ? 'message' : 'data';
            var data =  e[key];

            var value = postMessageKey.indexOf(data) > -1 ? data : ''

            switch(data) {
                case value:
                    config.onLoad && config.onLoad(data);
                    break;
                case 'ERROR':
                    // code block
                    config.onError && config.onError(data);
                    break;
                case 'EXIT':
                    // code block
                    config.onExit && config.onExit(data);
                    break;
                case 'COMPLETE':
                    // code block
                    config.onComplete && config.onComplete(data);
                    break;
                default:
                // code block
            }


        },false);


    };

})();

