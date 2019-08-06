(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.inyRequest = factory());
}(this, (function () { 'use strict';

  function xhr(options) {
      return new Promise(function (resolve, reject) {
          var url = options.url, method = options.method, data = options.data;
          var request = new XMLHttpRequest();
          request.open(method, url, true);
          request.send(data);
      });
  }

  function axios(config) {
      return xhr(config);
  }

  return axios;

})));
//# sourceMappingURL=iny-request.js.map
