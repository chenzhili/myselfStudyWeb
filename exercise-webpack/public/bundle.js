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
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Greeter_js__ = __webpack_require__(/*! ./Greeter.js */ 6);\n/*var greeter = require('./Greeter.js');\r\ndocument.getElementById('root').appendChild(greeter());*/\r\n\r\n\r\n/*import \"./main1.css\";*/ \r\ndocument.getElementById('root').appendChild(__WEBPACK_IMPORTED_MODULE_0__Greeter_js__[\"a\" /* fun */]());   \r\n \r\n\r\n\r\n \r\n\r\n\r\n\r\n// webpack的用法 （webpack只需要一个引入接口文件，通过此对于所有的有关文件作出对应的操作打包之类）\r\n/***********其实就是对于现在的模块化开发的需求开发出来，这个接口文件会对先关的文件进行相关的操作\r\n\t它支持AMD和CommonJS，以及其他的模块系统(Angular, ES6)。如果你不太熟悉如何使用，就用CommonJS吧。\r\n\r\n\t特别对应当前我看的angular2来说中的路由，加载的时候，只会加载对应路由下的文件，不会加载所有的代码，这个按需加载让文件变得更加小，优化性更好\r\n**********************/ \r\n/*  webpack 开发环境下编译\r\n\twebpack -p 产品编译及压缩\r\n\twebpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)\r\n\twebpack -d 引入 source maps*/\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9tYWluLmpzPzZhNGIiXSwic291cmNlc0NvbnRlbnQiOlsiLyp2YXIgZ3JlZXRlciA9IHJlcXVpcmUoJy4vR3JlZXRlci5qcycpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpLmFwcGVuZENoaWxkKGdyZWV0ZXIoKSk7Ki9cclxuaW1wb3J0IHsgZnVuIH0gZnJvbSBcIi4vR3JlZXRlci5qc1wiXHJcblxyXG4vKmltcG9ydCBcIi4vbWFpbjEuY3NzXCI7Ki8gXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuYXBwZW5kQ2hpbGQoZnVuKCkpOyAgIFxyXG4gXHJcblxyXG5cclxuIFxyXG5cclxuXHJcblxyXG4vLyB3ZWJwYWNr55qE55So5rOVIO+8iHdlYnBhY2vlj6rpnIDopoHkuIDkuKrlvJXlhaXmjqXlj6Pmlofku7bvvIzpgJrov4fmraTlr7nkuo7miYDmnInnmoTmnInlhbPmlofku7bkvZzlh7rlr7nlupTnmoTmk43kvZzmiZPljIXkuYvnsbvvvIlcclxuLyoqKioqKioqKioq5YW25a6e5bCx5piv5a+55LqO546w5Zyo55qE5qih5Z2X5YyW5byA5Y+R55qE6ZyA5rGC5byA5Y+R5Ye65p2l77yM6L+Z5Liq5o6l5Y+j5paH5Lu25Lya5a+55YWI5YWz55qE5paH5Lu26L+b6KGM55u45YWz55qE5pON5L2cXHJcblx05a6D5pSv5oyBQU1E5ZKMQ29tbW9uSlPvvIzku6Xlj4rlhbbku5bnmoTmqKHlnZfns7vnu58oQW5ndWxhciwgRVM2KeOAguWmguaenOS9oOS4jeWkqueGn+aCieWmguS9leS9v+eUqO+8jOWwseeUqENvbW1vbkpT5ZCn44CCXHJcblxyXG5cdOeJueWIq+WvueW6lOW9k+WJjeaIkeeci+eahGFuZ3VsYXIy5p2l6K+05Lit55qE6Lev55Sx77yM5Yqg6L2955qE5pe25YCZ77yM5Y+q5Lya5Yqg6L295a+55bqU6Lev55Sx5LiL55qE5paH5Lu277yM5LiN5Lya5Yqg6L295omA5pyJ55qE5Luj56CB77yM6L+Z5Liq5oyJ6ZyA5Yqg6L296K6p5paH5Lu25Y+Y5b6X5pu05Yqg5bCP77yM5LyY5YyW5oCn5pu05aW9XHJcbioqKioqKioqKioqKioqKioqKioqKiovIFxyXG4vKiAgd2VicGFjayDlvIDlj5Hnjq/looPkuIvnvJbor5FcclxuXHR3ZWJwYWNrIC1wIOS6p+WTgee8luivkeWPiuWOi+e8qVxyXG5cdHdlYnBhY2sgLS13YXRjaCDlvIDlj5Hnjq/looPkuIvmjIHnu63nmoTnm5HlkKzmlofku7blj5jliqjmnaXov5vooYznvJbor5Eo6Z2e5bi45b+rISlcclxuXHR3ZWJwYWNrIC1kIOW8leWFpSBzb3VyY2UgbWFwcyovXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///5\n");

/***/ }),

/***/ 6:
/*!************************!*\
  !*** ./app/Greeter.js ***!
  \************************/
/*! exports provided: fun */
/*! exports used: fun */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = fun;\n/*module.exports = function() {\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings!\";\r\n  return greet;\r\n};*/\r\n\r\nfunction fun(){\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings!\";\r\n  return greet;\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9HcmVldGVyLmpzP2ViODQiXSwic291cmNlc0NvbnRlbnQiOlsiLyptb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBncmVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGdyZWV0LnRleHRDb250ZW50ID0gXCJIaSB0aGVyZSBhbmQgZ3JlZXRpbmdzIVwiO1xyXG4gIHJldHVybiBncmVldDtcclxufTsqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZ1bigpe1xyXG4gIHZhciBncmVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGdyZWV0LnRleHRDb250ZW50ID0gXCJIaSB0aGVyZSBhbmQgZ3JlZXRpbmdzIVwiO1xyXG4gIHJldHVybiBncmVldDtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL0dyZWV0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6\n");

/***/ })

/******/ });