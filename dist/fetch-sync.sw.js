(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fetchSync"] = factory();
	else
		root["fetchSync"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ADD_SYNC = exports.ADD_SYNC = 'ADD_SYNC';
	var ADD_SYNCS = exports.ADD_SYNCS = 'ADD_SYNCS';
	
	var REMOVE_SYNC = exports.REMOVE_SYNC = 'REMOVE_SYNC';
	var REMOVE_ALL_SYNCS = exports.REMOVE_ALL_SYNCS = 'REMOVE_ALL_SYNCS';
	
	var SET_SERVICE_WORKER = exports.SET_SERVICE_WORKER = 'SET_SERVICE_WORKER';
	var SET_COMMS_OPEN = exports.SET_COMMS_OPEN = 'SET_COMMS_OPEN';
	
	var Requests = exports.Requests = {
	  OPEN_COMMS: 'OPEN_COMMS',
	  REGISTER_SYNC: 'REGISTER_SYNC',
	  CANCEL_SYNC: 'CANCEL_SYNC',
	  CANCEL_ALL: 'CANCEL_ALL'
	};
	
	var Responses = exports.Responses = {
	  SUCCESS: 'SUCCESS',
	  FAILURE: 'FAILURE'
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.serialiseRequest=t():e.serialiseRequest=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){return s.blobToArrayBuffer(e).then(function(e){return String.fromCharCode.apply(null,new Uint16Array(e))})}function o(e,t){return s.base64StringToBlob(e).then(function(e){switch(t){case c.ARRAY_BUFFER:return s.blobToArrayBuffer(e);case c.BLOB:return e;case c.FORM_DATA:throw new Error("Cannot make FormData from serialised Request");case c.JSON:return r(e).then(function(e){return JSON.parse(e)});case c.TEXT:return r(e);default:throw new Error('Unknown requested body type "'+t+'"')}})}function i(e,t){if(!(e instanceof Request))throw new Error("Expecting request to be instance of Request");for(var n=[],r=e.headers.keys(),o=0;o<r.length;o++){var i=r[o];n[i]=e.headers.get(i)}var u={method:e.method,url:e.url,headers:n,context:e.context,referrer:e.referrer,mode:e.mode,credentials:e.credentials,redirect:e.redirect,integrity:e.integrity,cache:e.cache,bodyUsed:e.bodyUsed};return e.blob().then(s.blobToBase64String).then(function(e){return u.__body=e,t?u:JSON.stringify(u)})}function u(e){var t,n;if("string"==typeof e)t=JSON.parse(e),n=t.url;else{if("object"!=typeof e)throw new Error("Expecting serialised request to be a string or object");t=e,n=t.url}const r=new Request(n,t),i={context:{enumerable:!0,value:t.context}},u=Object.keys(c).reduce(function(e,n){const i=f[n];return e[i]={enumerable:!0,value:function(){return r.bodyUsed?Promise.reject(new TypeError("Already used")):(r.bodyUsed=!0,Promise.resolve(o(t.__body,n)))}},e},i);return Object.defineProperties(r,u),r}var a,a,s=n(1),c={ARRAY_BUFFER:"ARRAY_BUFFER",BLOB:"BLOB",FORM_DATA:"FORM_DATA",JSON:"JSON",TEXT:"TEXT"},f={ARRAY_BUFFER:"arrayBuffer",BLOB:"blob",FORM_DATA:"formData",JSON:"json",TEXT:"text"};i.deserialise=u,i.deserialize=u,a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a)),a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a))},function(e,t,n){"use strict";function r(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=-1;++o<t;)r[o]=e.charCodeAt(o);return n}function o(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=-1;++o<r;)t+=String.fromCharCode(n[o]);return t}function i(e,t){return new R(function(n,r){var o=new Image;t&&(o.crossOrigin=t),o.onload=function(){n(o)},o.onerror=r,o.src=e})}function u(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");return n.drawImage(e,0,0,e.width,e.height,0,0,e.width,e.height),t}function a(e,t){return t=t||{},"string"==typeof t&&(t={type:t}),new g(e,t)}function s(e){return(window.URL||window.webkitURL).createObjectURL(e)}function c(e){return(window.URL||window.webkitURL).revokeObjectURL(e)}function f(e){return new R(function(t,n){var r=new FileReader,i="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var n=e.target.result||"";return i?t(n):void t(o(n))},r.onerror=n,i?r.readAsBinaryString(e):r.readAsArrayBuffer(e)})}function l(e,t){return R.resolve().then(function(){var n=[r(atob(e))];return t?a(n,{type:t}):a(n)})}function d(e,t){return R.resolve().then(function(){return l(btoa(e),t)})}function h(e){return f(e).then(function(e){return btoa(e)})}function p(e){return R.resolve().then(function(){var t=e.match(/data:([^;]+)/)[1],n=e.replace(/^[^,]+,/,""),o=r(atob(n));return a([o],{type:t})})}function v(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return e.toDataURL(t,r)})}function y(e,t,n){return R.resolve().then(function(){return"function"==typeof e.toBlob?new R(function(r){e.toBlob(r,t,n)}):p(e.toDataURL(t,n))})}function b(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return y(e,t,r)})}function w(e,t){return R.resolve().then(function(){return a([e],t)})}function m(e){return new R(function(t,n){var r=new FileReader;r.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},r.onerror=n,r.readAsArrayBuffer(e)})}var g=n(2),R=n(3);e.exports={createBlob:a,createObjectURL:s,revokeObjectURL:c,imgSrcToBlob:b,imgSrcToDataURL:v,canvasToBlob:y,dataURLToBlob:p,blobToBase64String:h,base64StringToBlob:l,binaryStringToBlob:d,blobToBinaryString:f,arrayBufferToBlob:w,blobToArrayBuffer:m}},function(e,t){(function(t){function n(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}e[t]=r}}}function r(e,t){t=t||{};var r=new i;n(e);for(var o=0;o<e.length;o++)r.append(e[o]);return t.type?r.getBlob(t.type):r.getBlob()}function o(e,t){return n(e),new Blob(e,t||{})}var i=t.BlobBuilder||t.WebKitBlobBuilder||t.MSBlobBuilder||t.MozBlobBuilder,u=function(){try{var e=new Blob(["hi"]);return 2===e.size}catch(t){return!1}}(),a=u&&function(){try{var e=new Blob([new Uint8Array([1,2])]);return 2===e.size}catch(t){return!1}}(),s=i&&i.prototype.append&&i.prototype.getBlob;e.exports=function(){return u?a?t.Blob:o:s?r:void 0}()}).call(t,function(){return this}())},function(e,t,n){(function(t){"function"==typeof t.Promise?e.exports=t.Promise:e.exports=n(4)}).call(t,function(){return this}())},function(e,t,n){var r,r;!function(t){e.exports=t()}(function(){return function e(t,n,o){function i(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof r&&r;if(!s&&c)return r(a,!0);if(u)return u(a,!0);throw new Error("Cannot find module '"+a+"'")}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return i(n?n:e)},f,f.exports,e,t,n,o)}return n[a].exports}for(var u="function"==typeof r&&r,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){"use strict";function r(){}t.exports=r},{}],2:[function(e,t,n){"use strict";var r=e("./promise"),o=e("./reject"),i=e("./resolve"),u=e("./INTERNAL"),a=e("./handlers"),s=o(new TypeError("must be an array"));t.exports=function(e){function t(e,t){function r(e){c[t]=e,++f===n&!o&&(o=!0,a.resolve(d,c))}i(e).then(r,function(e){o||(o=!0,a.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return s;var n=e.length,o=!1;if(!n)return i([]);for(var c=new Array(n),f=0,l=-1,d=new r(u);++l<n;)t(e[l],l);return d}},{"./INTERNAL":1,"./handlers":3,"./promise":5,"./reject":7,"./resolve":8}],3:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e("./tryCatch"),i=e("./resolveThenable"),u=e("./states");n.resolve=function(e,t){var a=o(r,t);if("error"===a.status)return n.reject(e,a.value);var s=a.value;if(s)i.safely(e,s);else{e.state=u.FULFILLED,e.outcome=t;for(var c=-1,f=e.queue.length;++c<f;)e.queue[c].callFulfilled(t)}return e},n.reject=function(e,t){e.state=u.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{"./resolveThenable":9,"./states":10,"./tryCatch":11}],4:[function(e,t,n){t.exports=n=e("./promise"),n.resolve=e("./resolve"),n.reject=e("./reject"),n.all=e("./all")},{"./all":2,"./promise":5,"./reject":7,"./resolve":8}],5:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);if("function"!=typeof e)throw new TypeError("reslover must be a function");this.state=a.PENDING,this.queue=[],this.outcome=void 0,e!==i&&u.safely(this,e)}var o=e("./unwrap"),i=e("./INTERNAL"),u=e("./resolveThenable"),a=e("./states"),s=e("./queueItem");t.exports=r,r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a.FULFILLED||"function"!=typeof t&&this.state===a.REJECTED)return this;var n=new r(i);if(this.state!==a.PENDING){var u=this.state===a.FULFILLED?e:t;o(n,u,this.outcome)}else this.queue.push(new s(n,e,t));return n}},{"./INTERNAL":1,"./queueItem":6,"./resolveThenable":9,"./states":10,"./unwrap":12}],6:[function(e,t,n){"use strict";function r(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var o=e("./handlers"),i=e("./unwrap");t.exports=r,r.prototype.callFulfilled=function(e){o.resolve(this.promise,e)},r.prototype.otherCallFulfilled=function(e){i(this.promise,this.onFulfilled,e)},r.prototype.callRejected=function(e){o.reject(this.promise,e)},r.prototype.otherCallRejected=function(e){i(this.promise,this.onRejected,e)}},{"./handlers":3,"./unwrap":12}],7:[function(e,t,n){"use strict";function r(e){var t=new o(i);return u.reject(t,e)}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r},{"./INTERNAL":1,"./handlers":3,"./promise":5}],8:[function(e,t,n){"use strict";function r(e){if(e)return e instanceof o?e:u.resolve(new o(i),e);var t=typeof e;switch(t){case"boolean":return a;case"undefined":return c;case"object":return s;case"number":return f;case"string":return l}}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r;var a=u.resolve(new o(i),!1),s=u.resolve(new o(i),null),c=u.resolve(new o(i),void 0),f=u.resolve(new o(i),0),l=u.resolve(new o(i),"")},{"./INTERNAL":1,"./handlers":3,"./promise":5}],9:[function(e,t,n){"use strict";function r(e,t){function n(t){a||(a=!0,o.reject(e,t))}function r(t){a||(a=!0,o.resolve(e,t))}function u(){t(r,n)}var a=!1,s=i(u);"error"===s.status&&n(s.value)}var o=e("./handlers"),i=e("./tryCatch");n.safely=r},{"./handlers":3,"./tryCatch":11}],10:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],11:[function(e,t,n){"use strict";function r(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=r},{}],12:[function(e,t,n){"use strict";function r(e,t,n){o(function(){var r;try{r=t(n)}catch(o){return i.reject(e,o)}r===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}var o=e("immediate"),i=e("./handlers");t.exports=r},{"./handlers":3,immediate:13}],13:[function(e,t,n){"use strict";function r(){i=!0;for(var e,t,n=s.length;n;){for(t=s,s=[],e=-1;++e<n;)t[e]();n=s.length}i=!1}function o(e){1!==s.push(e)||i||u()}for(var i,u,a=[e("./nextTick"),e("./messageChannel"),e("./stateChange"),e("./timeout")],s=[],c=-1,f=a.length;++c<f;)if(a[c].test()){u=a[c].install(r);break}t.exports=o},{"./messageChannel":14,"./nextTick":15,"./stateChange":16,"./timeout":17}],14:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}]},{},[4])(4)})}])});

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;'use strict'
	
	/* global Response:false, FileReader:false */
	
	// https://gist.github.com/davoclavo/4424731
	function dataURItoBlob (dataURI) {
	  var byteString = atob(dataURI.split(',')[1])
	  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	  var arrayBuffer = new ArrayBuffer(byteString.length)
	  var _ia = new Uint8Array(arrayBuffer)
	  for (var i = 0; i < byteString.length; i++) {
	    _ia[i] = byteString.charCodeAt(i)
	  }
	  var dataView = new DataView(arrayBuffer)
	  return new Blob([dataView.buffer], {type: mimeString})
	}
	
	/**
	 * Serialise a Response to a string or object.
	 * @param {Response} response
	 */
	function serialiseResponse (response) {
	  if (!(response instanceof Response)) {
	    throw new Error('Expecting response to be instance of Response')
	  }
	
	  var headers = []
	  var headerNames = response.headers.keys()
	  for (var i = 0; i < headerNames.length; i++) {
	    var headerName = headerNames[i]
	    headers[headerName] = response.headers.get(headerName)
	  }
	
	  return new Promise(function (resolve, reject) {
	    var reader = new FileReader()
	    response.blob().then(function (blob) {
	      return reader.readAsDataURL(blob)
	    })
	    reader.onerror = reject
	    reader.onloadend = function () {
	      resolve(JSON.stringify({
	        type: response.type,
	        url: response.url,
	        useFinalURL: response.useFinalURL,
	        status: response.status,
	        ok: response.ok,
	        statusText: response.statusText,
	        headers: headers,
	        __body: reader.result
	      }))
	    }
	  })
	}
	
	/**
	 * De-serialise a Response from a string or object.
	 * @param {Object|String} response
	 */
	function deserialiseResponse (response) {
	  var realResponse
	
	  if (typeof response === 'string') {
	    realResponse = JSON.parse(response)
	  } else if (typeof response === 'object') {
	    realResponse = response
	  } else {
	    throw new Error('Expecting serialised response to be a string or object')
	  }
	
	  return new Response(dataURItoBlob(realResponse.__body))
	}
	
	serialiseResponse.deserialise = deserialiseResponse
	serialiseResponse.deserialize = deserialiseResponse
	
	/* global define:false window:false */
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = serialiseResponse
	} else if (typeof window !== 'undefined') {
	  window.serialiseResponse = serialiseResponse
	  window.serializeResponse = serialiseResponse
	} else {
	  throw new Error(
	    'Environment is not supported. ' +
	    'Please raise an issue at https://github.com/sdgluck/serialise-response/issues'
	  )
	}


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _actionTypes = __webpack_require__(0);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Channel = function () {
	  function Channel(worker, messageHandlers) {
	    _classCallCheck(this, Channel);
	
	    worker.onmessage = this.onMessageEvent.bind(this);
	    this.messageHandlers = messageHandlers;
	    this.defaultPort = null;
	  }
	
	  _createClass(Channel, [{
	    key: 'setDefaultPort',
	    value: function setDefaultPort(defaultPort) {
	      this.defaultPort = defaultPort;
	    }
	  }, {
	    key: 'postMessage',
	    value: function postMessage(data, port) {
	      if (port) {
	        port.postMessage(JSON.stringify(data));
	      } else if (this.defaultPort) {
	        this.defaultPort.postMessage(JSON.stringify(data));
	      } else {
	        throw new Error('No port available');
	      }
	    }
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(event) {
	      var request = event.data;
	      if (request.type in this.messageHandlers) {
	        return this.messageHandlers[request.type](event);
	      }
	      return Promise.reject(new Error('Unknown request type "' + request.type + '"'));
	    }
	  }, {
	    key: 'onMessageEvent',
	    value: function onMessageEvent(event) {
	      var _this = this;
	
	      return this.handleMessage(event).catch(function (err) {
	        return _this.postMessage({
	          type: _actionTypes.Responses.FAILURE,
	          data: { error: err.message }
	        }, event.ports[0]);
	      }).then(function (data) {
	        return _this.postMessage({
	          type: _actionTypes.Responses.SUCCESS,
	          data: data
	        }, event.ports[0]);
	      });
	    }
	  }]);
	
	  return Channel;
	}();

	exports.default = Channel;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global window:false, self:false, define:false, module:false */
	
	/**
	 * @license IDBWrapper - A cross-browser wrapper for IndexedDB
	 * Version 1.6.2
	 * Copyright (c) 2011 - 2016 Jens Arps
	 * http://jensarps.de/
	 *
	 * Licensed under the MIT (X11) license
	 */
	
	(function (name, definition, global) {
	
	  'use strict';
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = definition();
	  } else {
	    global[name] = definition();
	  }
	})('IDBStore', function () {
	
	  'use strict';
	
	  var defaultErrorHandler = function (error) {
	    throw error;
	  };
	  var defaultSuccessHandler = function () {};
	
	  var defaults = {
	    storeName: 'Store',
	    storePrefix: 'IDBWrapper-',
	    dbVersion: 1,
	    keyPath: 'id',
	    autoIncrement: true,
	    onStoreReady: function () {
	    },
	    onError: defaultErrorHandler,
	    indexes: [],
	    implementationPreference: [
	      'indexedDB',
	      'webkitIndexedDB',
	      'mozIndexedDB',
	      'shimIndexedDB'
	    ]
	  };
	
	  /**
	   *
	   * The IDBStore constructor
	   *
	   * @constructor
	   * @name IDBStore
	   * @version 1.6.2
	   *
	   * @param {Object} [kwArgs] An options object used to configure the store and
	   *  set callbacks
	   * @param {String} [kwArgs.storeName='Store'] The name of the store
	   * @param {String} [kwArgs.storePrefix='IDBWrapper-'] A prefix that is
	   *  internally used to construct the name of the database, which will be
	   *  kwArgs.storePrefix + kwArgs.storeName
	   * @param {Number} [kwArgs.dbVersion=1] The version of the store
	   * @param {String} [kwArgs.keyPath='id'] The key path to use. If you want to
	   *  setup IDBWrapper to work with out-of-line keys, you need to set this to
	   *  `null`
	   * @param {Boolean} [kwArgs.autoIncrement=true] If set to true, IDBStore will
	   *  automatically make sure a unique keyPath value is present on each object
	   *  that is stored.
	   * @param {Function} [kwArgs.onStoreReady] A callback to be called when the
	   *  store is ready to be used.
	   * @param {Function} [kwArgs.onError=throw] A callback to be called when an
	   *  error occurred during instantiation of the store.
	   * @param {Array} [kwArgs.indexes=[]] An array of indexData objects
	   *  defining the indexes to use with the store. For every index to be used
	   *  one indexData object needs to be passed in the array.
	   *  An indexData object is defined as follows:
	   * @param {Object} [kwArgs.indexes.indexData] An object defining the index to
	   *  use
	   * @param {String} kwArgs.indexes.indexData.name The name of the index
	   * @param {String} [kwArgs.indexes.indexData.keyPath] The key path of the index
	   * @param {Boolean} [kwArgs.indexes.indexData.unique] Whether the index is unique
	   * @param {Boolean} [kwArgs.indexes.indexData.multiEntry] Whether the index is multi entry
	   * @param {Array} [kwArgs.implementationPreference=['indexedDB','webkitIndexedDB','mozIndexedDB','shimIndexedDB']] An array of strings naming implementations to be used, in order or preference
	   * @param {Function} [onStoreReady] A callback to be called when the store
	   * is ready to be used.
	   * @example
	      // create a store for customers with an additional index over the
	      // `lastname` property.
	      var myCustomerStore = new IDBStore({
	        dbVersion: 1,
	        storeName: 'customer-index',
	        keyPath: 'customerid',
	        autoIncrement: true,
	        onStoreReady: populateTable,
	        indexes: [
	          { name: 'lastname', keyPath: 'lastname', unique: false, multiEntry: false }
	        ]
	      });
	   * @example
	      // create a generic store
	      var myCustomerStore = new IDBStore({
	        storeName: 'my-data-store',
	        onStoreReady: function(){
	          // start working with the store.
	        }
	      });
	   */
	  var IDBStore = function (kwArgs, onStoreReady) {
	
	    if (typeof onStoreReady == 'undefined' && typeof kwArgs == 'function') {
	      onStoreReady = kwArgs;
	    }
	    if (Object.prototype.toString.call(kwArgs) != '[object Object]') {
	      kwArgs = {};
	    }
	
	    for (var key in defaults) {
	      this[key] = typeof kwArgs[key] != 'undefined' ? kwArgs[key] : defaults[key];
	    }
	
	    this.dbName = this.storePrefix + this.storeName;
	    this.dbVersion = parseInt(this.dbVersion, 10) || 1;
	
	    onStoreReady && (this.onStoreReady = onStoreReady);
	
	    var env = typeof window == 'object' ? window : self;
	    var availableImplementations = this.implementationPreference.filter(function (implName) {
	      return implName in env;
	    });
	    this.implementation = availableImplementations[0];
	    this.idb = env[this.implementation];
	    this.keyRange = env.IDBKeyRange || env.webkitIDBKeyRange || env.mozIDBKeyRange;
	
	    this.consts = {
	      'READ_ONLY':         'readonly',
	      'READ_WRITE':        'readwrite',
	      'VERSION_CHANGE':    'versionchange',
	      'NEXT':              'next',
	      'NEXT_NO_DUPLICATE': 'nextunique',
	      'PREV':              'prev',
	      'PREV_NO_DUPLICATE': 'prevunique'
	    };
	
	    this.openDB();
	  };
	
	  /** @lends IDBStore.prototype */
	  var proto = {
	
	    /**
	     * A pointer to the IDBStore ctor
	     *
	     * @private
	     * @type {Function}
	     * @constructs
	     */
	    constructor: IDBStore,
	
	    /**
	     * The version of IDBStore
	     *
	     * @type {String}
	     */
	    version: '1.6.2',
	
	    /**
	     * A reference to the IndexedDB object
	     *
	     * @type {Object}
	     */
	    db: null,
	
	    /**
	     * The full name of the IndexedDB used by IDBStore, composed of
	     * this.storePrefix + this.storeName
	     *
	     * @type {String}
	     */
	    dbName: null,
	
	    /**
	     * The version of the IndexedDB used by IDBStore
	     *
	     * @type {Number}
	     */
	    dbVersion: null,
	
	    /**
	     * A reference to the objectStore used by IDBStore
	     *
	     * @type {Object}
	     */
	    store: null,
	
	    /**
	     * The store name
	     *
	     * @type {String}
	     */
	    storeName: null,
	
	    /**
	     * The prefix to prepend to the store name
	     *
	     * @type {String}
	     */
	    storePrefix: null,
	
	    /**
	     * The key path
	     *
	     * @type {String}
	     */
	    keyPath: null,
	
	    /**
	     * Whether IDBStore uses autoIncrement
	     *
	     * @type {Boolean}
	     */
	    autoIncrement: null,
	
	    /**
	     * The indexes used by IDBStore
	     *
	     * @type {Array}
	     */
	    indexes: null,
	
	    /**
	     * The implemantations to try to use, in order of preference
	     *
	     * @type {Array}
	     */
	    implementationPreference: null,
	
	    /**
	     * The actual implementation being used
	     *
	     * @type {String}
	     */
	    implementation: '',
	
	    /**
	     * The callback to be called when the store is ready to be used
	     *
	     * @type {Function}
	     */
	    onStoreReady: null,
	
	    /**
	     * The callback to be called if an error occurred during instantiation
	     * of the store
	     *
	     * @type {Function}
	     */
	    onError: null,
	
	    /**
	     * The internal insertID counter
	     *
	     * @type {Number}
	     * @private
	     */
	    _insertIdCount: 0,
	
	    /**
	     * Opens an IndexedDB; called by the constructor.
	     *
	     * Will check if versions match and compare provided index configuration
	     * with existing ones, and update indexes if necessary.
	     *
	     * Will call this.onStoreReady() if everything went well and the store
	     * is ready to use, and this.onError() is something went wrong.
	     *
	     * @private
	     *
	     */
	    openDB: function () {
	
	      var openRequest = this.idb.open(this.dbName, this.dbVersion);
	      var preventSuccessCallback = false;
	
	      openRequest.onerror = function (error) {
	
	        var gotVersionErr = false;
	        if ('error' in error.target) {
	          gotVersionErr = error.target.error.name == 'VersionError';
	        } else if ('errorCode' in error.target) {
	          gotVersionErr = error.target.errorCode == 12;
	        }
	
	        if (gotVersionErr) {
	          this.onError(new Error('The version number provided is lower than the existing one.'));
	        } else {
	          this.onError(error);
	        }
	      }.bind(this);
	
	      openRequest.onsuccess = function (event) {
	
	        if (preventSuccessCallback) {
	          return;
	        }
	
	        if(this.db){
	          this.onStoreReady();
	          return;
	        }
	
	        this.db = event.target.result;
	
	        if(typeof this.db.version == 'string'){
	          this.onError(new Error('The IndexedDB implementation in this browser is outdated. Please upgrade your browser.'));
	          return;
	        }
	
	        if(!this.db.objectStoreNames.contains(this.storeName)){
	          // We should never ever get here.
	          // Lets notify the user anyway.
	          this.onError(new Error('Object store couldn\'t be created.'));
	          return;
	        }
	
	        var emptyTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
	        this.store = emptyTransaction.objectStore(this.storeName);
	
	        // check indexes
	        var existingIndexes = Array.prototype.slice.call(this.getIndexList());
	        this.indexes.forEach(function(indexData){
	          var indexName = indexData.name;
	
	          if(!indexName){
	            preventSuccessCallback = true;
	            this.onError(new Error('Cannot create index: No index name given.'));
	            return;
	          }
	
	          this.normalizeIndexData(indexData);
	
	          if(this.hasIndex(indexName)){
	            // check if it complies
	            var actualIndex = this.store.index(indexName);
	            var complies = this.indexComplies(actualIndex, indexData);
	            if(!complies){
	              preventSuccessCallback = true;
	              this.onError(new Error('Cannot modify index "' + indexName + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
	            }
	
	            existingIndexes.splice(existingIndexes.indexOf(indexName), 1);
	          } else {
	            preventSuccessCallback = true;
	            this.onError(new Error('Cannot create new index "' + indexName + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
	          }
	
	        }, this);
	
	        if (existingIndexes.length) {
	          preventSuccessCallback = true;
	          this.onError(new Error('Cannot delete index(es) "' + existingIndexes.toString() + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
	        }
	
	        preventSuccessCallback || this.onStoreReady();
	      }.bind(this);
	
	      openRequest.onupgradeneeded = function(/* IDBVersionChangeEvent */ event){
	
	        this.db = event.target.result;
	
	        if(this.db.objectStoreNames.contains(this.storeName)){
	          this.store = event.target.transaction.objectStore(this.storeName);
	        } else {
	          var optionalParameters = { autoIncrement: this.autoIncrement };
	          if (this.keyPath !== null) {
	            optionalParameters.keyPath = this.keyPath;
	          }
	          this.store = this.db.createObjectStore(this.storeName, optionalParameters);
	        }
	
	        var existingIndexes = Array.prototype.slice.call(this.getIndexList());
	        this.indexes.forEach(function(indexData){
	          var indexName = indexData.name;
	
	          if(!indexName){
	            preventSuccessCallback = true;
	            this.onError(new Error('Cannot create index: No index name given.'));
	          }
	
	          this.normalizeIndexData(indexData);
	
	          if(this.hasIndex(indexName)){
	            // check if it complies
	            var actualIndex = this.store.index(indexName);
	            var complies = this.indexComplies(actualIndex, indexData);
	            if(!complies){
	              // index differs, need to delete and re-create
	              this.store.deleteIndex(indexName);
	              this.store.createIndex(indexName, indexData.keyPath, { unique: indexData.unique, multiEntry: indexData.multiEntry });
	            }
	
	            existingIndexes.splice(existingIndexes.indexOf(indexName), 1);
	          } else {
	            this.store.createIndex(indexName, indexData.keyPath, { unique: indexData.unique, multiEntry: indexData.multiEntry });
	          }
	
	        }, this);
	
	        if (existingIndexes.length) {
	          existingIndexes.forEach(function(_indexName){
	            this.store.deleteIndex(_indexName);
	          }, this);
	        }
	
	      }.bind(this);
	    },
	
	    /**
	     * Deletes the database used for this store if the IDB implementations
	     * provides that functionality.
	     *
	     * @param {Function} [onSuccess] A callback that is called if deletion
	     *  was successful.
	     * @param {Function} [onError] A callback that is called if deletion
	     *  failed.
	     */
	    deleteDatabase: function (onSuccess, onError) {
	      if (this.idb.deleteDatabase) {
	        this.db.close();
	        var deleteRequest = this.idb.deleteDatabase(this.dbName);
	        deleteRequest.onsuccess = onSuccess;
	        deleteRequest.onerror = onError;
	      } else {
	        onError(new Error('Browser does not support IndexedDB deleteDatabase!'));
	      }
	    },
	
	    /*********************
	     * data manipulation *
	     *********************/
	
	    /**
	     * Puts an object into the store. If an entry with the given id exists,
	     * it will be overwritten. This method has a different signature for inline
	     * keys and out-of-line keys; please see the examples below.
	     *
	     * @param {*} [key] The key to store. This is only needed if IDBWrapper
	     *  is set to use out-of-line keys. For inline keys - the default scenario -
	     *  this can be omitted.
	     * @param {Object} value The data object to store.
	     * @param {Function} [onSuccess] A callback that is called if insertion
	     *  was successful.
	     * @param {Function} [onError] A callback that is called if insertion
	     *  failed.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     * @example
	        // Storing an object, using inline keys (the default scenario):
	        var myCustomer = {
	          customerid: 2346223,
	          lastname: 'Doe',
	          firstname: 'John'
	        };
	        myCustomerStore.put(myCustomer, mySuccessHandler, myErrorHandler);
	        // Note that passing success- and error-handlers is optional.
	     * @example
	        // Storing an object, using out-of-line keys:
	       var myCustomer = {
	         lastname: 'Doe',
	         firstname: 'John'
	       };
	       myCustomerStore.put(2346223, myCustomer, mySuccessHandler, myErrorHandler);
	      // Note that passing success- and error-handlers is optional.
	     */
	    put: function (key, value, onSuccess, onError) {
	      if (this.keyPath !== null) {
	        onError = onSuccess;
	        onSuccess = value;
	        value = key;
	      }
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	
	      var hasSuccess = false,
	          result = null,
	          putRequest;
	
	      var putTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
	      putTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      putTransaction.onabort = onError;
	      putTransaction.onerror = onError;
	
	      if (this.keyPath !== null) { // in-line keys
	        this._addIdPropertyIfNeeded(value);
	        putRequest = putTransaction.objectStore(this.storeName).put(value);
	      } else { // out-of-line keys
	        putRequest = putTransaction.objectStore(this.storeName).put(value, key);
	      }
	      putRequest.onsuccess = function (event) {
	        hasSuccess = true;
	        result = event.target.result;
	      };
	      putRequest.onerror = onError;
	
	      return putTransaction;
	    },
	
	    /**
	     * Retrieves an object from the store. If no entry exists with the given id,
	     * the success handler will be called with null as first and only argument.
	     *
	     * @param {*} key The id of the object to fetch.
	     * @param {Function} [onSuccess] A callback that is called if fetching
	     *  was successful. Will receive the object as only argument.
	     * @param {Function} [onError] A callback that will be called if an error
	     *  occurred during the operation.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    get: function (key, onSuccess, onError) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	
	      var hasSuccess = false,
	          result = null;
	      
	      var getTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
	      getTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      getTransaction.onabort = onError;
	      getTransaction.onerror = onError;
	      var getRequest = getTransaction.objectStore(this.storeName).get(key);
	      getRequest.onsuccess = function (event) {
	        hasSuccess = true;
	        result = event.target.result;
	      };
	      getRequest.onerror = onError;
	
	      return getTransaction;
	    },
	
	    /**
	     * Removes an object from the store.
	     *
	     * @param {*} key The id of the object to remove.
	     * @param {Function} [onSuccess] A callback that is called if the removal
	     *  was successful.
	     * @param {Function} [onError] A callback that will be called if an error
	     *  occurred during the operation.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    remove: function (key, onSuccess, onError) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	
	      var hasSuccess = false,
	          result = null;
	
	      var removeTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
	      removeTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      removeTransaction.onabort = onError;
	      removeTransaction.onerror = onError;
	
	      var deleteRequest = removeTransaction.objectStore(this.storeName)['delete'](key);
	      deleteRequest.onsuccess = function (event) {
	        hasSuccess = true;
	        result = event.target.result;
	      };
	      deleteRequest.onerror = onError;
	
	      return removeTransaction;
	    },
	
	    /**
	     * Runs a batch of put and/or remove operations on the store.
	     *
	     * @param {Array} dataArray An array of objects containing the operation to run
	     *  and the data object (for put operations).
	     * @param {Function} [onSuccess] A callback that is called if all operations
	     *  were successful.
	     * @param {Function} [onError] A callback that is called if an error
	     *  occurred during one of the operations.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    batch: function (dataArray, onSuccess, onError) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	
	      if(Object.prototype.toString.call(dataArray) != '[object Array]'){
	        onError(new Error('dataArray argument must be of type Array.'));
	      } else if (dataArray.length === 0) {
	        return onSuccess(true);
	      }
	
	      var count = dataArray.length;
	      var called = false;
	      var hasSuccess = false;
	
	      var batchTransaction = this.db.transaction([this.storeName] , this.consts.READ_WRITE);
	      batchTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(hasSuccess);
	      };
	      batchTransaction.onabort = onError;
	      batchTransaction.onerror = onError;
	
	
	      var onItemSuccess = function () {
	        count--;
	        if (count === 0 && !called) {
	          called = true;
	          hasSuccess = true;
	        }
	      };
	
	      dataArray.forEach(function (operation) {
	        var type = operation.type;
	        var key = operation.key;
	        var value = operation.value;
	
	        var onItemError = function (err) {
	          batchTransaction.abort();
	          if (!called) {
	            called = true;
	            onError(err, type, key);
	          }
	        };
	
	        if (type == 'remove') {
	          var deleteRequest = batchTransaction.objectStore(this.storeName)['delete'](key);
	          deleteRequest.onsuccess = onItemSuccess;
	          deleteRequest.onerror = onItemError;
	        } else if (type == 'put') {
	          var putRequest;
	          if (this.keyPath !== null) { // in-line keys
	            this._addIdPropertyIfNeeded(value);
	            putRequest = batchTransaction.objectStore(this.storeName).put(value);
	          } else { // out-of-line keys
	            putRequest = batchTransaction.objectStore(this.storeName).put(value, key);
	          }
	          putRequest.onsuccess = onItemSuccess;
	          putRequest.onerror = onItemError;
	        }
	      }, this);
	
	      return batchTransaction;
	    },
	
	    /**
	     * Takes an array of objects and stores them in a single transaction.
	     *
	     * @param {Array} dataArray An array of objects to store
	     * @param {Function} [onSuccess] A callback that is called if all operations
	     *  were successful.
	     * @param {Function} [onError] A callback that is called if an error
	     *  occurred during one of the operations.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    putBatch: function (dataArray, onSuccess, onError) {
	      var batchData = dataArray.map(function(item){
	        return { type: 'put', value: item };
	      });
	
	      return this.batch(batchData, onSuccess, onError);
	    },
	
	    /**
	     * Like putBatch, takes an array of objects and stores them in a single
	     * transaction, but allows processing of the result values.  Returns the
	     * processed records containing the key for newly created records to the
	     * onSuccess calllback instead of only returning true or false for success.
	     * In addition, added the option for the caller to specify a key field that
	     * should be set to the newly created key.
	     *
	     * @param {Array} dataArray An array of objects to store
	     * @param {Object} [options] An object containing optional options
	     * @param {String} [options.keyField=this.keyPath] Specifies a field in the record to update
	     *  with the auto-incrementing key. Defaults to the store's keyPath.
	     * @param {Function} [onSuccess] A callback that is called if all operations
	     *  were successful.
	     * @param {Function} [onError] A callback that is called if an error
	     *  occurred during one of the operations.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     *
	     */
	    upsertBatch: function (dataArray, options, onSuccess, onError) {
	      // handle `dataArray, onSuccess, onError` signature
	      if (typeof options == 'function') {
	        onSuccess = options;
	        onError = onSuccess;
	        options = {};
	      }
	
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	      options || (options = {});
	
	      if (Object.prototype.toString.call(dataArray) != '[object Array]') {
	        onError(new Error('dataArray argument must be of type Array.'));
	      }
	
	      var keyField = options.keyField || this.keyPath;
	      var count = dataArray.length;
	      var called = false;
	      var hasSuccess = false;
	      var index = 0; // assume success callbacks are executed in order
	
	      var batchTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
	      batchTransaction.oncomplete = function () {
	        if (hasSuccess) {
	          onSuccess(dataArray);
	        } else {
	          onError(false);
	        }
	      };
	      batchTransaction.onabort = onError;
	      batchTransaction.onerror = onError;
	
	      var onItemSuccess = function (event) {
	        var record = dataArray[index++];
	        record[keyField] = event.target.result;
	
	        count--;
	        if (count === 0 && !called) {
	          called = true;
	          hasSuccess = true;
	        }
	      };
	
	      dataArray.forEach(function (record) {
	        var key = record.key;
	
	        var onItemError = function (err) {
	          batchTransaction.abort();
	          if (!called) {
	            called = true;
	            onError(err);
	          }
	        };
	
	        var putRequest;
	        if (this.keyPath !== null) { // in-line keys
	          this._addIdPropertyIfNeeded(record);
	          putRequest = batchTransaction.objectStore(this.storeName).put(record);
	        } else { // out-of-line keys
	          putRequest = batchTransaction.objectStore(this.storeName).put(record, key);
	        }
	        putRequest.onsuccess = onItemSuccess;
	        putRequest.onerror = onItemError;
	      }, this);
	
	      return batchTransaction;
	    },
	
	    /**
	     * Takes an array of keys and removes matching objects in a single
	     * transaction.
	     *
	     * @param {Array} keyArray An array of keys to remove
	     * @param {Function} [onSuccess] A callback that is called if all operations
	     *  were successful.
	     * @param {Function} [onError] A callback that is called if an error
	     *  occurred during one of the operations.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    removeBatch: function (keyArray, onSuccess, onError) {
	      var batchData = keyArray.map(function(key){
	        return { type: 'remove', key: key };
	      });
	
	      return this.batch(batchData, onSuccess, onError);
	    },
	
	    /**
	     * Takes an array of keys and fetches matching objects
	     *
	     * @param {Array} keyArray An array of keys identifying the objects to fetch
	     * @param {Function} [onSuccess] A callback that is called if all operations
	     *  were successful.
	     * @param {Function} [onError] A callback that is called if an error
	     *  occurred during one of the operations.
	     * @param {String} [arrayType='sparse'] The type of array to pass to the
	     *  success handler. May be one of 'sparse', 'dense' or 'skip'. Defaults to
	     *  'sparse'. This parameter specifies how to handle the situation if a get
	     *  operation did not throw an error, but there was no matching object in
	     *  the database. In most cases, 'sparse' provides the most desired
	     *  behavior. See the examples for details.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     * @example
	     // given that there are two objects in the database with the keypath
	     // values 1 and 2, and the call looks like this:
	     myStore.getBatch([1, 5, 2], onError, function (data) { … }, arrayType);
	
	     // this is what the `data` array will be like:
	
	     // arrayType == 'sparse':
	     // data is a sparse array containing two entries and having a length of 3:
	       [Object, 2: Object]
	         0: Object
	         2: Object
	         length: 3
	         __proto__: Array[0]
	     // calling forEach on data will result in the callback being called two
	     // times, with the index parameter matching the index of the key in the
	     // keyArray.
	
	     // arrayType == 'dense':
	     // data is a dense array containing three entries and having a length of 3,
	     // where data[1] is of type undefined:
	       [Object, undefined, Object]
	         0: Object
	         1: undefined
	         2: Object
	         length: 3
	         __proto__: Array[0]
	     // calling forEach on data will result in the callback being called three
	     // times, with the index parameter matching the index of the key in the
	     // keyArray, but the second call will have undefined as first argument.
	
	     // arrayType == 'skip':
	     // data is a dense array containing two entries and having a length of 2:
	       [Object, Object]
	         0: Object
	         1: Object
	         length: 2
	         __proto__: Array[0]
	     // calling forEach on data will result in the callback being called two
	     // times, with the index parameter not matching the index of the key in the
	     // keyArray.
	     */
	    getBatch: function (keyArray, onSuccess, onError, arrayType) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	      arrayType || (arrayType = 'sparse');
	
	      if (Object.prototype.toString.call(keyArray) != '[object Array]'){
	        onError(new Error('keyArray argument must be of type Array.'));
	      } else if (keyArray.length === 0) {
	        return onSuccess([]);
	      }
	
	      var data = [];
	      var count = keyArray.length;
	      var called = false;
	      var hasSuccess = false;
	      var result = null;
	
	      var batchTransaction = this.db.transaction([this.storeName] , this.consts.READ_ONLY);
	      batchTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      batchTransaction.onabort = onError;
	      batchTransaction.onerror = onError;
	
	      var onItemSuccess = function (event) {
	        if (event.target.result || arrayType == 'dense') {
	          data.push(event.target.result);
	        } else if (arrayType == 'sparse') {
	          data.length++;
	        }
	        count--;
	        if (count === 0) {
	          called = true;
	          hasSuccess = true;
	          result = data;
	        }
	      };
	
	      keyArray.forEach(function (key) {
	
	        var onItemError = function (err) {
	          called = true;
	          result = err;
	          onError(err);
	          batchTransaction.abort();
	        };
	
	        var getRequest = batchTransaction.objectStore(this.storeName).get(key);
	        getRequest.onsuccess = onItemSuccess;
	        getRequest.onerror = onItemError;
	
	      }, this);
	
	      return batchTransaction;
	    },
	
	    /**
	     * Fetches all entries in the store.
	     *
	     * @param {Function} [onSuccess] A callback that is called if the operation
	     *  was successful. Will receive an array of objects.
	     * @param {Function} [onError] A callback that will be called if an error
	     *  occurred during the operation.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    getAll: function (onSuccess, onError) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	      var getAllTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
	      var store = getAllTransaction.objectStore(this.storeName);
	      if (store.getAll) {
	        this._getAllNative(getAllTransaction, store, onSuccess, onError);
	      } else {
	        this._getAllCursor(getAllTransaction, store, onSuccess, onError);
	      }
	
	      return getAllTransaction;
	    },
	
	    /**
	     * Implements getAll for IDB implementations that have a non-standard
	     * getAll() method.
	     *
	     * @param {Object} getAllTransaction An open READ transaction.
	     * @param {Object} store A reference to the store.
	     * @param {Function} onSuccess A callback that will be called if the
	     *  operation was successful.
	     * @param {Function} onError A callback that will be called if an
	     *  error occurred during the operation.
	     * @private
	     */
	    _getAllNative: function (getAllTransaction, store, onSuccess, onError) {
	      var hasSuccess = false,
	          result = null;
	
	      getAllTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      getAllTransaction.onabort = onError;
	      getAllTransaction.onerror = onError;
	
	      var getAllRequest = store.getAll();
	      getAllRequest.onsuccess = function (event) {
	        hasSuccess = true;
	        result = event.target.result;
	      };
	      getAllRequest.onerror = onError;
	    },
	
	    /**
	     * Implements getAll for IDB implementations that do not have a getAll()
	     * method.
	     *
	     * @param {Object} getAllTransaction An open READ transaction.
	     * @param {Object} store A reference to the store.
	     * @param {Function} onSuccess A callback that will be called if the
	     *  operation was successful.
	     * @param {Function} onError A callback that will be called if an
	     *  error occurred during the operation.
	     * @private
	     */
	    _getAllCursor: function (getAllTransaction, store, onSuccess, onError) {
	      var all = [],
	          hasSuccess = false,
	          result = null;
	
	      getAllTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      getAllTransaction.onabort = onError;
	      getAllTransaction.onerror = onError;
	
	      var cursorRequest = store.openCursor();
	      cursorRequest.onsuccess = function (event) {
	        var cursor = event.target.result;
	        if (cursor) {
	          all.push(cursor.value);
	          cursor['continue']();
	        }
	        else {
	          hasSuccess = true;
	          result = all;
	        }
	      };
	      cursorRequest.onError = onError;
	    },
	
	    /**
	     * Clears the store, i.e. deletes all entries in the store.
	     *
	     * @param {Function} [onSuccess] A callback that will be called if the
	     *  operation was successful.
	     * @param {Function} [onError] A callback that will be called if an
	     *  error occurred during the operation.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    clear: function (onSuccess, onError) {
	      onError || (onError = defaultErrorHandler);
	      onSuccess || (onSuccess = defaultSuccessHandler);
	
	      var hasSuccess = false,
	          result = null;
	
	      var clearTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
	      clearTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      clearTransaction.onabort = onError;
	      clearTransaction.onerror = onError;
	
	      var clearRequest = clearTransaction.objectStore(this.storeName).clear();
	      clearRequest.onsuccess = function (event) {
	        hasSuccess = true;
	        result = event.target.result;
	      };
	      clearRequest.onerror = onError;
	
	      return clearTransaction;
	    },
	
	    /**
	     * Checks if an id property needs to present on a object and adds one if
	     * necessary.
	     *
	     * @param {Object} dataObj The data object that is about to be stored
	     * @private
	     */
	    _addIdPropertyIfNeeded: function (dataObj) {
	      if (typeof dataObj[this.keyPath] == 'undefined') {
	        dataObj[this.keyPath] = this._insertIdCount++ + Date.now();
	      }
	    },
	
	    /************
	     * indexing *
	     ************/
	
	    /**
	     * Returns a DOMStringList of index names of the store.
	     *
	     * @return {DOMStringList} The list of index names
	     */
	    getIndexList: function () {
	      return this.store.indexNames;
	    },
	
	    /**
	     * Checks if an index with the given name exists in the store.
	     *
	     * @param {String} indexName The name of the index to look for
	     * @return {Boolean} Whether the store contains an index with the given name
	     */
	    hasIndex: function (indexName) {
	      return this.store.indexNames.contains(indexName);
	    },
	
	    /**
	     * Normalizes an object containing index data and assures that all
	     * properties are set.
	     *
	     * @param {Object} indexData The index data object to normalize
	     * @param {String} indexData.name The name of the index
	     * @param {String} [indexData.keyPath] The key path of the index
	     * @param {Boolean} [indexData.unique] Whether the index is unique
	     * @param {Boolean} [indexData.multiEntry] Whether the index is multi entry
	     */
	    normalizeIndexData: function (indexData) {
	      indexData.keyPath = indexData.keyPath || indexData.name;
	      indexData.unique = !!indexData.unique;
	      indexData.multiEntry = !!indexData.multiEntry;
	    },
	
	    /**
	     * Checks if an actual index complies with an expected index.
	     *
	     * @param {Object} actual The actual index found in the store
	     * @param {Object} expected An Object describing an expected index
	     * @return {Boolean} Whether both index definitions are identical
	     */
	    indexComplies: function (actual, expected) {
	      var complies = ['keyPath', 'unique', 'multiEntry'].every(function (key) {
	        // IE10 returns undefined for no multiEntry
	        if (key == 'multiEntry' && actual[key] === undefined && expected[key] === false) {
	          return true;
	        }
	        // Compound keys
	        if (key == 'keyPath' && Object.prototype.toString.call(expected[key]) == '[object Array]') {
	          var exp = expected.keyPath;
	          var act = actual.keyPath;
	
	          // IE10 can't handle keyPath sequences and stores them as a string.
	          // The index will be unusable there, but let's still return true if
	          // the keyPath sequence matches.
	          if (typeof act == 'string') {
	            return exp.toString() == act;
	          }
	
	          // Chrome/Opera stores keyPath squences as DOMStringList, Firefox
	          // as Array
	          if ( ! (typeof act.contains == 'function' || typeof act.indexOf == 'function') ) {
	            return false;
	          }
	
	          if (act.length !== exp.length) {
	            return false;
	          }
	
	          for (var i = 0, m = exp.length; i<m; i++) {
	            if ( ! ( (act.contains && act.contains(exp[i])) || act.indexOf(exp[i] !== -1) )) {
	              return false;
	            }
	          }
	          return true;
	        }
	        return expected[key] == actual[key];
	      });
	      return complies;
	    },
	
	    /**********
	     * cursor *
	     **********/
	
	    /**
	     * Iterates over the store using the given options and calling onItem
	     * for each entry matching the options.
	     *
	     * @param {Function} onItem A callback to be called for each match
	     * @param {Object} [options] An object defining specific options
	     * @param {Object} [options.index=null] An IDBIndex to operate on
	     * @param {String} [options.order=ASC] The order in which to provide the
	     *  results, can be 'DESC' or 'ASC'
	     * @param {Boolean} [options.autoContinue=true] Whether to automatically
	     *  iterate the cursor to the next result
	     * @param {Boolean} [options.filterDuplicates=false] Whether to exclude
	     *  duplicate matches
	     * @param {Object} [options.keyRange=null] An IDBKeyRange to use
	     * @param {Boolean} [options.writeAccess=false] Whether grant write access
	     *  to the store in the onItem callback
	     * @param {Function} [options.onEnd=null] A callback to be called after
	     *  iteration has ended
	     * @param {Function} [options.onError=throw] A callback to be called
	     *  if an error occurred during the operation.
	     * @param {Number} [options.limit=Infinity] Limit the number of returned
	     *  results to this number
	     * @param {Number} [options.offset=0] Skip the provided number of results
	     *  in the resultset
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    iterate: function (onItem, options) {
	      options = mixin({
	        index: null,
	        order: 'ASC',
	        autoContinue: true,
	        filterDuplicates: false,
	        keyRange: null,
	        writeAccess: false,
	        onEnd: null,
	        onError: defaultErrorHandler,
	        limit: Infinity,
	        offset: 0
	      }, options || {});
	
	      var directionType = options.order.toLowerCase() == 'desc' ? 'PREV' : 'NEXT';
	      if (options.filterDuplicates) {
	        directionType += '_NO_DUPLICATE';
	      }
	
	      var hasSuccess = false;
	      var cursorTransaction = this.db.transaction([this.storeName], this.consts[options.writeAccess ? 'READ_WRITE' : 'READ_ONLY']);
	      var cursorTarget = cursorTransaction.objectStore(this.storeName);
	      if (options.index) {
	        cursorTarget = cursorTarget.index(options.index);
	      }
	      var recordCount = 0;
	
	      cursorTransaction.oncomplete = function () {
	        if (!hasSuccess) {
	          options.onError(null);
	          return;
	        }
	        if (options.onEnd) {
	          options.onEnd();
	        } else {
	          onItem(null);
	        }
	      };
	      cursorTransaction.onabort = options.onError;
	      cursorTransaction.onerror = options.onError;
	
	      var cursorRequest = cursorTarget.openCursor(options.keyRange, this.consts[directionType]);
	      cursorRequest.onerror = options.onError;
	      cursorRequest.onsuccess = function (event) {
	        var cursor = event.target.result;
	        if (cursor) {
	          if (options.offset) {
	            cursor.advance(options.offset);
	            options.offset = 0;
	          } else {
	            onItem(cursor.value, cursor, cursorTransaction);
	            recordCount++;
	            if (options.autoContinue) {
	              if (recordCount + options.offset < options.limit) {
	                cursor['continue']();
	              } else {
	                hasSuccess = true;
	              }
	            }
	          }
	        } else {
	          hasSuccess = true;
	        }
	      };
	
	      return cursorTransaction;
	    },
	
	    /**
	     * Runs a query against the store and passes an array containing matched
	     * objects to the success handler.
	     *
	     * @param {Function} onSuccess A callback to be called when the operation
	     *  was successful.
	     * @param {Object} [options] An object defining specific options
	     * @param {Object} [options.index=null] An IDBIndex to operate on
	     * @param {String} [options.order=ASC] The order in which to provide the
	     *  results, can be 'DESC' or 'ASC'
	     * @param {Boolean} [options.filterDuplicates=false] Whether to exclude
	     *  duplicate matches
	     * @param {Object} [options.keyRange=null] An IDBKeyRange to use
	     * @param {Function} [options.onError=throw] A callback to be called
	     *  if an error occurred during the operation.
	     * @param {Number} [options.limit=Infinity] Limit the number of returned
	     *  results to this number
	     * @param {Number} [options.offset=0] Skip the provided number of results
	     *  in the resultset
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    query: function (onSuccess, options) {
	      var result = [];
	      options = options || {};
	      options.autoContinue = true;
	      options.writeAccess = false;
	      options.onEnd = function () {
	        onSuccess(result);
	      };
	      return this.iterate(function (item) {
	        result.push(item);
	      }, options);
	    },
	
	    /**
	     *
	     * Runs a query against the store, but only returns the number of matches
	     * instead of the matches itself.
	     *
	     * @param {Function} onSuccess A callback to be called if the opration
	     *  was successful.
	     * @param {Object} [options] An object defining specific options
	     * @param {Object} [options.index=null] An IDBIndex to operate on
	     * @param {Object} [options.keyRange=null] An IDBKeyRange to use
	     * @param {Function} [options.onError=throw] A callback to be called if an error
	     *  occurred during the operation.
	     * @returns {IDBTransaction} The transaction used for this operation.
	     */
	    count: function (onSuccess, options) {
	
	      options = mixin({
	        index: null,
	        keyRange: null
	      }, options || {});
	
	      var onError = options.onError || defaultErrorHandler;
	
	      var hasSuccess = false,
	          result = null;
	
	      var cursorTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
	      cursorTransaction.oncomplete = function () {
	        var callback = hasSuccess ? onSuccess : onError;
	        callback(result);
	      };
	      cursorTransaction.onabort = onError;
	      cursorTransaction.onerror = onError;
	
	      var cursorTarget = cursorTransaction.objectStore(this.storeName);
	      if (options.index) {
	        cursorTarget = cursorTarget.index(options.index);
	      }
	      var countRequest = cursorTarget.count(options.keyRange);
	      countRequest.onsuccess = function (evt) {
	        hasSuccess = true;
	        result = evt.target.result;
	      };
	      countRequest.onError = onError;
	
	      return cursorTransaction;
	    },
	
	    /**************/
	    /* key ranges */
	    /**************/
	
	    /**
	     * Creates a key range using specified options. This key range can be
	     * handed over to the count() and iterate() methods.
	     *
	     * Note: You must provide at least one or both of "lower" or "upper" value.
	     *
	     * @param {Object} options The options for the key range to create
	     * @param {*} [options.lower] The lower bound
	     * @param {Boolean} [options.excludeLower] Whether to exclude the lower
	     *  bound passed in options.lower from the key range
	     * @param {*} [options.upper] The upper bound
	     * @param {Boolean} [options.excludeUpper] Whether to exclude the upper
	     *  bound passed in options.upper from the key range
	     * @param {*} [options.only] A single key value. Use this if you need a key
	     *  range that only includes one value for a key. Providing this
	     *  property invalidates all other properties.
	     * @return {Object} The IDBKeyRange representing the specified options
	     */
	    makeKeyRange: function(options){
	      /*jshint onecase:true */
	      var keyRange,
	          hasLower = typeof options.lower != 'undefined',
	          hasUpper = typeof options.upper != 'undefined',
	          isOnly = typeof options.only != 'undefined';
	
	      switch(true){
	        case isOnly:
	          keyRange = this.keyRange.only(options.only);
	          break;
	        case hasLower && hasUpper:
	          keyRange = this.keyRange.bound(options.lower, options.upper, options.excludeLower, options.excludeUpper);
	          break;
	        case hasLower:
	          keyRange = this.keyRange.lowerBound(options.lower, options.excludeLower);
	          break;
	        case hasUpper:
	          keyRange = this.keyRange.upperBound(options.upper, options.excludeUpper);
	          break;
	        default:
	          throw new Error('Cannot create KeyRange. Provide one or both of "lower" or "upper" value, or an "only" value.');
	      }
	
	      return keyRange;
	
	    }
	
	  };
	
	  /** helpers **/
	  var empty = {};
	  function mixin (target, source) {
	    var name, s;
	    for (name in source) {
	      s = source[name];
	      if (s !== empty[name] && s !== target[name]) {
	        target[name] = s;
	      }
	    }
	    return target;
	  }
	
	  IDBStore.prototype = proto;
	  IDBStore.version = proto.version;
	
	  return IDBStore;
	
	}, this);


/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	(function () {
	  'use strict';
	
	  /* global self:false, require:false, fetch:false, __DEV__:false */
	
	  var _ref3;
	
	  var IDBStore = __webpack_require__(14);
	  var serialiseRequest = __webpack_require__(1);
	  var serialiseResponse = __webpack_require__(3);
	
	  var Channel = __webpack_require__(13);
	
	  var _require = __webpack_require__(0);
	
	  var Requests = _require.Requests;
	  var Responses = _require.Responses;
	
	
	  var store = new IDBStore({
	    dbVersion: 1,
	    keyPath: 'id',
	    storeName:  true ? '$$syncs_' + Date.now() : '$$syncs'
	  });
	
	  var channel = new Channel(self, (_ref3 = {}, _defineProperty(_ref3, Requests.OPEN_COMMS, function (event) {
	    channel.setDefaultPort(event.ports[0]);
	    return Promise.resolve();
	  }), _defineProperty(_ref3, Requests.REGISTER_SYNC, function (_ref) {
	    var data = _ref.data;
	
	    return registerSync(data.sync).then(function () {
	      return addSync(data.sync);
	    });
	  }), _defineProperty(_ref3, Requests.CANCEL_SYNC, function (_ref2) {
	    var data = _ref2.data;
	
	    return new Promise(store.remove.bind(store, data.id));
	  }), _defineProperty(_ref3, Requests.CANCEL_ALL, function () {
	    return new Promise(store.getAll.bind(store)).then(function (syncs) {
	      return new Promise(store.removeBatch.bind(store, syncs.map(function (sync) {
	        return sync.id;
	      })));
	    });
	  }), _ref3));
	
	  function registerSync(sync) {
	    return self.registration['sync'].register(sync.id);
	  }
	
	  function addSync(sync) {
	    return new Promise(store.put.bind(store, sync)).catch(function (err) {
	      if (!/key already exists/i.test(err.message)) {
	        throw err;
	      }
	    });
	  }
	
	  function syncEvent(event) {
	    event.waitUntil(new Promise(store.get.bind(store, event.tag)).then(function (sync) {
	      if (!sync) {
	        event.registration && event.registration.unregister();
	        return;
	      }
	
	      var id = sync.id;
	      var lastChance = event.lastChance;
	      var request = serialiseRequest.deserialise(sync.request);
	
	      return fetch(request).then(serialiseResponse).then(function (response) {
	        var syncedOn = Date.now();
	        store.put(_extends({}, sync, { response: response, syncedOn: syncedOn }));
	        channel.postMessage({
	          type: Responses.SUCCESS,
	          data: { id: id, lastChance: lastChance, response: response }
	        });
	      }).catch(function (err) {
	        store.remove(id);
	        channel.postMessage({
	          type: Responses.FAILURE,
	          data: { error: err.message }
	        });
	      });
	    }));
	  }
	
	  // The 'sync' event fires when connectivity is restored or already available to the UA.
	  self.addEventListener('sync', syncEvent);
	
	  // The 'activate' event is fired when the service worker becomes operational.
	  // For example, after a refresh after install, or after all pages using
	  // the older version of the worker have closed after upgrade of the worker.
	  self.addEventListener('activate', function activateEvent(event) {
	    event.waitUntil(self.clients.claim());
	  });
	
	  // The 'install' event is fired when the service worker has been installed.
	  // This does not mean that the service worker is operating, as the UA will wait
	  // for all pages to close that are using older versions of the worker.
	  self.addEventListener('install', function installEvent(event) {
	    event.waitUntil(self.skipWaiting());
	  });
	})();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fetch-sync.sw.js.map