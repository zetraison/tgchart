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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/core/index.js\");\n/* harmony import */ var _data_getCharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/getCharts */ \"./src/data/getCharts.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.js\");\n\r\n\r\n\r\n\r\n\r\nwindow.addEventListener('load', () => {\r\n    Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"loadCss\"])(\"./css/style.css\", () => {\r\n        Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"loadJson\"])(\"data/chart_data.json\", (chartsData) => {\r\n            const body = _helpers__WEBPACK_IMPORTED_MODULE_2__[\"Dom\"].for('body').addClasses('night');\r\n\r\n            // Create main chart wrapper\r\n            const wrapMain = _helpers__WEBPACK_IMPORTED_MODULE_2__[\"Dom\"].from(\"div\").addClasses(\"wrap-main\").pinTo(body);\r\n\r\n            chartsData.forEach(data => {\r\n                // Load chart data\r\n                const charts = Object(_data_getCharts__WEBPACK_IMPORTED_MODULE_1__[\"getCharts\"])(data);\r\n\r\n                // Create chart and pin to main wrapper\r\n                new _core__WEBPACK_IMPORTED_MODULE_0__[\"TChart\"](wrapMain, charts);\r\n            });\r\n\r\n            new _core__WEBPACK_IMPORTED_MODULE_0__[\"ThemeButton\"](body);\r\n        });\r\n    });\r\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/core/checkbox.js":
/*!******************************!*\
  !*** ./src/core/checkbox.js ***!
  \******************************/
/*! exports provided: Checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Checkbox\", function() { return Checkbox; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nclass Checkbox {\r\n    constructor(parent, chart, onClicked) {\r\n\r\n        const check = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('i')\r\n            .setStyle('background-color', chart.color)\r\n            .setStyle('border-color', chart.color);\r\n\r\n        const box = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('li').addClasses('on')\r\n            .append(check)\r\n            .setText(chart.name)\r\n            .pinTo(parent);\r\n\r\n        box.addEventListener('click', this.onClick.bind(this, chart, onClicked), true);\r\n    }\r\n\r\n    onClick(chart, onClicked, e) {\r\n        let target = e.target;\r\n        if (target.tagName !== 'LI') {\r\n            while (target.tagName !== 'LI')\r\n                target = target.parentElement;\r\n        }\r\n        const box = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].of(target);\r\n\r\n        const checked = box.hasClass('on');\r\n        checked\r\n            ? box.removeClasses('on').addClasses('off')\r\n            : box.removeClasses('off').addClasses('on');\r\n\r\n        onClicked({ name: chart.name, checked: !checked});\r\n    };\r\n}\n\n//# sourceURL=webpack:///./src/core/checkbox.js?");

/***/ }),

/***/ "./src/core/control.js":
/*!*****************************!*\
  !*** ./src/core/control.js ***!
  \*****************************/
/*! exports provided: Control */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Control\", function() { return Control; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nclass Control {\r\n    constructor(parent, callback) {\r\n\r\n        this.WINDOW_MIN_WIDTH = 25;\r\n        this.WINDOW_BORDER_TOUCH_WIDTH = 10;\r\n\r\n        this.node = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"control\");\r\n        this.overlayL = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay l\");\r\n        this.overlayR = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay r\");\r\n        this.window = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"window\")\r\n            .addEventListener(\"touchstart\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"touchmove\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"touchend\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"mousedown\", this.onMouseDown.bind(this, callback), true);\r\n\r\n        this.node\r\n            .append(this.overlayL)\r\n            .append(this.window)\r\n            .append(this.overlayR)\r\n            .pinTo(parent);\r\n\r\n        return this;\r\n    }\r\n\r\n    onMouseDown (callback, event) {\r\n        event.preventDefault();\r\n\r\n        const controlRect = this.node.element.getBoundingClientRect();\r\n        const windowRect = this.window.element.getBoundingClientRect();\r\n        const overlayLRect = this.overlayL.element.getBoundingClientRect();\r\n        const overlayRRect = this.overlayR.element.getBoundingClientRect();\r\n\r\n        const shiftX = Math.round(event.pageX - windowRect.left);\r\n\r\n        const onMouseMove = e => {\r\n            e.preventDefault();\r\n\r\n            let min, max, cursor, left = 75, right = 100;\r\n            let value = Math.round(e.pageX - shiftX - controlRect.left);\r\n\r\n            if (shiftX > 0 && shiftX < this.WINDOW_BORDER_TOUCH_WIDTH) {\r\n\r\n                min = 0;\r\n                max = controlRect.width - overlayRRect.width - this.WINDOW_MIN_WIDTH;\r\n\r\n                cursor = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"limit\"])(value, min, max);\r\n\r\n                this.overlayL.setStyle(\"width\", cursor, \"px\");\r\n                this.window.setStyle(\"width\", controlRect.width - overlayRRect.width - cursor, \"px\");\r\n\r\n                left = Math.round(cursor / controlRect.width * 100) / 100;\r\n                right = Math.round((controlRect.width - overlayRRect.width) / controlRect.width * 100) / 100;\r\n            } else if (shiftX > windowRect.width - this.WINDOW_BORDER_TOUCH_WIDTH && shiftX < windowRect.width) {\r\n\r\n                min = overlayLRect.width + this.WINDOW_MIN_WIDTH;\r\n                max = controlRect.width;\r\n\r\n                cursor = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"limit\"])(value + windowRect.width, min, max);\r\n\r\n                this.overlayR.setStyle(\"width\", controlRect.width - cursor, \"px\");\r\n                this.window.setStyle(\"width\", cursor - overlayLRect.width, \"px\");\r\n\r\n                left = Math.round(overlayLRect.width / controlRect.width * 100) / 100;\r\n                right = Math.round(cursor / controlRect.width * 100) / 100;\r\n            } else {\r\n\r\n                min = 0;\r\n                max = controlRect.width - windowRect.width;\r\n\r\n                cursor = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"limit\"])(value, min, max);\r\n\r\n                this.overlayL.setStyle(\"width\", cursor, \"px\");\r\n                this.overlayR.setStyle(\"width\", controlRect.width - windowRect.width - cursor, \"px\");\r\n\r\n                left = Math.round(cursor / controlRect.width * 100) / 100;\r\n                right = Math.round((cursor + windowRect.width) / controlRect.width * 100) / 100;\r\n            }\r\n\r\n            callback(left, right);\r\n        };\r\n\r\n        const onMouseUp = e => {\r\n            e.preventDefault();\r\n\r\n            document.removeEventListener(\"mousemove\", onMouseMove, true);\r\n            document.removeEventListener(\"mouseup\", onMouseUp, true);\r\n        };\r\n\r\n        document.addEventListener(\"mousemove\", onMouseMove, true);\r\n        document.addEventListener(\"mouseup\", onMouseUp, true);\r\n    };\r\n}\n\n//# sourceURL=webpack:///./src/core/control.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: Control, Checkbox, ThemeButton, Tooltip, TChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control */ \"./src/core/control.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Control\", function() { return _control__WEBPACK_IMPORTED_MODULE_0__[\"Control\"]; });\n\n/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkbox */ \"./src/core/checkbox.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Checkbox\", function() { return _checkbox__WEBPACK_IMPORTED_MODULE_1__[\"Checkbox\"]; });\n\n/* harmony import */ var _tchart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tchart */ \"./src/core/tchart.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TChart\", function() { return _tchart__WEBPACK_IMPORTED_MODULE_2__[\"TChart\"]; });\n\n/* harmony import */ var _themeButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themeButton */ \"./src/core/themeButton.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ThemeButton\", function() { return _themeButton__WEBPACK_IMPORTED_MODULE_3__[\"ThemeButton\"]; });\n\n/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip */ \"./src/core/tooltip.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return _tooltip__WEBPACK_IMPORTED_MODULE_4__[\"Tooltip\"]; });\n\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/tchart.js":
/*!****************************!*\
  !*** ./src/core/tchart.js ***!
  \****************************/
/*! exports provided: TChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TChart\", function() { return TChart; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./control */ \"./src/core/control.js\");\n/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkbox */ \"./src/core/checkbox.js\");\n/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip */ \"./src/core/tooltip.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass TChart {\r\n    constructor(parent, charts) {\r\n        this.charts = charts;\r\n        // Create UI\r\n        const wrap = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap\").pinTo(parent);\r\n        // Create title\r\n        const title = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('h2').setText(`Chart ${0}`);\r\n        // Create chart\r\n        const wrapChart = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('div').addClasses('wrap-chart');\r\n        const canvasChart = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('canvas').pinTo(wrapChart);\r\n        // Create mini map with controls\r\n        const wrapControl = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('div').addClasses('wrap-control');\r\n        const canvasControl = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('canvas').pinTo(wrapControl);\r\n        const control = new _control__WEBPACK_IMPORTED_MODULE_2__[\"Control\"](wrapControl, this.onControlChange.bind(this));\r\n        // Create legend\r\n        const wrapLegend = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('ul').addClasses('wrap-legend');\r\n        charts.forEach(chart => new _checkbox__WEBPACK_IMPORTED_MODULE_3__[\"Checkbox\"](wrapLegend, chart, this.onCheckboxClick.bind(this)));\r\n        // Create tooltip\r\n        const tooltip = new _tooltip__WEBPACK_IMPORTED_MODULE_4__[\"Tooltip\"](wrap, charts);\r\n\r\n        wrap.append(title)\r\n            .append(wrapChart)\r\n            .append(wrapControl)\r\n            .append(wrapLegend);\r\n\r\n        // Drawing\r\n        this.ctxChart = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"setupCanvas\"])(canvasChart.element).ctx;\r\n        this.ctxControl = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"setupCanvas\"])(canvasControl.element).ctx;\r\n\r\n        const allPoints = _models__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"].getAllChartsPoints(charts);\r\n        const minY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minY(allPoints);\r\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(allPoints);\r\n\r\n        this.ctxChart.setTransform(1, 0, 0, 1, 0, 0);\r\n        for (let i = 0; i < charts.length; i++) {\r\n            const chart = charts[i];\r\n\r\n            chart.draw(this.ctxChart, minY, maxY);\r\n            chart.draw(this.ctxControl, minY, maxY);\r\n        }\r\n\r\n        const {left, x: clientXOffset} = wrapChart.element.getBoundingClientRect();\r\n\r\n        const onMouseMove = e => {\r\n            tooltip.update(e.pageX - left, 1542412800000)\r\n        };\r\n\r\n        wrapChart.addEventListener('mousemove', onMouseMove, true);\r\n    }\r\n\r\n    onCheckboxClick(checked) {\r\n        console.log(checked);\r\n    }\r\n\r\n    onControlChange(l, r) {\r\n        console.log(l, r);\r\n\r\n        const allPoints = _models__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"].getAllChartsPoints(this.charts);\r\n        const minY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minY(allPoints);\r\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(allPoints);\r\n\r\n        this.ctxChart.setTransform(1, 0, 0, 1, 0, 0);\r\n        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);\r\n\r\n        this.ctxChart.translate((r - l) * this.ctxChart.canvas.width, 0);\r\n        this.ctxChart.scale(1 / (r - l), 1);\r\n        this.ctxChart.translate(-(r - l) * this.ctxChart.canvas.width, 0);\r\n\r\n        for (let i = 0; i < this.charts.length; i++) {\r\n            const chart = this.charts[i];\r\n            chart.draw(this.ctxChart, minY, maxY);\r\n        }\r\n\r\n        // animate({\r\n        //     duration: 16,\r\n        //     timing: function(timeFraction) {\r\n        //         return timeFraction;\r\n        //     },\r\n        //     draw: function(progress) {\r\n        //         ctxChart.clearRect(0, 0, ctxChart.canvas.width, ctxChart.canvas.height);\r\n        //\r\n        //         ctxChart.setTransform(1 / (r - l), 0, 0, 1, -l * ctxChart.canvas.width, 0);\r\n        //\r\n        //         for (let i = 0; i < series.length; i++) {\r\n        //             const chart = series[i];\r\n        //             chart.draw(ctxChart, minY, maxY);\r\n        //         }\r\n        //     }\r\n        // });\r\n    };\r\n}\n\n//# sourceURL=webpack:///./src/core/tchart.js?");

/***/ }),

/***/ "./src/core/themeButton.js":
/*!*********************************!*\
  !*** ./src/core/themeButton.js ***!
  \*********************************/
/*! exports provided: ThemeButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ThemeButton\", function() { return ThemeButton; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nclass ThemeButton {\r\n    constructor(parent) {\r\n\r\n        const button = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('a').addClasses('theme-switch')\r\n            .setText('Switch to Night Mode')\r\n            .pinTo(parent);\r\n\r\n        const onClick = () =>\r\n            parent.hasClass('night')\r\n                ? parent.removeClasses('night').addClasses('day')\r\n                : parent.removeClasses('day').addClasses('night');\r\n\r\n        button.addEventListener('click', onClick, true);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/themeButton.js?");

/***/ }),

/***/ "./src/core/tooltip.js":
/*!*****************************!*\
  !*** ./src/core/tooltip.js ***!
  \*****************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nclass Tooltip {\r\n    constructor(parent, charts) {\r\n        this.charts = charts;\r\n\r\n        const x = charts[0].points.map(p => p.x)[0];\r\n\r\n        this.node = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('div').addClasses('tooltip')\r\n            .setStyle('left', 0, 'px')\r\n            .pinTo(parent);\r\n\r\n        this.dateNode = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('div').addClasses('date')\r\n            .setText(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"timestampToDate\"])(x))\r\n            .pinTo(this.node);\r\n\r\n        this.values = [];\r\n        this.charts.forEach(chart => {\r\n            const b = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('b').setText(chart.getY(x));\r\n\r\n            const span = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('span')\r\n                .append(b)\r\n                .setText(chart.name)\r\n                .setStyle('color', chart.color)\r\n                .pinTo(this.node);\r\n\r\n            this.values.push(span);\r\n        });\r\n\r\n        return this;\r\n    }\r\n\r\n    update(left, x) {\r\n        this.dateNode.empty().setText(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"timestampToDate\"])(x));\r\n\r\n        this.charts.forEach((chart, index) => {\r\n            const span = this.values[index];\r\n\r\n            span.empty()\r\n                .append(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from('b').setText(chart.getY(x)))\r\n                .setText(chart.name);\r\n        });\r\n\r\n        this.node.setStyle('left', left, 'px');\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/tooltip.js?");

/***/ }),

/***/ "./src/data/getCharts.js":
/*!*******************************!*\
  !*** ./src/data/getCharts.js ***!
  \*******************************/
/*! exports provided: getCharts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCharts\", function() { return getCharts; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n\r\n\r\n\r\nconst Types = {\r\n    xAxis: \"x\",\r\n    yAxis: \"line\"\r\n};\r\n\r\nfunction getXAxis(columns, types) {\r\n    for (let i = 0; i < columns.length; i++) {\r\n        const key = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"head\"])(columns[i]);\r\n        if (types[key] === Types.xAxis) {\r\n            return Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"tail\"])(columns[i]);\r\n        }\r\n    }\r\n}\r\n\r\nfunction getCharts(data) {\r\n    // Validate input json data\r\n    if (\r\n        !data.hasOwnProperty('columns') ||\r\n        !data.hasOwnProperty('types') ||\r\n        !data.hasOwnProperty('names') ||\r\n        !data.hasOwnProperty('colors')\r\n    ) {\r\n        throw new _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Exception\"]('incorrect data')\r\n    }\r\n\r\n    const {columns, types, names, colors} = data;\r\n\r\n    const xAxis = getXAxis(columns, types);\r\n    const charts = [];\r\n\r\n    for (let i = 0; i < columns.length; i++) {\r\n\r\n        const key = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"head\"])(columns[i]);\r\n        const color = colors[key];\r\n        const name = names[key];\r\n\r\n        if (types[key] === Types.yAxis) {\r\n\r\n            const yAxis = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"tail\"])(columns[i]);\r\n\r\n            const points = [];\r\n\r\n            for (let j = 0; j < yAxis.length; j++) {\r\n\r\n                const x = xAxis[j];\r\n                const y = yAxis[j];\r\n\r\n                points.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"](x, y));\r\n            }\r\n\r\n            charts.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"](points, color, name, true));\r\n        }\r\n    }\r\n\r\n    return charts;\r\n}\n\n//# sourceURL=webpack:///./src/data/getCharts.js?");

/***/ }),

/***/ "./src/helpers/animate.js":
/*!********************************!*\
  !*** ./src/helpers/animate.js ***!
  \********************************/
/*! exports provided: animate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return animate; });\nconst animate = options =>  {\r\n    let start = performance.now();\r\n\r\n    requestAnimationFrame(function animate(time) {\r\n        let timeFraction = (time - start) / options.duration;\r\n        if (timeFraction > 1) timeFraction = 1;\r\n\r\n        let progress = options.timing(timeFraction);\r\n\r\n        options.draw(progress);\r\n\r\n        if (timeFraction < 1) {\r\n            requestAnimationFrame(animate);\r\n        }\r\n\r\n    });\r\n};\n\n//# sourceURL=webpack:///./src/helpers/animate.js?");

/***/ }),

/***/ "./src/helpers/array.js":
/*!******************************!*\
  !*** ./src/helpers/array.js ***!
  \******************************/
/*! exports provided: min, max, tail, head */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return min; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return max; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tail\", function() { return tail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"head\", function() { return head; });\nconst min = array => Math.min.apply(null, array);\r\nconst max = array => Math.max.apply(null, array);\r\nconst tail = array => array.slice(1, array.length);\r\nconst head = array => array.slice(0, 1);\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/array.js?");

/***/ }),

/***/ "./src/helpers/dom.js":
/*!****************************!*\
  !*** ./src/helpers/dom.js ***!
  \****************************/
/*! exports provided: Dom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return Dom; });\nclass Dom {\r\n\r\n    static of(el) {\r\n        return new Dom(el);\r\n    }\r\n\r\n    static for(selector) {\r\n        return new Dom(document.querySelector(selector));\r\n    }\r\n\r\n    static from(tag) {\r\n        return new Dom(document.createElement(tag));\r\n    }\r\n\r\n    constructor(el) {\r\n        this._element = el;\r\n    }\r\n\r\n    get element() {\r\n        return this._element;\r\n    }\r\n\r\n    map(f) {\r\n        return Dom.of(f(this._element));\r\n    }\r\n\r\n    addClasses(...classes) {\r\n        return this.map(el => {\r\n            for (let cl of classes) {\r\n                if (typeof cl === 'string') {\r\n                    cl.split(' ').forEach(clazz => el.classList.add(clazz));\r\n                }\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    removeClasses(...classes) {\r\n        return this.map(el => {\r\n            for (let cl of classes) {\r\n                if (typeof cl === 'string') {\r\n                    cl.split(' ').forEach(clazz => el.classList.remove(clazz));\r\n                }\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    hasClass(clazz) {\r\n        let hasClass = null;\r\n        this.map(el => {\r\n            hasClass = el.classList.contains(clazz)\r\n        });\r\n        return hasClass;\r\n    }\r\n\r\n    setAttribute(name, value) {\r\n        return this.map(el => {\r\n            el.setAttribute(name, value);\r\n            return el;\r\n        });\r\n    }\r\n\r\n    removeAttributes(...attrs) {\r\n        return this.map(el => {\r\n            if (attrs.length) {\r\n                for (let attr of attrs) {\r\n                    el.removeAttribute(attr);\r\n                }\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    setStyle(prop, value, unit) {\r\n        return this.map(el => {\r\n            el.style.setProperty(prop, unit ? `${value}${unit}` : `${value}`);\r\n            return el;\r\n        })\r\n    }\r\n\r\n    forEach(fn) {\r\n        return this.map(el => {\r\n            [...el.children].forEach(fn);\r\n            return el;\r\n        });\r\n    }\r\n\r\n    setText(string) {\r\n        return this.map(el => {\r\n            if (string) {\r\n                el.appendChild(document.createTextNode(string));\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    pinTo(parent) {\r\n        return this.map(el => {\r\n           if (parent instanceof Dom) {\r\n               parent.element.appendChild(el);\r\n           } else {\r\n               parent.appendChild(el);\r\n           }\r\n           return el;\r\n        });\r\n    }\r\n\r\n    append(child) {\r\n        return this.map(el => {\r\n            if (child instanceof Dom) {\r\n                el.appendChild(child.element)\r\n            } else {\r\n                el.appendChild(child);\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    empty() {\r\n        return this.map(el => {\r\n            while (el.firstChild)\r\n                el.removeChild(el.firstChild);\r\n            return el;\r\n        });\r\n\r\n    }\r\n\r\n    addEventListener(event, handler, options) {\r\n        return this.map(el => {\r\n            el.addEventListener(event, handler, options);\r\n            return el;\r\n        })\r\n    }\r\n\r\n    removeEventListener(event, handler, options) {\r\n        return this.map(el => {\r\n            el.removeEventListener(event, handler, options);\r\n            return el;\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/helpers/dom.js?");

/***/ }),

/***/ "./src/helpers/exception.js":
/*!**********************************!*\
  !*** ./src/helpers/exception.js ***!
  \**********************************/
/*! exports provided: Exception */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Exception\", function() { return Exception; });\nclass Exception {\r\n    constructor(message) {\r\n        this.message = message;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/helpers/exception.js?");

/***/ }),

/***/ "./src/helpers/func.js":
/*!*****************************!*\
  !*** ./src/helpers/func.js ***!
  \*****************************/
/*! exports provided: limit, relative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"limit\", function() { return limit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"relative\", function() { return relative; });\nconst limit = (value, min, max) => value < min ? min : value > max ? max : value;\r\nconst relative = (value, min, max) => (value - min) / (max - min);\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/func.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: animate, min, max, tail, head, Dom, Exception, getCharts, limit, relative, loadCss, loadJson, raf, setupCanvas, timestampToDate, touchHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animate */ \"./src/helpers/animate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return _animate__WEBPACK_IMPORTED_MODULE_0__[\"animate\"]; });\n\n/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ \"./src/helpers/array.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"min\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"max\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"tail\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"tail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"head\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"head\"]; });\n\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/helpers/dom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__[\"Dom\"]; });\n\n/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exception */ \"./src/helpers/exception.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Exception\", function() { return _exception__WEBPACK_IMPORTED_MODULE_3__[\"Exception\"]; });\n\n/* harmony import */ var _data_getCharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/getCharts */ \"./src/data/getCharts.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getCharts\", function() { return _data_getCharts__WEBPACK_IMPORTED_MODULE_4__[\"getCharts\"]; });\n\n/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./func */ \"./src/helpers/func.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"limit\", function() { return _func__WEBPACK_IMPORTED_MODULE_5__[\"limit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"relative\", function() { return _func__WEBPACK_IMPORTED_MODULE_5__[\"relative\"]; });\n\n/* harmony import */ var _loadCss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loadCss */ \"./src/helpers/loadCss.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadCss\", function() { return _loadCss__WEBPACK_IMPORTED_MODULE_6__[\"loadCss\"]; });\n\n/* harmony import */ var _loadJson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loadJson */ \"./src/helpers/loadJson.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadJson\", function() { return _loadJson__WEBPACK_IMPORTED_MODULE_7__[\"loadJson\"]; });\n\n/* harmony import */ var _raf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./raf */ \"./src/helpers/raf.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"raf\", function() { return _raf__WEBPACK_IMPORTED_MODULE_8__[\"raf\"]; });\n\n/* harmony import */ var _setupCanvas__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./setupCanvas */ \"./src/helpers/setupCanvas.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setupCanvas\", function() { return _setupCanvas__WEBPACK_IMPORTED_MODULE_9__[\"setupCanvas\"]; });\n\n/* harmony import */ var _timeutil__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./timeutil */ \"./src/helpers/timeutil.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timestampToDate\", function() { return _timeutil__WEBPACK_IMPORTED_MODULE_10__[\"timestampToDate\"]; });\n\n/* harmony import */ var _touchHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./touchHandler */ \"./src/helpers/touchHandler.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"touchHandler\", function() { return _touchHandler__WEBPACK_IMPORTED_MODULE_11__[\"touchHandler\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/index.js?");

/***/ }),

/***/ "./src/helpers/loadCss.js":
/*!********************************!*\
  !*** ./src/helpers/loadCss.js ***!
  \********************************/
/*! exports provided: loadCss */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadCss\", function() { return loadCss; });\nconst loadCss = (path, callback) => {\r\n    callback   = callback || function() {};\r\n\r\n    const css = document.createElement(\"link\");\r\n    css.type = \"text/css\";\r\n    css.rel = \"stylesheet\";\r\n    css.onload = css.onreadystatechange = function() {\r\n        callback();\r\n    };\r\n\r\n    css.href = path;\r\n    document.getElementsByTagName(\"head\")[0].appendChild(css);\r\n};\n\n//# sourceURL=webpack:///./src/helpers/loadCss.js?");

/***/ }),

/***/ "./src/helpers/loadJson.js":
/*!*********************************!*\
  !*** ./src/helpers/loadJson.js ***!
  \*********************************/
/*! exports provided: loadJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadJson\", function() { return loadJson; });\nconst loadJson = (path, success, error) => {\r\n    const xhr = new XMLHttpRequest();\r\n    xhr.onreadystatechange = function()\r\n    {\r\n        if (xhr.readyState === XMLHttpRequest.DONE) {\r\n            if (xhr.status === 200) {\r\n                if (success)\r\n                    success(JSON.parse(xhr.responseText));\r\n            } else {\r\n                if (error)\r\n                    error(xhr);\r\n            }\r\n        }\r\n    };\r\n    xhr.open(\"GET\", path, true);\r\n    xhr.send();\r\n};\n\n//# sourceURL=webpack:///./src/helpers/loadJson.js?");

/***/ }),

/***/ "./src/helpers/raf.js":
/*!****************************!*\
  !*** ./src/helpers/raf.js ***!
  \****************************/
/*! exports provided: raf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"raf\", function() { return raf; });\nconst raf = () => {\r\n    let lastTime = 0;\r\n    let currTime, timeToCall, id;\r\n    const vendors = ['ms', 'moz', 'webkit', 'o'];\r\n    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\r\n        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];\r\n        window.cancelAnimationFrame =\r\n            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];\r\n    }\r\n    if (!window.requestAnimationFrame) {\r\n        window.requestAnimationFrame = callback => {\r\n            currTime = Date.now();\r\n            timeToCall = Math.max(0, 16 - (currTime - lastTime));\r\n            id = window.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);\r\n            lastTime = currTime + timeToCall;\r\n            return id;\r\n        };\r\n    }\r\n    if (!window.cancelAnimationFrame) {\r\n        window.cancelAnimationFrame = id => clearTimeout(id);\r\n    }\r\n};\n\n//# sourceURL=webpack:///./src/helpers/raf.js?");

/***/ }),

/***/ "./src/helpers/setupCanvas.js":
/*!************************************!*\
  !*** ./src/helpers/setupCanvas.js ***!
  \************************************/
/*! exports provided: setupCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupCanvas\", function() { return setupCanvas; });\nfunction setupCanvas(canvas) {\r\n    const { width, height } = canvas.getBoundingClientRect();\r\n    const dpr = window.devicePixelRatio || 1;\r\n\r\n    canvas.width = width * dpr;\r\n    canvas.height = height * dpr;\r\n\r\n    const ctx = canvas.getContext('2d');\r\n    ctx.scale(dpr, dpr);\r\n\r\n    return { ctx, viewport: { width, height } };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/helpers/setupCanvas.js?");

/***/ }),

/***/ "./src/helpers/timeutil.js":
/*!*********************************!*\
  !*** ./src/helpers/timeutil.js ***!
  \*********************************/
/*! exports provided: timestampToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timestampToDate\", function() { return timestampToDate; });\nconst timestampToDate = timestamp => {\r\n    const months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\r\n    const date = new Date(timestamp);\r\n\r\n    return `${months[date.getMonth()]} ${date.getDate()}`;\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/timeutil.js?");

/***/ }),

/***/ "./src/helpers/touchHandler.js":
/*!*************************************!*\
  !*** ./src/helpers/touchHandler.js ***!
  \*************************************/
/*! exports provided: touchHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"touchHandler\", function() { return touchHandler; });\nconst touchHandler = event => {\r\n    const touch = event.changedTouches[0];\r\n\r\n    const simulatedEvent = document.createEvent(\"MouseEvent\");\r\n    simulatedEvent.initMouseEvent({\r\n            touchstart: \"mousedown\",\r\n            touchmove: \"mousemove\",\r\n            touchend: \"mouseup\"\r\n        }[event.type],\r\n        true,\r\n        true,\r\n        window, 1,\r\n        touch.screenX,\r\n        touch.screenY,\r\n        touch.clientX,\r\n        touch.clientY,\r\n        false,\r\n        false,\r\n        false,\r\n        false,\r\n        0,\r\n        null);\r\n\r\n    touch.target.dispatchEvent(simulatedEvent);\r\n};\n\n//# sourceURL=webpack:///./src/helpers/touchHandler.js?");

/***/ }),

/***/ "./src/models/chart.js":
/*!*****************************!*\
  !*** ./src/models/chart.js ***!
  \*****************************/
/*! exports provided: Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Chart\", function() { return Chart; });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/models/point.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\n\r\nclass Chart {\r\n    constructor(points, color, name, visible) {\r\n        this.points = points;\r\n        this.color = color;\r\n        this.name = name;\r\n        this.visible = visible;\r\n    };\r\n\r\n    minX() {\r\n        return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"].minX(this.points);\r\n    }\r\n\r\n    maxX() {\r\n        return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"].maxX(this.points);\r\n    }\r\n\r\n    minY() {\r\n        return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"].minY(this.points);\r\n    }\r\n\r\n    maxY() {\r\n        return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"].maxY(this.points);\r\n    }\r\n\r\n    getY(x) {\r\n        const points = this.points.filter(p => p.x === x);\r\n        return points.length > 0 ? points[0].y : NaN;\r\n    }\r\n\r\n    cropPoints(l, r) {\r\n        const points = this.points;\r\n        const minX = this.minX();\r\n        const maxX = this.maxX();\r\n\r\n        l = Math.round(minX + (maxX - minX) * l);\r\n        r = Math.round(minX + (maxX - minX) * r);\r\n\r\n        return points.filter(p => p.x >= l && p.x <= r);\r\n    }\r\n\r\n    draw(ctx, minY, maxY) {\r\n\r\n        const points = this.points;\r\n        const minX = this.minX();\r\n        const maxX = this.maxX();\r\n\r\n        ctx.beginPath();\r\n\r\n        for (let i = 0; i < points.length - 1; i++) {\r\n\r\n            const p1 = points[i];\r\n            const p2 = points[i+1];\r\n\r\n            const x1 = Math.round(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"relative\"])(p1.x, minX, maxX) * ctx.canvas.width);\r\n            const x2 = Math.round(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"relative\"])(p2.x, minX, maxX) * ctx.canvas.width);\r\n\r\n            const y1 = ctx.canvas.height - Math.round(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"relative\"])(p1.y, minY, maxY) * ctx.canvas.height);\r\n            const y2 = ctx.canvas.height - Math.round(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"relative\"])(p2.y, minY, maxY) * ctx.canvas.height);\r\n\r\n            ctx.moveTo(x1, y1);\r\n            ctx.lineTo(x2, y2);\r\n        }\r\n\r\n        ctx.closePath();\r\n\r\n        ctx.strokeStyle = this.color;\r\n        ctx.lineCap = \"round\";\r\n        ctx.stroke();\r\n    }\r\n\r\n    static getAllChartsPoints(charts) {\r\n        return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/models/chart.js?");

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! exports provided: Point, Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/models/point.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"]; });\n\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart */ \"./src/models/chart.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Chart\", function() { return _chart__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"]; });\n\n\r\n\n\n//# sourceURL=webpack:///./src/models/index.js?");

/***/ }),

/***/ "./src/models/point.js":
/*!*****************************!*\
  !*** ./src/models/point.js ***!
  \*****************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony import */ var _helpers_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/array */ \"./src/helpers/array.js\");\n\r\n\r\nclass Point {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    };\r\n\r\n    static minX(points) {\r\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"min\"])(points.map(p => p.x));\r\n    }\r\n\r\n    static maxX(points) {\r\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"max\"])(points.map(p => p.x));\r\n    }\r\n\r\n    static minY(points) {\r\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"min\"])(points.map(p => p.y));\r\n    }\r\n\r\n    static maxY(points) {\r\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"max\"])(points.map(p => p.y));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/models/point.js?");

/***/ })

/******/ });