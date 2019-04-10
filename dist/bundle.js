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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_tchart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/tchart */ \"./src/core/tchart.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.js\");\n\n\n\nconst options = {\n    canvasWidth: 350,\n    canvasHeight: 350,\n\n    sliderWidth: 350,\n    sliderHeight: 50\n};\n\nconst wrap = _helpers__WEBPACK_IMPORTED_MODULE_1__[\"Dom\"].from(\"div\")\n    .addClasses(\"wrap-main'\")\n    .pinTo(document.body);\n\nconst drawCharts = arr => arr.forEach(data => wrap.append(new _core_tchart__WEBPACK_IMPORTED_MODULE_0__[\"TChart\"](data, options)));\n\nObject(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"loadCss\"])(\"css/style.css\", () => Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"loadJson\"])(\"data.json\", drawCharts));\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/core/controls.js":
/*!******************************!*\
  !*** ./src/core/controls.js ***!
  \******************************/
/*! exports provided: Control */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Control\", function() { return Control; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\n\nclass Control {\n    constructor(callback) {\n\n        this.control = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"control\");\n        this.overlayL = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay l\");\n        this.overlayR = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"overlay r\");\n        this.window = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"window\")\n            .addEventListener(\"touchstart\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\n            .addEventListener(\"touchmove\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\n            .addEventListener(\"touchend\", _helpers__WEBPACK_IMPORTED_MODULE_0__[\"touchHandler\"], true)\n            .addEventListener(\"mousedown\", this.onMouseDown.bind(this, callback), true);\n\n        this.control\n            .append(this.overlayL)\n            .append(this.window)\n            .append(this.overlayR);\n\n        return this.control;\n    }\n\n    onMouseDown (callback, event) {\n        event.preventDefault();\n\n        const controlRect = this.control.element.getBoundingClientRect();\n        const windowRect = this.window.element.getBoundingClientRect();\n\n        const shiftX = Math.round(event.pageX - windowRect.left);\n\n        const onMouseMove = e => {\n            e.preventDefault();\n\n            let min = 0;\n            let max = controlRect.width - windowRect.width;\n            let value = Math.round(e.pageX - shiftX - controlRect.left);\n\n            const cursor = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"limit\"])(value, min, max);\n\n            const left = Math.round(cursor / controlRect.width * 100);\n            const right = Math.round((cursor + windowRect.width) / controlRect.width * 100);\n\n            this.window.setStyle(\"width\", windowRect.width,\"px\");\n            this.overlayL.setStyle(\"width\", cursor, \"px\");\n            this.overlayR.setStyle(\"width\", controlRect.width - cursor - windowRect.width, \"px\");\n\n            callback(left, right);\n        };\n\n        const onMouseUp = e => {\n            e.preventDefault();\n\n            document.removeEventListener(\"mousemove\", onMouseMove, true);\n            document.removeEventListener(\"mouseup\", onMouseUp, true);\n        };\n\n        document.addEventListener(\"mousemove\", onMouseMove, true);\n        document.addEventListener(\"mouseup\", onMouseUp, true);\n    };\n}\n\n//# sourceURL=webpack:///./src/core/controls.js?");

/***/ }),

/***/ "./src/core/tchart.js":
/*!****************************!*\
  !*** ./src/core/tchart.js ***!
  \****************************/
/*! exports provided: TChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TChart\", function() { return TChart; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ \"./src/models/index.js\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ \"./src/core/controls.js\");\n/*\n * TChart\n *\n * @file            tchart.js\n * @version         0.1\n * @description     Open source chart library.\n * @license         MIT License\n * @author          zetraison\n * {@link           https://github.com/zetraison/tchart}\n *\n */\n\n\n\n\nconst TChart = function (data, options) {\n    return this.init(data, options);\n};\n\nTChart.version = \"0.1\";\n\nTChart.defaults = {\n    canvasWidth: 400,\n    canvasHeight: 400,\n    canvasBottom: 20,\n\n    sliderWidth: 400,\n    sliderHeight: 40,\n    thumbWidth: 6,\n\n    gridCount: 6,\n\n    font: \"11px Arial\",\n\n    fps: 60\n};\n\nTChart.types = {\n    xAxis: \"x\",\n    yAxis: \"line\"\n};\n\nTChart.class = {\n    canvas: \"canvas\",\n    thumb: \"thumb\",\n    thumbMiddle: \"thumb-middle\",\n    thumbContainer: \"thumb-container\",\n    checkboxContainer: \"checkbox-container\",\n    grid: \"grid\"\n};\n\nTChart.prototype = {\n    /**\n     * Constructor\n     *\n     * @param {Object} data\n     * @param {Object} options\n     * @returns {HTMLElement}\n     */\n    init: function(data, options) {\n        if (\n            !data.hasOwnProperty(\"columns\") ||\n            !data.hasOwnProperty(\"types\") ||\n            !data.hasOwnProperty(\"names\") ||\n            !data.hasOwnProperty(\"colors\")\n        ) {\n            throw new _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Exception\"](\"incorrect data\")\n        }\n\n        options = TChart.loadOptions(options);\n\n        // Load chart data\n        this.charts = this.getCharts(data);\n\n        this.x1 = 0;\n        this.x2 = 1;\n        this.running = false;\n\n        // Create UI\n        const wrapChart = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap-chart\");\n\n        const chartCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"chart\")\n            .setAttribute(\"width\", 460)\n            .setAttribute(\"height\", 250);\n\n        const gridCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"grid\")\n            .setAttribute(\"width\", 460)\n            .setAttribute(\"height\", 250);\n\n        wrapChart\n            .append(chartCanvas)\n            .append(gridCanvas);\n\n        const sliderCanvas = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"canvas\").addClasses(\"canvas\")\n            .setAttribute(\"width\", 460)\n            .setAttribute(\"height\", 70);\n\n        let control = new _controls__WEBPACK_IMPORTED_MODULE_2__[\"Control\"]((l, r) => console.log(l, r));\n\n        const wrapControl = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap-control\")\n            .append(sliderCanvas)\n            .append(control);\n\n        const wrapLegend = this.drawCheckboxes(options);\n\n        const canvasContext = chartCanvas.element.getContext(\"2d\");\n        const sliderContext = sliderCanvas.element.getContext(\"2d\");\n        const gridContext = gridCanvas.element.getContext(\"2d\");\n\n        const box = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\").addClasses(\"wrap\")\n            .append(wrapChart)\n            .append(wrapControl)\n            .append(wrapLegend);\n\n        this.updateScene(sliderContext, canvasContext, gridContext, options);\n\n        return box.element;\n    },\n\n    /**\n     * Main animation loop\n     *\n     * @param sliderContext\n     * @param canvasContext\n     * @param gridContext\n     * @param options\n     */\n    animate: function(sliderContext, canvasContext, gridContext, options) {\n        requestAnimationFrame(this.animate.bind(this, sliderContext, canvasContext, gridContext, options));\n\n        if (!this.running) return;\n\n        this.now = Date.now();\n        this.elapsed = this.now - this.then;\n\n        if (this.elapsed > this.fpsInterval) {\n\n            this.then = this.now - (this.elapsed % this.fpsInterval);\n\n            canvasContext.save();\n\n            sliderContext.clearRect(0, 0, sliderContext.canvas.width, sliderContext.canvas.height);\n            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);\n\n            this.drawCharts(sliderContext, canvasContext, options);\n            this.drawAxes(canvasContext, options);\n\n            canvasContext.restore();\n        }\n    },\n\n    /**\n     * Update scene\n     *\n     * @param sliderContext\n     * @param canvasContext\n     * @param gridContext\n     * @param options\n     */\n    updateScene: function(sliderContext, canvasContext, gridContext, options) {\n        this.drawGrid(gridContext, options);\n        this.drawAxes(canvasContext, options);\n        this.drawCharts(sliderContext, canvasContext, options);\n\n        this.fpsInterval = 1000 / options.fps;\n        this.then = Date.now();\n        this.animate(sliderContext, canvasContext, gridContext, options);\n    },\n\n    /**\n     * Get x axis coordinates\n     *\n     * @param {Object} columns\n     * @param {Object} types\n     * @returns {Array}\n     */\n    getXAxisData: function(columns, types) {\n        for (let i = 0; i < columns.length; i++) {\n            const key = columns[i][0];\n            if (types[key] === TChart.types.xAxis) {\n                return columns[i].slice(1, columns[i].length);\n            }\n        }\n    },\n\n    /**\n     * Get charts data\n     *\n     * @param data\n     * @returns {Array<Chart>}\n     */\n    getCharts: function(data) {\n        const columns = data[\"columns\"],\n            types = data[\"types\"],\n            names = data[\"names\"],\n            colors = data[\"colors\"];\n\n        const xAxis = this.getXAxisData(columns, types);\n        const charts = [];\n\n        for (let i = 0; i < columns.length; i++) {\n\n            const key = columns[i][0];\n            const color = colors[key];\n            const name = names[key];\n\n            if (types[key] === TChart.types.yAxis) {\n\n                const yAxis = columns[i].slice(1, columns[i].length);\n\n                const points = [];\n\n                for (let j = 0; j < yAxis.length; j++) {\n\n                    const x = xAxis[j];\n                    const y = yAxis[j];\n\n                    points.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"](x, y));\n                }\n\n                charts.push(new _models__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"](points, color, name, true));\n            }\n        }\n\n        return charts;\n    },\n\n    /**\n     * Draw chart\n     *\n     * @param context\n     * @param points\n     * @param color\n     * @param active\n     * @param minY\n     * @param maxY\n     * @param options\n     */\n    drawChart: function(context, points, color, active, minY, maxY, options) {\n        context.beginPath();\n\n        const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\n        const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\n\n        for (let j = 0; j < points.length - 1; j++) {\n\n            const p1 = points[j];\n            const p2 = points[j+1];\n\n            const x1 = this.getRelativeCoordinate(p1.x, minX, maxX, context.canvas.width);\n            const x2 = this.getRelativeCoordinate(p2.x, minX, maxX, context.canvas.width);\n\n            const y1 = context.canvas.height - this.getRelativeCoordinate(p1.y, -options.canvasBottom, maxY, context.canvas.height);\n            const y2 = context.canvas.height - this.getRelativeCoordinate(p2.y, -options.canvasBottom, maxY, context.canvas.height);\n\n            context.moveTo(x1, y1);\n            context.lineTo(x2, y2);\n        }\n\n        context.closePath();\n\n        context.strokeStyle = color;\n        context.stroke();\n    },\n\n    /**\n     * Draw charts on canvas\n     *\n     * @param sliderContext\n     * @param canvasContext\n     * @param options\n     */\n    drawCharts: function(sliderContext, canvasContext, options) {\n        const charts = this.charts;\n\n        const allPoints = TChart.getChartsPoints(charts);\n\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(allPoints);\n\n        for (let i = 0; i < charts.length; i++) {\n\n            const chart = charts[i];\n            const points = TChart.getChartPoints(chart.points, this.x1, this.x2);\n\n            this.drawChart(sliderContext, chart.points, chart.color, chart.visible, 0, maxY, options);\n            this.drawChart(canvasContext, points, chart.color, chart.visible, 0, maxY, options);\n        }\n    },\n\n    /**\n     * Draw axes\n     *\n     * @param context\n     * @param options\n     */\n    drawAxes: function(context, options) {\n        const charts = this.charts;\n\n        const points = TChart.getChartsPointsFiltered(charts, this.x1, this.x2);\n\n        const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\n        const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\n        const minY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minY(points);\n        const maxY = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxY(points);\n\n        this.drawXAxisTickMarks(context, minX, maxX, options);\n        this.drawYAxisTickMarks(context, minY, maxY, options);\n    },\n\n    /**\n     * Draw grid\n     *\n     * @param context\n     * @param options\n     */\n    drawGrid: function(context, options) {\n        const gridCount = options.gridCount;\n        const step = Math.round(context.canvas.height / gridCount);\n\n        for (let i = 0; i < gridCount; i++) {\n            context.moveTo(0, context.canvas.height - i * step - options.canvasBottom);\n            context.lineTo(context.canvas.width, context.canvas.height - i * step - options.canvasBottom);\n        }\n\n        context.strokeStyle = \"#555\";\n        context.lineWidth = 0.3;\n        context.stroke();\n    },\n\n    /**\n     * Draw X axis tick marks\n     *\n     * @param context\n     * @param minX\n     * @param maxX\n     * @param options\n     */\n    drawXAxisTickMarks: function(context, minX, maxX, options) {\n        context.font = options.font;\n\n        const gridCount = options.gridCount;\n        const step = Math.round(context.canvas.width / 6);\n\n        const stepValue = Math.round((maxX - minX) / gridCount);\n\n        for (let i = 0; i < gridCount; i++) {\n            const value = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"timestampToDate\"])(minX + stepValue * i);\n            context.fillText(value, i * step + 10, context.canvas.width - 5);\n        }\n    },\n\n    /**\n     * Draw y axis tick marks\n     *\n     * @param context\n     * @param minY\n     * @param maxY\n     * @param options\n     */\n    drawYAxisTickMarks: function(context, minY, maxY, options) {\n        context.font = options.font;\n\n        const gridCount = options.gridCount;\n        const step = Math.round(context.canvas.height / gridCount);\n\n        const stepValue = Math.round((maxY - minY) / gridCount);\n\n        for (let i = 0; i < gridCount; i++) {\n\n            let value = stepValue * i;\n\n            if (value > 1000) {\n                value = Math.round(value / 1000) + \"K\"\n            } else {\n                value = value + \"\";\n            }\n\n            context.fillText(value, 0, context.canvas.height - i * step - 25);\n        }\n    },\n\n    /**\n     * Draw checkboxes component\n     *\n     * @returns {HTMLElement}\n     */\n    drawCheckboxes: function(options) {\n        const container = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"Dom\"].from(\"div\")\n            .addClasses(\"wrap-legend\")\n            .setAttribute(\"height\", options.sliderHeight);\n\n        let self = this;\n        const charts = this.charts;\n\n        for (let i = 0; i < charts.length; i++) {\n\n            const chart = charts[i];\n            const checkboxID = ['t', chart.id].join(\"_\");\n\n            let checkbox = TChart.createCheckbox(checkboxID, chart.name, chart.color);\n\n            checkbox.onmousedown = function (e) {\n                if (e.button !== 0) return;\n\n                self.running = true;\n                self.alpha = 0;\n\n                const chartID = e.target.id.split('_')[1];\n                let targetChart = self.getChartByID(charts, chartID);\n\n                const targetCheckboxID = [self.id, chartID].join(\"_\");\n\n                const checked = document.getElementById(targetCheckboxID  + \"_input\").checked;\n                let span = document.getElementById(targetCheckboxID + \"_span\");\n\n                targetChart.active = !checked;\n\n                if (checked) {\n                    span.style.background = \"white\";\n                    span.style.border = \"2px solid \" + targetChart.color;\n                } else {\n                    span.style.background = targetChart.color;\n                }\n            };\n\n            checkbox.onmouseup = function() {\n                self.running = false;\n            };\n\n            container.append(checkbox);\n        }\n\n        return container;\n    },\n\n    /**\n     * Get relative coordinate of chart node\n     *\n     * @param value\n     * @param min\n     * @param max\n     * @param scale\n     * @returns {number}\n     */\n    getRelativeCoordinate: function(value, min, max, scale) {\n        return Math.round((value - min) / (max - min) * scale);\n    },\n\n    /**\n     * Get charts by ID\n     * @param charts\n     * @param id\n     * @returns {Chart}\n     */\n    getChartByID: function(charts, id) {\n        return charts.filter(c => c.id === id)[0];\n    }\n};\n\nTChart.getChartsPoints = function(charts) {\n    return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);\n};\n\nTChart.getChartsPointsFiltered = function(charts, x1, x2) {\n    const points = charts.map(c => c.points).reduce((a, b) => a.concat(b), []);\n    return TChart.getChartPoints(points, x1, x2);\n};\n\nTChart.getChartPoints = function(points, x1, x2) {\n    const minX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].minX(points);\n    const maxX = _models__WEBPACK_IMPORTED_MODULE_1__[\"Point\"].maxX(points);\n\n    x1 = minX + (maxX - minX) * x1;\n    x2 = minX + (maxX - minX) * x2;\n\n    return points.filter(p => p.x >= x1 && p.x <= x2);\n};\n\nTChart.createCheckbox = function(id, title, color) {\n    let label = document.createElement(\"label\");\n\n    label.id = id + \"_label\";\n    label.innerText = title;\n    label.name = name;\n    label.className = \"container\";\n\n    let input = document.createElement(\"input\");\n\n    input.type = \"checkbox\";\n    input.id = id + \"_input\";\n    input.checked = true;\n\n    let span = document.createElement(\"span\");\n\n    span.className = \"checkmark\";\n    span.id = id + \"_span\";\n    span.style.backgroundColor = color;\n\n    label.appendChild(input);\n    label.appendChild(span);\n\n    return label;\n};\n\nTChart.getCoords = function(elem) {\n    const box = elem.getBoundingClientRect();\n\n    return {\n        top: box.top + pageYOffset,\n        left: box.left + pageXOffset,\n        width: box.width\n    };\n\n};\n\nTChart.loadOptions = function(options) {\n    options = options || {};\n    for (let k in TChart.defaults) {\n        if (!options.hasOwnProperty(k)) {\n            options[k] = TChart.defaults[k];\n        }\n    }\n    return options;\n};\n\n\n//# sourceURL=webpack:///./src/core/tchart.js?");

/***/ }),

/***/ "./src/helpers/animate.js":
/*!********************************!*\
  !*** ./src/helpers/animate.js ***!
  \********************************/
/*! exports provided: animate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return animate; });\nconst animate = () => {\n    let lastTime = 0;\n    let currTime, timeToCall, id;\n    const vendors = ['ms', 'moz', 'webkit', 'o'];\n    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\n        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];\n        window.cancelAnimationFrame =\n            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];\n    }\n    if (!window.requestAnimationFrame) {\n        window.requestAnimationFrame = callback => {\n            currTime = Date.now();\n            timeToCall = Math.max(0, 16 - (currTime - lastTime));\n            id = window.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);\n            lastTime = currTime + timeToCall;\n            return id;\n        };\n    }\n    if (!window.cancelAnimationFrame) {\n        window.cancelAnimationFrame = id => clearTimeout(id);\n    }\n};\n\n//# sourceURL=webpack:///./src/helpers/animate.js?");

/***/ }),

/***/ "./src/helpers/array.js":
/*!******************************!*\
  !*** ./src/helpers/array.js ***!
  \******************************/
/*! exports provided: min, max */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return min; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return max; });\nconst min = array => Math.min.apply(null, array);\nconst max = array => Math.max.apply(null, array);\n\n\n\n//# sourceURL=webpack:///./src/helpers/array.js?");

/***/ }),

/***/ "./src/helpers/dom.js":
/*!****************************!*\
  !*** ./src/helpers/dom.js ***!
  \****************************/
/*! exports provided: Dom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return Dom; });\nclass Dom {\n\n    static of(el) {\n        return new Dom(el);\n    }\n\n    static for(selector) {\n        return new Dom(document.querySelector(selector));\n    }\n\n    static from(tag) {\n        return new Dom(document.createElement(tag));\n    }\n\n    constructor(el) {\n        this._element = el;\n    }\n\n    get element() {\n        return this._element;\n    }\n\n    map(f) {\n        return Dom.of(f(this._element));\n    }\n\n    addClasses(...classes) {\n        return this.map(el => {\n            for (let cl of classes) {\n                if (typeof cl === 'string') {\n                    cl.split(' ').forEach(clazz => el.classList.add(clazz));\n                }\n            }\n            return el;\n        });\n    }\n\n    removeClasses(...classes) {\n        return this.map(el => {\n            for (let cl of classes) {\n                if (typeof cl === 'string') {\n                    cl.split(' ').forEach(clazz => el.classList.remove(clazz));\n                }\n            }\n            return el;\n        })\n    }\n\n    setAttribute(name, value) {\n        return this.map(el => {\n            el.setAttribute(name, value);\n            return el;\n        });\n    }\n\n    removeAttributes(...attrs) {\n        return this.map(el => {\n            if (attrs.length) {\n                for (let attr of attrs) {\n                    el.removeAttribute(attr);\n                }\n            }\n            return el;\n        });\n    }\n\n    setStyle(prop, value, unit) {\n        return this.map(el => {\n            el.style.setProperty(prop, `${value}${unit}`);\n            return el;\n        })\n    }\n\n    forEach(fn) {\n        return this.map(el => {\n            [...el.children].forEach(fn);\n            return el;\n        });\n    }\n\n    setText(string) {\n        return this.map(el => {\n            if (string) {\n                el.appendChild(document.createTextNode(string));\n            }\n            return el;\n        });\n    }\n\n    pinTo(parent) {\n        return this.map(el => {\n           if (parent instanceof Dom) {\n               parent.element.appendChild(el);\n           } else {\n               parent.appendChild(el);\n           }\n           return el;\n        });\n    }\n\n    append(child) {\n        return this.map(el => {\n            if (child instanceof Dom) {\n                el.appendChild(child.element)\n            } else {\n                el.appendChild(child);\n            }\n            return el;\n        });\n    }\n\n    addEventListener(event, handler, options) {\n        return this.map(el => {\n            el.addEventListener(event, handler, options);\n            return el;\n        })\n    }\n\n    removeEventListener(event, handler, options) {\n        return this.map(el => {\n            el.removeEventListener(event, handler, options);\n            return el;\n        })\n    }\n}\n\n//# sourceURL=webpack:///./src/helpers/dom.js?");

/***/ }),

/***/ "./src/helpers/exception.js":
/*!**********************************!*\
  !*** ./src/helpers/exception.js ***!
  \**********************************/
/*! exports provided: Exception */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Exception\", function() { return Exception; });\nclass Exception {\n    constructor(message) {\n        this.message = message;\n    }\n}\n\n//# sourceURL=webpack:///./src/helpers/exception.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: animate, min, max, Dom, Exception, limit, loadCss, loadJson, timestampToDate, touchHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animate */ \"./src/helpers/animate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"animate\", function() { return _animate__WEBPACK_IMPORTED_MODULE_0__[\"animate\"]; });\n\n/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ \"./src/helpers/array.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"min\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return _array__WEBPACK_IMPORTED_MODULE_1__[\"max\"]; });\n\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/helpers/dom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__[\"Dom\"]; });\n\n/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exception */ \"./src/helpers/exception.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Exception\", function() { return _exception__WEBPACK_IMPORTED_MODULE_3__[\"Exception\"]; });\n\n/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./limit */ \"./src/helpers/limit.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"limit\", function() { return _limit__WEBPACK_IMPORTED_MODULE_4__[\"limit\"]; });\n\n/* harmony import */ var _loadCss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadCss */ \"./src/helpers/loadCss.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadCss\", function() { return _loadCss__WEBPACK_IMPORTED_MODULE_5__[\"loadCss\"]; });\n\n/* harmony import */ var _loadJson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loadJson */ \"./src/helpers/loadJson.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadJson\", function() { return _loadJson__WEBPACK_IMPORTED_MODULE_6__[\"loadJson\"]; });\n\n/* harmony import */ var _timeutil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./timeutil */ \"./src/helpers/timeutil.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timestampToDate\", function() { return _timeutil__WEBPACK_IMPORTED_MODULE_7__[\"timestampToDate\"]; });\n\n/* harmony import */ var _touchHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./touchHandler */ \"./src/helpers/touchHandler.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"touchHandler\", function() { return _touchHandler__WEBPACK_IMPORTED_MODULE_8__[\"touchHandler\"]; });\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/helpers/index.js?");

/***/ }),

/***/ "./src/helpers/limit.js":
/*!******************************!*\
  !*** ./src/helpers/limit.js ***!
  \******************************/
/*! exports provided: limit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"limit\", function() { return limit; });\nconst limit = (value, min, max) => value < min ? min : value > max ? max : value;\n\n//# sourceURL=webpack:///./src/helpers/limit.js?");

/***/ }),

/***/ "./src/helpers/loadCss.js":
/*!********************************!*\
  !*** ./src/helpers/loadCss.js ***!
  \********************************/
/*! exports provided: loadCss */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadCss\", function() { return loadCss; });\nconst loadCss = (path, callback) => {\n    callback   = callback || function() {};\n\n    const css = document.createElement(\"link\");\n    css.type = \"text/css\";\n    css.rel = \"stylesheet\";\n    css.onload = css.onreadystatechange = function() {\n        callback();\n    };\n\n    css.href = path;\n    document.getElementsByTagName(\"head\")[0].appendChild(css);\n};\n\n//# sourceURL=webpack:///./src/helpers/loadCss.js?");

/***/ }),

/***/ "./src/helpers/loadJson.js":
/*!*********************************!*\
  !*** ./src/helpers/loadJson.js ***!
  \*********************************/
/*! exports provided: loadJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadJson\", function() { return loadJson; });\nconst loadJson = (path, success, error) => {\n    const xhr = new XMLHttpRequest();\n    xhr.onreadystatechange = function()\n    {\n        if (xhr.readyState === XMLHttpRequest.DONE) {\n            if (xhr.status === 200) {\n                if (success)\n                    success(JSON.parse(xhr.responseText));\n            } else {\n                if (error)\n                    error(xhr);\n            }\n        }\n    };\n    xhr.open(\"GET\", path, true);\n    xhr.send();\n};\n\n//# sourceURL=webpack:///./src/helpers/loadJson.js?");

/***/ }),

/***/ "./src/helpers/timeutil.js":
/*!*********************************!*\
  !*** ./src/helpers/timeutil.js ***!
  \*********************************/
/*! exports provided: timestampToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timestampToDate\", function() { return timestampToDate; });\nconst timestampToDate = timestamp => {\n    const months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\n    const date = new Date(timestamp);\n\n    return `${months[date.getMonth()]} ${date.getDate()}`;\n};\n\n\n\n//# sourceURL=webpack:///./src/helpers/timeutil.js?");

/***/ }),

/***/ "./src/helpers/touchHandler.js":
/*!*************************************!*\
  !*** ./src/helpers/touchHandler.js ***!
  \*************************************/
/*! exports provided: touchHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"touchHandler\", function() { return touchHandler; });\nconst touchHandler = event => {\n    const touch = event.changedTouches[0];\n\n    const simulatedEvent = document.createEvent(\"MouseEvent\");\n    simulatedEvent.initMouseEvent({\n            touchstart: \"mousedown\",\n            touchmove: \"mousemove\",\n            touchend: \"mouseup\"\n        }[event.type],\n        true,\n        true,\n        window, 1,\n        touch.screenX,\n        touch.screenY,\n        touch.clientX,\n        touch.clientY,\n        false,\n        false,\n        false,\n        false,\n        0,\n        null);\n\n    touch.target.dispatchEvent(simulatedEvent);\n};\n\n//# sourceURL=webpack:///./src/helpers/touchHandler.js?");

/***/ }),

/***/ "./src/models/chart.js":
/*!*****************************!*\
  !*** ./src/models/chart.js ***!
  \*****************************/
/*! exports provided: Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Chart\", function() { return Chart; });\nclass Chart {\n    constructor(points, color, name, visible) {\n        this.points = points;\n        this.color = color;\n        this.name = name;\n        this.visible = visible;\n    };\n}\n\n//# sourceURL=webpack:///./src/models/chart.js?");

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! exports provided: Point, Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/models/point.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return _point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"]; });\n\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart */ \"./src/models/chart.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Chart\", function() { return _chart__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/models/index.js?");

/***/ }),

/***/ "./src/models/point.js":
/*!*****************************!*\
  !*** ./src/models/point.js ***!
  \*****************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony import */ var _helpers_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/array */ \"./src/helpers/array.js\");\n\n\nclass Point {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    };\n\n    static minX(points) {\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"min\"])(points.map(p => p.x));\n    }\n\n    static maxX(points) {\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"max\"])(points.map(p => p.x));\n    }\n\n    static minY(points) {\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"min\"])(points.map(p => p.y));\n    }\n\n    static maxY(points) {\n        return Object(_helpers_array__WEBPACK_IMPORTED_MODULE_0__[\"max\"])(points.map(p => p.y));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/models/point.js?");

/***/ })

/******/ });