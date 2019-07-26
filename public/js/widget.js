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
    document.getElementById(config.parentId).appendChild(iFrame);


        window.addEventListener('message',function(e) {
            var key = e.message ? 'message' : 'data';
            var data = e[key];

            switch(data) {
                case 'LOADED':
                    // code block
                    //console.log('data',data);
                    //return config.onLoad(data);
                    onWidgetLoad(data);
                    break;
                case 'ERROR':
                    // code block
                    onServerError(data);
                    break;
                case 'EXIT':
                    // code block
                    onUserExit(data);
                    break;
                case 'COMPLETE':
                    // code block
                    onUserComplete(data);
                    break;
                default:
                // code block
            }


        },false);


        const onWidgetLoad = function(data){
            if(typeof config.onLoad === 'function'){
                return config.onLoad(data)
            }

        };
       const onServerError = function(data){
            if(typeof config.onError === 'function'){
                return config.onError(data)
            }
        };
        const onUserExit = function(data){
            if(typeof config.onExit === 'function'){
                return config.onExit(data)
            }
        };
       const onUserComplete = function(data){
            if(typeof config.onComplete === 'function'){
                return config.onComplete(data)
            }
        };
    };

})();

