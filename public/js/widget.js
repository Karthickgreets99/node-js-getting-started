(function() {
    'use strict';
    window.PayPal = window.PayPal || {};
    window.PayPal.initCustomPayPalApp = function(config) {


        window.addEventListener('message',function(e) {
            var key = e.message ? 'message' : 'data';
            var data = e[key];

            switch(data) {
                case 'LOADED':
                    // code block
                    console.log('data',data);

                    break;
                case 'ERROR':
                    // code block
                    break;
                case 'EXIT':
                    // code block
                    break;
                case 'COMPLETE':
                    // code block
                    break;
                default:
                // code block
            }


        },false);

        setInterval(function() {
            if (window.addEventListener) {
                window.addEventListener("message", listenMessage, false);
            } else {
                window.attachEvent("onmessage", listenMessage);
            }
        },1000);

        const onPostMessageHandler = function(event) {
            let postMessage = (event && event.data) || {};
            if (!postMessage && !postMessage.data) {
                console.log('noMessage');
                return;
            }
            console.log('postMessage',postMessage);
            if(typeof config.onLoad === 'function'){
            console.log('inside function');
                return  listenMessage;


                // var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                // var eventer = window[eventMethod];
                // var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "LOADED";
                //
                // eventer(messageEvent,function(e) {
                //     console.log('parent received message!:  ',e.data);
                // },false);
                // config.onLoad();
            }
            // if(typeof config.onServerError === 'function'){
            //     return this.hasServerError = true;
            // }
            // if(typeof config.onUserExit === 'function') {
            //     return this.hasUserExit = true;
            // }
            // if(typeof config.onComplete === 'function'){
            //     return this.hasUserComplete = true;
            // }
        };
        window.addEventListener('message', onPostMessageHandler);
        // setInterval(function() {
        //     // Send the message "Hello" to the parent window
        //     // ...if the domain is still "davidwalsh.name"
        //     parent.postMessage(onPostMessageHandler, window.location);
        // },1000);






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
    };

    function listenMessage(msg) {
        return msg.data;
    }

})();





// (function() {
//   'use strict';
//   const getRandomCharacters = len => Math.random().toString(36).slice(-len);
//
//   window.PYPL = window.PYPL || {};
//   window.PYPL.initPayouts = function(config) {
//     var iFrame = document.createElement('iframe');
//     var object = document.createElement('object');
//     var src = config.src || 'https://login.paypal.com/signin/payments';
//     var defaultProps = {
//       height: config.height || 700,
//       style: 'width: 355px;',
//       name: 'injectedPayouts',
//       frameborder: 0,
//       scrolling: 'no',
//       sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
//     };
//     var queryParams = '?';
//     for (var param in config) {
//       queryParams = queryParams + param + '=' + encodeURIComponent(config[param]) + '&';
//     }
//     defaultProps.src = src + queryParams;
//     Object.keys(defaultProps).forEach(function(attr) {
//       iFrame.setAttribute(attr, defaultProps[attr]);
//     });
//     document.getElementById(config.parentId).appendChild(iFrame);
//   };
//
//   window.PYPL.getSignUpDetails = function(config){
//
//
//
//   };
//
//   window.PYPL.getPaymentDetails = function(config){
//
//
//
//   };
//
//
//   window.PYPL.setPaymentMethods = function(config){
//
//
//
//   };
//   window.PYPL.setPaymentMethods = function(config){
//
//
//
//   };
//
//
//   window.PYPL.getExternalId = function() {
//     return [
//       getRandomCharacters(8),
//       getRandomCharacters(4),
//       getRandomCharacters(4),
//       getRandomCharacters(4),
//       getRandomCharacters(12),
//     ]
//       .join('-')
//       .toUpperCase();
//   }
// }());
