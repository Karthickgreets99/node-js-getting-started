(function() {
  'use strict';

  window.PYPL = window.PYPL || {};
  window.PYPL.initPayouts = function(config) {
    var iFrame = document.createElement('iframe');
    var src = 'https://localhost.paypal.com/signin/payments';
    var defaultProps = {
      height: 700,
      style: 'width: 335px;',
      name: 'injectedPayouts',
      frameborder: 0,
      scrolling: 'no',
      sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
    };
    var queryParams = '?';
    for (var param in config) {
      queryParams = queryParams + param + '=' + encodeURIComponent(config[param]);
    }
    defaultProps.src = src + queryParams;
    Object.keys(defaultProps).forEach(function(attr) {
      iFrame.setAttribute(attr, defaultProps[attr]);
    });
    document.getElementById(config.parentId).appendChild(iFrame);
  };
}());
