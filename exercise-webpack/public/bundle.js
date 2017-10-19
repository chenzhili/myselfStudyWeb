/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Greeter_js__ = __webpack_require__(6);\n/*var greeter = require('./Greeter.js');\r\ndocument.getElementById('root').appendChild(greeter());*/\r\n\r\n\r\n/*import \"./main1.css\";*/ \r\ndocument.getElementById('root').appendChild(__WEBPACK_IMPORTED_MODULE_0__Greeter_js__[\"a\" /* fun */]());\r\n \r\n\r\n\r\n \r\n\r\n\r\n\r\n// webpack的用法 （webpack只需要一个引入接口文件，通过此对于所有的有关文件作出对应的操作打包之类）\r\n/***********其实就是对于现在的模块化开发的需求开发出来，这个接口文件会对先关的文件进行相关的操作\r\n\t它支持AMD和CommonJS，以及其他的模块系统(Angular, ES6)。如果你不太熟悉如何使用，就用CommonJS吧。\r\n\r\n\t特别对应当前我看的angular2来说中的路由，加载的时候，只会加载对应路由下的文件，不会加载所有的代码，这个按需加载让文件变得更加小，优化性更好\r\n**********************/ \r\n/*  webpack 开发环境下编译\r\n\twebpack -p 产品编译及压缩\r\n\twebpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)\r\n\twebpack -d 引入 source maps*/\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcz82YTRiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0EsdURBQXVEO0FBQ3pDOztBQUVkLHVCQUF1QjtBQUN2Qjs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKnZhciBncmVldGVyID0gcmVxdWlyZSgnLi9HcmVldGVyLmpzJyk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuYXBwZW5kQ2hpbGQoZ3JlZXRlcigpKTsqL1xyXG5pbXBvcnQgeyBmdW4gfSBmcm9tIFwiLi9HcmVldGVyLmpzXCJcclxuXHJcbi8qaW1wb3J0IFwiLi9tYWluMS5jc3NcIjsqLyBcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKS5hcHBlbmRDaGlsZChmdW4oKSk7XHJcbiBcclxuXHJcblxyXG4gXHJcblxyXG5cclxuXHJcbi8vIHdlYnBhY2vnmoTnlKjms5Ug77yId2VicGFja+WPqumcgOimgeS4gOS4quW8leWFpeaOpeWPo+aWh+S7tu+8jOmAmui/h+atpOWvueS6juaJgOacieeahOacieWFs+aWh+S7tuS9nOWHuuWvueW6lOeahOaTjeS9nOaJk+WMheS5i+exu++8iVxyXG4vKioqKioqKioqKirlhbblrp7lsLHmmK/lr7nkuo7njrDlnKjnmoTmqKHlnZfljJblvIDlj5HnmoTpnIDmsYLlvIDlj5Hlh7rmnaXvvIzov5nkuKrmjqXlj6Pmlofku7bkvJrlr7nlhYjlhbPnmoTmlofku7bov5vooYznm7jlhbPnmoTmk43kvZxcclxuXHTlroPmlK/mjIFBTUTlkoxDb21tb25KU++8jOS7peWPiuWFtuS7lueahOaooeWdl+ezu+e7nyhBbmd1bGFyLCBFUzYp44CC5aaC5p6c5L2g5LiN5aSq54af5oKJ5aaC5L2V5L2/55So77yM5bCx55SoQ29tbW9uSlPlkKfjgIJcclxuXHJcblx054m55Yir5a+55bqU5b2T5YmN5oiR55yL55qEYW5ndWxhcjLmnaXor7TkuK3nmoTot6/nlLHvvIzliqDovb3nmoTml7blgJnvvIzlj6rkvJrliqDovb3lr7nlupTot6/nlLHkuIvnmoTmlofku7bvvIzkuI3kvJrliqDovb3miYDmnInnmoTku6PnoIHvvIzov5nkuKrmjInpnIDliqDovb3orqnmlofku7blj5jlvpfmm7TliqDlsI/vvIzkvJjljJbmgKfmm7Tlpb1cclxuKioqKioqKioqKioqKioqKioqKioqKi8gXHJcbi8qICB3ZWJwYWNrIOW8gOWPkeeOr+Wig+S4i+e8luivkVxyXG5cdHdlYnBhY2sgLXAg5Lqn5ZOB57yW6K+R5Y+K5Y6L57ypXHJcblx0d2VicGFjayAtLXdhdGNoIOW8gOWPkeeOr+Wig+S4i+aMgee7reeahOebkeWQrOaWh+S7tuWPmOWKqOadpei/m+ihjOe8luivkSjpnZ7luLjlv6shKVxyXG5cdHdlYnBhY2sgLWQg5byV5YWlIHNvdXJjZSBtYXBzKi9cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = fun;\n/*module.exports = function() {\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings!\";\r\n  return greet;\r\n};*/\r\n\r\nfunction fun(){\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings!\";\r\n  return greet;\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvR3JlZXRlci5qcz9lYjg0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgZ3JlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBncmVldC50ZXh0Q29udGVudCA9IFwiSGkgdGhlcmUgYW5kIGdyZWV0aW5ncyFcIjtcclxuICByZXR1cm4gZ3JlZXQ7XHJcbn07Ki9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmdW4oKXtcclxuICB2YXIgZ3JlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBncmVldC50ZXh0Q29udGVudCA9IFwiSGkgdGhlcmUgYW5kIGdyZWV0aW5ncyFcIjtcclxuICByZXR1cm4gZ3JlZXQ7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9HcmVldGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6\n");

/***/ })

/******/ });