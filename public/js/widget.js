(function () {
    'use strict';
    window.PayPal = window.PayPal || {};
    window.PayPal.initCustomPayPalApp = function (config) {
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
        Object.keys(defaultProps).forEach(function (attr) {
            iFrame.setAttribute(attr, defaultProps[attr]);
        });

        document.getElementById(config.parentId).appendChild(iFrame);

        window.addEventListener('message', function (e) {
            var postMessageKey = ['LOADED', 'ERROR', 'EXIT', 'COMPLETE'];
            var key = e.message ? 'message' : 'data';
            var data = e[key];
            if (data) {
                var checkValue = data.split('_',1);
                var checkValue1 = data.split('_',2);
                console.log('checkvalue',checkValue,checkValue1);
                var value = postMessageKey.indexOf(checkValue[1]) > -1 ? data : '';
            }
            switch (checkValue[1]) {
                case 'LOADED':
                    config.onLoad && config.onLoad(value);
                    break;
                case 'ERROR':
                    // code block
                    config.onError && config.onError(value);
                    break;
                case 'EXIT':
                    // code block
                    config.onExit && config.onExit(value);
                    break;
                case 'COMPLETE':
                    // code block
                    config.onComplete && config.onComplete(value);
                    break;
                default:
                // code block
            }


        }, false);


    };

})();

