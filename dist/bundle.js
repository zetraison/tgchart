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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_tchart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/tchart */ \"./src/core/tchart.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.js\");\n\r\n\r\n\r\nconst options = {\r\n    canvasWidth: 350,\r\n    canvasHeight: 350,\r\n\r\n    sliderWidth: 350,\r\n    sliderHeight: 50\r\n};\r\n\r\nconst wrap = document.createElement('div');\r\nwrap.className = 'wrap-main';\r\ndocument.body.appendChild(wrap);\r\n\r\nconst drawCharts = arr => arr.forEach(data => wrap.appendChild(new _core_tchart__WEBPACK_IMPORTED_MODULE_0__[\"TChart\"](data, options)));\r\n\r\nObject(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"loadCss\"])(\"css/style.css\", () => Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"loadJson\"])(\"data.json\", drawCharts));\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/core/controls.js":
/*!******************************!*\
  !*** ./src/core/controls.js ***!
  \******************************/
/*! exports provided: Control */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Control\", function() { return Control; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nclass Control {\r\n    constructor() {\r\n\r\n        const omMouseDown = e => {\r\n            e.preventDefault();\r\n\r\n            const controlRect = control.element.getBoundingClientRect();\r\n            const windowRect = window.element.getBoundingClientRect();\r\n\r\n            const shiftX = Math.round(e.pageX - windowRect.left);\r\n\r\n            const omMouseMove = e => {\r\n                e.preventDefault();\r\n\r\n                let cursor = Math.round(e.pageX - shiftX - controlRect.left);\r\n\r\n                if (cursor < 0)\r\n                    cursor = 0;\r\n                if (cursor > controlRect.width - windowRect.width)\r\n                    cursor = controlRect.width - windowRect.width;\r\n\r\n                console.log(e.pageX, shiftX, cursor, controlRect.width - cursor);\r\n\r\n                window.setStyle(\"width\", windowRect.width + \"px\");\r\n                overlayL.setStyle(\"width\", cursor + \"px\");\r\n                overlayR.setStyle(\"width\", controlRect.width - cursor - windowRect.width + \"px\");\r\n\r\n                return false;\r\n            };\r\n\r\n            const omMouseUp = e => {\r\n                e.preventDefault();\r\n\r\n                document.removeEventListener(\"mousemove\", omMouseMove, true);\r\n                document.removeEventListener(\"mouseup\", omMouseUp, true);\r\n            };\r\n\r\n            document.addEventListener(\"mousemove\", omMouseMove, true);\r\n            document.addEventListener(\"mouseup\", omMouseUp, true);\r\n        };\r\n\r\n        const overlayL = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay l\")\r\n            .setStyle(\"width\", \"75%\");\r\n\r\n        const overlayR = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay r\");\r\n\r\n        const window = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"window\")\r\n            .addEventListener(\"touchstart\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"touchmove\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"touchend\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\r\n            .addEventListener(\"mousedown\", omMouseDown, true)\r\n            .setStyle(\"width\", \"25%\");\r\n\r\n       const control = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\")\r\n            .addClasses(\"control\")\r\n            .append(overlayL)\r\n            .append(window)\r\n            .append(overlayR);\r\n\r\n        return _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap-control\")\r\n            .append(control);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/controls.js?");

/***/ }),

/***/ "./src/core/tchart.js":
/*!****************************!*\
  !*** ./src/core/tchart.js ***!
  \****************************/
/*! exports provided: TChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TChart\", function() { return TChart; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ \"./src/core/controls.js\");\n/*\r\n * TChart\r\n *\r\n * @file            tchart.js\r\n * @version         0.1\r\n * @description     Open source chart library.\r\n * @license         MIT License\r\n * @author          zetraison\r\n * {@link           https://github.com/zetraison/tchart}\r\n *\r\n */\r\n\r\n\r\n\r\n\r\nconst TChart = function (data, options) {\r\n    return this.init(data, options);\r\n};\r\n\r\nTChart.version = \"0.1\";\r\n\r\nTChart.defaults = {\r\n    canvasWidth: 400,\r\n    canvasHeight: 400,\r\n    canvasBottom: 20,\r\n\r\n    sliderWidth: 400,\r\n    sliderHeight: 40,\r\n    thumbWidth: 6,\r\n\r\n    gridCount: 6,\r\n\r\n    font: \"11px Arial\",\r\n\r\n    fps: 60\r\n};\r\n\r\nTChart.types = {\r\n    xAxis: \"x\",\r\n    yAxis: \"line\"\r\n};\r\n\r\nTChart.class = {\r\n    canvas: \"canvas\",\r\n    thumb: \"thumb\",\r\n    thumbMiddle: \"thumb-middle\",\r\n    thumbContainer: \"thumb-container\",\r\n    checkboxContainer: \"checkbox-container\",\r\n    grid: \"grid\"\r\n};\r\n\r\nTChart.prototype = {\r\n    /**\r\n     * Constructor\r\n     *\r\n     * @param {Object} data\r\n     * @param {Object} options\r\n     * @returns {HTMLElement}\r\n     */\r\n    init: function(data, options) {\r\n        if (\r\n            !data.hasOwnProperty(\"columns\") ||\r\n            !data.hasOwnProperty(\"types\") ||\r\n            !data.hasOwnProperty(\"names\") ||\r\n            !data.hasOwnProperty(\"colors\")\r\n        ) {\r\n            throw new _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Exception\"](\"incorrect data\")\r\n        }\r\n\r\n        options = TChart.loadOptions(options);\r\n\r\n        // Load chart data\r\n        this.charts = this.getCharts(data);\r\n\r\n        this.x1 = 0;\r\n        this.x2 = 1;\r\n        this.running = false;\r\n\r\n        // Create UI\r\n        const chartCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"chart\")\r\n            .setAttribute(\"width\", 460)\r\n            .setAttribute(\"height\", 250);\r\n\r\n        const gridCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"grid\")\r\n            .setAttribute(\"width\", 460)\r\n            .setAttribute(\"height\", 250);\r\n\r\n        const wrapChart = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap-chart\")\r\n            .append(chartCanvas)\r\n            .append(gridCanvas);\r\n\r\n        const sliderCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"canvas\")\r\n            .setAttribute(\"width\", 460)\r\n            .setAttribute(\"height\", 70);\r\n\r\n        const wrapControl = new _controls__WEBPACK_IMPORTED_MODULE_2__[\"Control\"]()\r\n            .append(sliderCanvas);\r\n\r\n        const wrapLegend = this.drawCheckboxes(options);\r\n\r\n        const canvasContext = chartCanvas.element.getContext(\"2d\");\r\n        const sliderContext = sliderCanvas.element.getContext(\"2d\");\r\n        const gridContext = gridCanvas.element.getContext(\"2d\");\r\n\r\n        const box = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap\")\r\n            .append(wrapChart)\r\n            .append(wrapControl)\r\n            .append(wrapLegend);\r\n\r\n        this.updateScene(sliderContext, canvasContext, gridContext, options);\r\n\r\n        return box.element;\r\n    },\r\n\r\n    /**\r\n     * Main animation loop\r\n     *\r\n     * @param sliderContext\r\n     * @param canvasContext\r\n     * @param gridContext\r\n     * @param options\r\n     */\r\n    animate: function(sliderContext, canvasContext, gridContext, options) {\r\n        requestAnimationFrame(this.animate.bind(this, sliderContext, canvasContext, gridContext, options));\r\n\r\n        if (!this.running) return;\r\n\r\n        this.now = Date.now();\r\n        this.elapsed = this.now - this.then;\r\n\r\n        if (this.elapsed > this.fpsInterval) {\r\n\r\n            this.then = this.now - (this.elapsed % this.fpsInterval);\r\n\r\n            canvasContext.save();\r\n\r\n            sliderContext.clearRect(0, 0, sliderContext.canvas.width, sliderContext.canvas.height);\r\n            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);\r\n\r\n            this.drawCharts(sliderContext, canvasContext, options);\r\n            this.drawAxes(canvasContext, options);\r\n\r\n            canvasContext.restore();\r\n        }\r\n    },\r\n\r\n    /**\r\n     * Update scene\r\n     *\r\n     * @param sliderContext\r\n     * @param canvasContext\r\n     * @param gridContext\r\n     * @param options\r\n     */\r\n    updateScene: function(sliderContext, canvasContext, gridContext, options) {\r\n        this.drawGrid(gridContext, options);\r\n        this.drawAxes(canvasContext, options);\r\n        this.drawCharts(sliderContext, canvasContext, options);\r\n\r\n        this.fpsInterval = 1000 / options.fps;\r\n        this.then = Date.now();\r\n        this.animate(sliderContext, canvasContext, gridContext, options);\r\n    },\r\n\r\n    /**\r\n     * Get x axis coordinates\r\n     *\r\n     * @param {Object} columns\r\n     * @param {Object} types\r\n     * @returns {Array}\r\n     */\r\n    getXAxisData: function(columns, types) {\r\n        for (let i = 0; i < columns.length; i++) {\r\n            const key = columns[i][0];\r\n            if (types[key] === TChart.types.xAxis) {\r\n                return columns[i].slice(1, columns[i].length);\r\n            }\r\n        }\r\n    },\r\n\r\n    /**\r\n     * Get charts data\r\n     *\r\n     * @param data\r\n     * @returns {Array<TChart.Chart>}\r\n     */\r\n    getCharts: function(data) {\r\n        const columns = data[\"columns\"],\r\n            types = data[\"types\"],\r\n            names = data[\"names\"],\r\n            colors = data[\"colors\"];\r\n\r\n        const xAxis = this.getXAxisData(columns, types);\r\n        const charts = [];\r\n\r\n        for (let i = 0; i < columns.length; i++) {\r\n\r\n            const key = columns[i][0];\r\n            const color = colors[key];\r\n            const name = names[key];\r\n\r\n            if (types[key] === TChart.types.yAxis) {\r\n\r\n                const yAxis = columns[i].slice(1, columns[i].length);\r\n\r\n                const points = [];\r\n\r\n                for (let j = 0; j < yAxis.length; j++) {\r\n\r\n                    const x = xAxis[j];\r\n                    const y = yAxis[j];\r\n\r\n                    points.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"](x, y));\r\n                }\r\n\r\n                charts.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"](points, color, name, true));\r\n            }\r\n        }\r\n\r\n        return charts;\r\n    },\r\n\r\n    /**\r\n     * Draw chart\r\n     *\r\n     * @param context\r\n     * @param points\r\n     * @param color\r\n     * @param active\r\n     * @param minY\r\n     * @param maxY\r\n     * @param options\r\n     */\r\n    drawChart: function(context, points, color, active, minY, maxY, options) {\r\n        context.beginPath();\r\n\r\n        const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\r\n        const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\r\n\r\n        for (let j = 0; j < points.length - 1; j++) {\r\n\r\n            const p1 = points[j];\r\n            const p2 = points[j+1];\r\n\r\n            const x1 = this.getRelativeCoordinate(p1.x, minX, maxX, context.canvas.width);\r\n            const x2 = this.getRelativeCoordinate(p2.x, minX, maxX, context.canvas.width);\r\n\r\n            const y1 = context.canvas.height - this.getRelativeCoordinate(p1.y, -options.canvasBottom, maxY, context.canvas.height);\r\n            const y2 = context.canvas.height - this.getRelativeCoordinate(p2.y, -options.canvasBottom, maxY, context.canvas.height);\r\n\r\n            context.moveTo(x1, y1);\r\n            context.lineTo(x2, y2);\r\n        }\r\n\r\n        context.closePath();\r\n\r\n        context.strokeStyle = color;\r\n        context.stroke();\r\n    },\r\n\r\n    /**\r\n     * Draw charts on canvas\r\n     *\r\n     * @param sliderContext\r\n     * @param canvasContext\r\n     * @param options\r\n     */\r\n    drawCharts: function(sliderContext, canvasContext, options) {\r\n        const charts = this.charts;\r\n\r\n        const allPoints = TChart.getChartsPoints(charts);\r\n\r\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(allPoints);\r\n\r\n        for (let i = 0; i < charts.length; i++) {\r\n\r\n            const chart = charts[i];\r\n            const points = TChart.getChartPoints(chart.points, this.x1, this.x2);\r\n\r\n            this.drawChart(sliderContext, chart.points, chart.color, chart.active, 0, maxY, options);\r\n            this.drawChart(canvasContext, points, chart.color, chart.active, 0, maxY, options);\r\n        }\r\n    },\r\n\r\n    /**\r\n     * Draw axes\r\n     *\r\n     * @param context\r\n     * @param options\r\n     */\r\n    drawAxes: function(context, options) {\r\n        const charts = this.charts;\r\n\r\n        const points = TChart.getChartsPointsFiltered(charts, this.x1, this.x2);\r\n\r\n        const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\r\n        const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\r\n        const minY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minY(points);\r\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(points);\r\n\r\n        this.drawXAxisTickMarks(context, minX, maxX, options);\r\n        this.drawYAxisTickMarks(context, minY, maxY, options);\r\n    },\r\n\r\n    /**\r\n     * Draw grid\r\n     *\r\n     * @param context\r\n     * @param options\r\n     */\r\n    drawGrid: function(context, options) {\r\n        const gridCount = options.gridCount;\r\n        const step = Math.round(context.canvas.height / gridCount);\r\n\r\n        for (let i = 0; i < gridCount; i++) {\r\n            context.moveTo(0, context.canvas.height - i * step - options.canvasBottom);\r\n            context.lineTo(context.canvas.width, context.canvas.height - i * step - options.canvasBottom);\r\n        }\r\n\r\n        context.strokeStyle = \"#555\";\r\n        context.lineWidth = 0.3;\r\n        context.stroke();\r\n    },\r\n\r\n    /**\r\n     * Draw X axis tick marks\r\n     *\r\n     * @param context\r\n     * @param minX\r\n     * @param maxX\r\n     * @param options\r\n     */\r\n    drawXAxisTickMarks: function(context, minX, maxX, options) {\r\n        context.font = options.font;\r\n\r\n        const gridCount = options.gridCount;\r\n        const step = Math.round(context.canvas.width / 6);\r\n\r\n        const stepValue = Math.round((maxX - minX) / gridCount);\r\n\r\n        for (let i = 0; i < gridCount; i++) {\r\n            const value = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"timestampToDate\"])(minX + stepValue * i);\r\n            context.fillText(value, i * step + 10, context.canvas.width - 5);\r\n        }\r\n    },\r\n\r\n    /**\r\n     * Draw y axis tick marks\r\n     *\r\n     * @param context\r\n     * @param minY\r\n     * @param maxY\r\n     * @param options\r\n     */\r\n    drawYAxisTickMarks: function(context, minY, maxY, options) {\r\n        context.font = options.font;\r\n\r\n        const gridCount = options.gridCount;\r\n        const step = Math.round(context.canvas.height / gridCount);\r\n\r\n        const stepValue = Math.round((maxY - minY) / gridCount);\r\n\r\n        for (let i = 0; i < gridCount; i++) {\r\n\r\n            let value = stepValue * i;\r\n\r\n            if (value > 1000) {\r\n                value = Math.round(value / 1000) + \"K\"\r\n            } else {\r\n                value = value + \"\";\r\n            }\r\n\r\n            context.fillText(value, 0, context.canvas.height - i * step - 25);\r\n        }\r\n    },\r\n\r\n    /**\r\n     * Draw checkboxes component\r\n     *\r\n     * @returns {HTMLElement}\r\n     */\r\n    drawCheckboxes: function(options) {\r\n        const container = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\")\r\n            .addClasses(\"wrap-legend\")\r\n            .setAttribute(\"height\", options.sliderHeight);\r\n\r\n        let self = this;\r\n        const charts = this.charts;\r\n\r\n        for (let i = 0; i < charts.length; i++) {\r\n\r\n            const chart = charts[i];\r\n            const checkboxID = ['t', chart.id].join(\"_\");\r\n\r\n            let checkbox = TChart.createCheckbox(checkboxID, chart.name, chart.color);\r\n\r\n            checkbox.onmousedown = function (e) {\r\n                if (e.button !== 0) return;\r\n\r\n                self.running = true;\r\n                self.alpha = 0;\r\n\r\n                const chartID = e.target.id.split('_')[1];\r\n                let targetChart = self.getChartByID(charts, chartID);\r\n\r\n                const targetCheckboxID = [self.id, chartID].join(\"_\");\r\n\r\n                const checked = document.getElementById(targetCheckboxID  + \"_input\").checked;\r\n                let span = document.getElementById(targetCheckboxID + \"_span\");\r\n\r\n                targetChart.active = !checked;\r\n\r\n                if (checked) {\r\n                    span.style.background = \"white\";\r\n                    span.style.border = \"2px solid \" + targetChart.color;\r\n                } else {\r\n                    span.style.background = targetChart.color;\r\n                }\r\n            };\r\n\r\n            checkbox.onmouseup = function() {\r\n                self.running = false;\r\n            };\r\n\r\n            container.append(checkbox);\r\n        }\r\n\r\n        return container;\r\n    },\r\n\r\n    /**\r\n     * Get relative coordinate of chart node\r\n     *\r\n     * @param value\r\n     * @param min\r\n     * @param max\r\n     * @param scale\r\n     * @returns {number}\r\n     */\r\n    getRelativeCoordinate: function(value, min, max, scale) {\r\n        return Math.round((value - min) / (max - min) * scale);\r\n    },\r\n\r\n    /**\r\n     * Get charts by ID\r\n     * @param charts\r\n     * @param id\r\n     * @returns {TChart.Chart}\r\n     */\r\n    getChartByID: function(charts, id) {\r\n        return charts.filter(c => c.id === id)[0];\r\n    }\r\n};\r\n\r\nTChart.getChartsPoints = function(charts) {\r\n    return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);\r\n};\r\n\r\nTChart.getChartsPointsFiltered = function(charts, x1, x2) {\r\n    const points = charts.map(c => c.points).reduce((a, b) => a.concat(b), []);\r\n    return TChart.getChartPoints(points, x1, x2);\r\n};\r\n\r\nTChart.getChartPoints = function(points, x1, x2) {\r\n    const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\r\n    const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\r\n\r\n    x1 = minX + (maxX - minX) * x1;\r\n    x2 = minX + (maxX - minX) * x2;\r\n\r\n    return points.filter(p => p.x >= x1 && p.x <= x2);\r\n};\r\n\r\nTChart.createCheckbox = function(id, title, color) {\r\n    let label = document.createElement(\"label\");\r\n\r\n    label.id = id + \"_label\";\r\n    label.innerText = title;\r\n    label.name = name;\r\n    label.className = \"container\";\r\n\r\n    let input = document.createElement(\"input\");\r\n\r\n    input.type = \"checkbox\";\r\n    input.id = id + \"_input\";\r\n    input.checked = true;\r\n\r\n    let span = document.createElement(\"span\");\r\n\r\n    span.className = \"checkmark\";\r\n    span.id = id + \"_span\";\r\n    span.style.backgroundColor = color;\r\n\r\n    label.appendChild(input);\r\n    label.appendChild(span);\r\n\r\n    return label;\r\n};\r\n\r\nTChart.getCoords = function(elem) {\r\n    const box = elem.getBoundingClientRect();\r\n\r\n    return {\r\n        top: box.top + pageYOffset,\r\n        left: box.left + pageXOffset,\r\n        width: box.width\r\n    };\r\n\r\n};\r\n\r\nTChart.loadOptions = function(options) {\r\n    options = options || {};\r\n    for (let k in TChart.defaults) {\r\n        if (!options.hasOwnProperty(k)) {\r\n            options[k] = TChart.defaults[k];\r\n        }\r\n    }\r\n    return options;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/core/tchart.js?");

/***/ }),

/***/ "./src/helpers/animate.js":
/*!********************************!*\
  !*** ./src/helpers/animate.js ***!
  \********************************/
/*! exports provided: animate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return animate; });\nconst animate = () => {\r\n    let lastTime = 0;\r\n    let currTime, timeToCall, id;\r\n    const vendors = ['ms', 'moz', 'webkit', 'o'];\r\n    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\r\n        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];\r\n        window.cancelAnimationFrame =\r\n            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];\r\n    }\r\n    if (!window.requestAnimationFrame) {\r\n        window.requestAnimationFrame = callback => {\r\n            currTime = Date.now();\r\n            timeToCall = Math.max(0, 16 - (currTime - lastTime));\r\n            id = window.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);\r\n            lastTime = currTime + timeToCall;\r\n            return id;\r\n        };\r\n    }\r\n    if (!window.cancelAnimationFrame) {\r\n        window.cancelAnimationFrame = id => clearTimeout(id);\r\n    }\r\n};\n\n//# sourceURL=webpack:///./src/helpers/animate.js?");

/***/ }),

/***/ "./src/helpers/array.js":
/*!******************************!*\
  !*** ./src/helpers/array.js ***!
  \******************************/
/*! exports provided: min, max */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return min; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return max; });\nconst min = array => Math.min.apply(null, array);\r\nconst max = array => Math.max.apply(null, array);\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/array.js?");

/***/ }),

/***/ "./src/helpers/dom.js":
/*!****************************!*\
  !*** ./src/helpers/dom.js ***!
  \****************************/
/*! exports provided: Dom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return Dom; });\nclass Dom {\r\n\r\n    static of(el) {\r\n        return new Dom(el);\r\n    }\r\n\r\n    static for(selector) {\r\n        return new Dom(document.querySelector(selector));\r\n    }\r\n\r\n    static from(tag) {\r\n        return new Dom(document.createElement(tag));\r\n    }\r\n\r\n    constructor(el) {\r\n        this._element = el;\r\n    }\r\n\r\n    get element() {\r\n        return this._element;\r\n    }\r\n\r\n    map(f) {\r\n        return Dom.of(f(this._element));\r\n    }\r\n\r\n    addClasses(...classes) {\r\n        return this.map(el => {\r\n            for (let cl of classes) {\r\n                if (typeof cl === 'string') {\r\n                    cl.split(' ').forEach(clazz => el.classList.add(clazz));\r\n                }\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    removeClasses(...classes) {\r\n        return this.map(el => {\r\n            for (let cl of classes) {\r\n                if (typeof cl === 'string') {\r\n                    cl.split(' ').forEach(clazz => el.classList.remove(clazz));\r\n                }\r\n            }\r\n            return el;\r\n        })\r\n    }\r\n\r\n    setAttribute(name, value) {\r\n        return this.map(el => {\r\n            el.setAttribute(name, value);\r\n            return el;\r\n        });\r\n    }\r\n\r\n    removeAttributes(...attrs) {\r\n        return this.map(el => {\r\n            if (attrs.length) {\r\n                for (let attr of attrs) {\r\n                    el.removeAttribute(attr);\r\n                }\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    setStyle(prop, value) {\r\n        return this.map(el => {\r\n            el.style.setProperty(prop, value);\r\n            return el;\r\n        })\r\n    }\r\n\r\n    forEach(fn) {\r\n        return this.map(el => {\r\n            [...el.children].forEach(fn);\r\n            return el;\r\n        });\r\n    }\r\n\r\n    setText(string) {\r\n        return this.map(el => {\r\n            if (string) {\r\n                el.appendChild(document.createTextNode(string));\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    pinTo(parent) {\r\n        return this.map(el => {\r\n           if (parent instanceof Dom) {\r\n               parent.element.appendChild(el);\r\n           } else {\r\n               parent.appendChild(el);\r\n           }\r\n           return el;\r\n        });\r\n    }\r\n\r\n    append(child) {\r\n        return this.map(el => {\r\n            if (child instanceof Dom) {\r\n                el.appendChild(child.element)\r\n            } else {\r\n                el.appendChild(child);\r\n            }\r\n            return el;\r\n        });\r\n    }\r\n\r\n    addEventListener(event, handler, options) {\r\n        return this.map(el => {\r\n            el.addEventListener(event, handler, options);\r\n            return el;\r\n        })\r\n    }\r\n\r\n    removeEventListener(event, handler, options) {\r\n        return this.map(el => {\r\n            el.removeEventListener(event, handler, options);\r\n            return el;\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/helpers/dom.js?");

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

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: animate, min, max, Dom, Exception, loadCss, loadJson, timestampToDate, touchHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animate */ \"./src/helpers/animate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return _animate__WEBPACK_IMPORTED_MODULE_0__[\"animate\"]; });\n\n/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ \"./src/helpers/array.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"min\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"max\"]; });\n\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/helpers/dom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__[\"Dom\"]; });\n\n/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exception */ \"./src/helpers/exception.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Exception\", function() { return _exception__WEBPACK_IMPORTED_MODULE_3__[\"Exception\"]; });\n\n/* harmony import */ var _loadCss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loadCss */ \"./src/helpers/loadCss.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadCss\", function() { return _loadCss__WEBPACK_IMPORTED_MODULE_4__[\"loadCss\"]; });\n\n/* harmony import */ var _loadJson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadJson */ \"./src/helpers/loadJson.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadJson\", function() { return _loadJson__WEBPACK_IMPORTED_MODULE_5__[\"loadJson\"]; });\n\n/* harmony import */ var _timeutil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./timeutil */ \"./src/helpers/timeutil.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timestampToDate\", function() { return _timeutil__WEBPACK_IMPORTED_MODULE_6__[\"timestampToDate\"]; });\n\n/* harmony import */ var _touchHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./touchHandler */ \"./src/helpers/touchHandler.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"touchHandler\", function() { return _touchHandler__WEBPACK_IMPORTED_MODULE_7__[\"touchHandler\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/helpers/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Chart\", function() { return Chart; });\nclass Chart {\r\n    constructor(points, color, name, active) {\r\n        this.points = points;\r\n        this.color = color;\r\n        this.name = name;\r\n        this.active = active;\r\n    };\r\n}\n\n//# sourceURL=webpack:///./src/models/chart.js?");

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