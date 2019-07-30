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

    var postMessageKey = ['LOADED','ERROR','EXIT', 'COMPLETE'];
    document.getElementById(config.parentId).appendChild(iFrame);

        window.addEventListener('message',function(e) {
            var key = e.message ? 'message' : 'data';
            var data =  e[key];
            console.log('data:',data);
            //var value = postMessageKey.indexOf(data) > -1 ? data : '';
            if(data){
                var checkValue =  data.split('_');
                console.log('array',checkValue[0],checkValue[1]);
                var value = postMessageKey.indexOf(checkValue[1]) > -1 ? data : '';
                console.log('value:',value);
            }
            console.log('value:',value);
            switch(checkValue[1]) {
                case 'LOADED':
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

