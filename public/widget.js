(function() {
  'use strict';
  const getRandomCharacters = len => Math.random().toString(36).slice(-len);

  window.PYPL = window.PYPL || {};
  window.PYPL.initPayouts = function(config) {
    var iFrame = document.createElement('iframe');
    var src = config.src || 'https://login.paypal.com/signin/payments';
    var defaultProps = {
      height: config.height || 700,
      style: 'width: 355px;',
      name: 'injectedPayouts',
      frameborder: 0,
      scrolling: 'no',
      sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
    };
    var queryParams = '?';
    for (var param in config) {
      queryParams = queryParams + param + '=' + encodeURIComponent(config[param]) + '&';
    }
    defaultProps.src = src + queryParams;
    Object.keys(defaultProps).forEach(function(attr) {
      iFrame.setAttribute(attr, defaultProps[attr]);
    });
    document.getElementById(config.parentId).appendChild(iFrame);
  };

  window.PYPL.getExternalId = function() {
    return [
      getRandomCharacters(8),
      getRandomCharacters(4),
      getRandomCharacters(4),
      getRandomCharacters(4),
      getRandomCharacters(12),
    ]
      .join('-')
      .toUpperCase();
  }
}());
