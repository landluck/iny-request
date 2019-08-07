(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.inyRequest = factory());
}(this, (function () { 'use strict';

  var toString = Object.prototype.toString;
  function isURLSearchParams(value) {
      return typeof value !== 'undefined' && value instanceof URLSearchParams;
  }
  function isDate(value) {
      return toString.call(value) === '[object Date]';
  }
  function isPlainObject(value) {
      return toString.call(value) === '[object Object]';
  }
  //# sourceMappingURL=utils.js.map

  function encode(value) {
      return encodeURIComponent(value)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
  }
  function buildURL(url, params, paramsSerializer) {
      // 没有参数，直接返回 url
      if (!params)
          return url;
      var resultURL = '';
      // axios 这里直接每一个请求直接传入一个 paramsSerializer 函数，用来格式化参数的
      // 所以这里我们先判断是否存在这个函数，有的话直接调用即可
      // 同时给我们的 AxiosRequestConfig 中添加这个类型
      if (paramsSerializer) {
          resultURL = paramsSerializer(params);
      }
      else if (isURLSearchParams(params)) {
          // params 也有可能传入一个URLSearchParams 类型的数据，如果是，我们直接 toString 即可
          resultURL = params.toString();
      }
      else {
          // 这里就需要对普通对象、数组来进行处理了
          var part_1 = [];
          Object.keys(params).forEach(function (key) {
              var value = params[key];
              // 过滤掉 null 和 undefined
              if (value === null || typeof value === 'undefined') {
                  return;
              }
              // 判断是否是数组, 数组需要将参数格式化为 'a[]=1&a[]=3&a[]=4' 这种
              if (Array.isArray(value)) {
                  key += '[]';
              }
              else {
                  // 这里将不是 数组的 数组转换为数组，方便后面循环处理
                  value = [value];
              }
              // 循环将 k v 处理成 ['a=1','b=2']，并放置于 part 容器中
              value.forEach(function (val) {
                  // 这里需要对时间对象单独处理
                  if (isDate(val)) {
                      val = val.toISOString();
                      // 需要对对象json化处理
                  }
                  else if (isPlainObject(val)) {
                      val = JSON.stringify(val);
                  }
                  // 这里是 axios 会讲 k 和 v 通过 url 编码，并且将一些特殊字符编译回来
                  part_1.push(encode(key) + "=" + val);
              });
          });
          // 将 ['a=1','b=2'] 处理成 'a=1&b=2' 格式
          resultURL = part_1.join('&');
      }
      if (resultURL) {
          // 针对带有 # 哈希的 url 进行处理
          var index = url.indexOf('#');
          if (index !== -1) {
              url = url.slice(0, index);
          }
          // 拼接 ？或者 &
          url += (url.indexOf('?') === -1 ? '?' : '&') + resultURL;
      }
      return url;
  }
  //# sourceMappingURL=buildUrl.js.map

  function xhr(options) {
      return new Promise(function (resolve, reject) {
          var url = options.url, method = options.method, data = options.data, params = options.params, paramsSerializer = options.paramsSerializer;
          var request = new XMLHttpRequest();
          /*
            * 这里使用我们的buildURL
            * 大家可能注意到我们这里的 method 后面，添加了一个 ! ,那是因为在我们的
            * AxioxRequestConfig 中，method 不是必须的参数，但这里是必须有的，所以我们在这里断言 method 肯定有值
            * 在 ts 中可以在一个值后加 ! 来断言一个值不为空
          */
          request.open(method, buildURL(url, params, paramsSerializer), true);
          request.send(data);
      });
  }

  function axios(config) {
      return xhr(config);
  }
  //# sourceMappingURL=iny-request.js.map

  return axios;

})));
//# sourceMappingURL=iny-request.js.map
