/*
 * TChart
 *
 * @file            tchart.js
 * @version         0.1
 * @description     Open source chart library.
 * @license         MIT License
 * @author          zetraison
 * {@link           https://github.com/zetraison/tchart}
 *
 */
;(function(factory) {
    "use strict";

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object")  {
        module.exports = factory;
    } else if (typeof define !== "function") {
        window.TChart = factory();
    } else {
        if (define.amd) {
        } else define(["tchart"], factory);
    }

}(function() {
    'use strict';

    // requestAnimationFrame polyfill
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    (function(){
        var lastTime = 0;
        var currTime, timeToCall, id;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
        {
            window.requestAnimationFrame = function(callback) {
                currTime = Date.now();
                timeToCall = Math.max(0, 16 - (currTime - lastTime));
                id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame)
        {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })();

    var TChart = function (id, data, options) {
        return this.init(id, data, options);
    };

    TChart.version = "0.1";

    TChart.defaults = {
        cssPath: "../css/style.css",
        canvasWidth: 400,
        canvasHeight: 400,
        canvasBottom: 20,

        sliderWidth: 400,
        sliderHeight: 40,

        thumbWidth: 6,

        gridCount: 6,

        font: "12px Arial",

        fps: 60
    };

    TChart.types = {
        xAxis: "x",
        yAxis: "line"
    };

    TChart.class = {
        canvas: "canvas",
        thumb: "thumb",
        thumbMiddle: "thumb-middle",
        thumbContainer: "thumb-container",
        checkboxContainer: "checkbox-container",
        grid: "grid"
    };

    TChart.prototype = {
        /**
         * Constructor
         *
         * @param id
         * @param {Object} data
         * @param {Object} options
         * @returns {TChart}
         */
        init: function(id, data, options) {
            if (
                !data.hasOwnProperty("columns") ||
                !data.hasOwnProperty("types") ||
                !data.hasOwnProperty("names") ||
                !data.hasOwnProperty("colors")
            ) {
                throw new TChart.Exception("incorrect data")
            }

            options = TChart.loadOptions(options);
            TChart.loadCSS(options);

            // Load chart data
            this.charts = this.getCharts(data);

            this.id = id;
            this.x1 = 0;
            this.x2 = 1;
            this.running = false;
            this.alpha = 0;
            this.delta = 0.05;

            // Create UI
            var root = document.getElementById(id);

            var chartCanvas = TChart.createCanvas(options.canvasWidth, options.canvasHeight, 0, 0);
            root.appendChild(chartCanvas);

            var sliderCanvas = TChart.createCanvas(options.sliderWidth, options.sliderHeight, 0, 0);
            root.appendChild(sliderCanvas);

            var gridCanvas = TChart.createCanvas(options.canvasWidth, options.canvasWidth, -options.canvasHeight - options.sliderHeight, 0);
            root.appendChild(gridCanvas);

            var thumbs = this.drawThumbs(sliderCanvas, options);
            root.appendChild(thumbs);

            var checkboxes = this.drawCheckboxes(options);
            root.appendChild(checkboxes);

            var canvasContext = chartCanvas.getContext("2d");
            var sliderContext = sliderCanvas.getContext("2d");
            var gridContext = gridCanvas.getContext("2d");

            // Set main animation loop
            this.updateScene(sliderContext, canvasContext, gridContext, options);

            return this;
        },

        /**
         * Main animation loop
         *
         * @param sliderContext
         * @param canvasContext
         * @param gridContext
         * @param options
         */
        animate: function(sliderContext, canvasContext, gridContext, options) {
            requestAnimationFrame(this.animate.bind(this, sliderContext, canvasContext, gridContext, options));

            if (!this.running) return;

            this.now = Date.now();
            this.elapsed = this.now - this.then;

            if (this.elapsed > this.fpsInterval) {

                this.then = this.now - (this.elapsed % this.fpsInterval);

                canvasContext.save();

                sliderContext.clearRect(0, 0, sliderContext.canvas.width, sliderContext.canvas.height);
                canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
                canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

                this.drawCharts(sliderContext, canvasContext, options);
                this.drawAxes(canvasContext, options);

                canvasContext.restore();
            }
        },

        /**
         * Update scene
         *
         * @param sliderContext
         * @param canvasContext
         * @param gridContext
         * @param options
         */
        updateScene: function(sliderContext, canvasContext, gridContext, options) {
            this.drawGrid(gridContext, options);
            this.drawAxes(canvasContext, options);
            this.drawCharts(sliderContext, canvasContext, options);

            this.fpsInterval = 1000 / options.fps;
            this.then = Date.now();
            this.animate(sliderContext, canvasContext, gridContext, options);
        },

        /**
         * Get x axis coordinates
         *
         * @param {Object} columns
         * @param {Object} types
         * @returns {Array}
         */
        getXAxisData: function(columns, types) {
            for (var i = 0; i < columns.length; i++) {
                var key = columns[i][0];
                if (types[key] === TChart.types.xAxis) {
                    return columns[i].slice(1, columns[i].length);
                }
            }
        },

        /**
         * Get charts data
         *
         * @param data
         * @returns {Array<TChart.Chart>}
         */
        getCharts: function(data) {
            var columns = data["columns"],
                types   = data["types"],
                names   = data["names"],
                colors  = data["colors"];

            var xAxis = this.getXAxisData(columns, types);

            var charts = [];

            for (var i = 0; i < columns.length; i++) {

                var key = columns[i][0];
                var color = colors[key];
                var name = names[key];

                if (types[key] === TChart.types.yAxis) {

                    var yAxis = columns[i].slice(1, columns[i].length);

                    let points = [];

                    for (var j = 0; j < yAxis.length; j++) {

                        var x = xAxis[j];
                        var y = yAxis[j];

                        points.push(new TChart.Point(x, y));
                    }

                    charts.push(new TChart.Chart(key, points, color, name, true));
                }
            }

            return charts;
        },

        /**
         * Draw chart
         *
         * @param context
         * @param points
         * @param color
         * @param active
         * @param minY
         * @param maxY
         * @param options
         */
        drawChart: function(context, points, color, active, minY, maxY, options) {
            context.beginPath();

            this.alpha += this.delta;

            var minX = TChart.getMinXPoint(points);
            var maxX = TChart.getMaxXPoint(points);

            for (var j = 0; j < points.length - 1; j++) {

                var p1 = points[j];
                var p2 = points[j+1];

                var x1 = this.getRelativeCoordinate(p1.x, minX, maxX, context.canvas.width);
                var x2 = this.getRelativeCoordinate(p2.x, minX, maxX, context.canvas.width);

                var y1 = context.canvas.height - this.getRelativeCoordinate(p1.y, -options.canvasBottom, maxY, context.canvas.height);
                var y2 = context.canvas.height - this.getRelativeCoordinate(p2.y, -options.canvasBottom, maxY, context.canvas.height);

                if (!active) {
                    y1 -= this.alpha * context.canvas.height;
                    y2 -= this.alpha * context.canvas.height;
                }

                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
            }

            context.strokeStyle = color;
            context.lineWidth = 1.5;
            context.stroke();
        },

        /**
         * Draw charts on canvas
         *
         * @param sliderContext
         * @param canvasContext
         * @param options
         */
        drawCharts: function(sliderContext, canvasContext, options) {
            var charts = this.charts;

            var allPoints = TChart.getChartsPoints(charts);

            var maxY = TChart.getMaxExtremum(allPoints);

            for (var i = 0; i < charts.length; i++) {

                var chart = charts[i];
                var points = TChart.getChartPoints(chart.points, this.x1, this.x2);

                this.drawChart(sliderContext, chart.points, chart.color, chart.active, 0, maxY, options);
                this.drawChart(canvasContext, points, chart.color, chart.active, 0, maxY, options);
            }
        },

        /**
         * Draw axes
         *
         * @param context
         * @param options
         */
        drawAxes: function(context, options) {
            var charts = this.charts;

            console.log('axes');

            var points = TChart.getChartsPointsFiltered(charts, this.x1, this.x2);

            var minX = TChart.getMinXPoint(points);
            var maxX = TChart.getMaxXPoint(points);
            var minY = TChart.getMinExtremum(points);
            var maxY = TChart.getMaxExtremum(points);

            this.drawXAxisTickMarks(context, minX, maxX, options);
            this.drawYAxisTickMarks(context, minY, maxY, options);
        },

        /**
         * Draw grid
         *
         * @param context
         * @param options
         */
        drawGrid: function(context, options) {
            var gridCount = options.gridCount;
            var step = Math.round(context.canvas.height / gridCount);

            for (var i = 0; i < gridCount; i++) {
                context.moveTo(0, context.canvas.height - i * step - options.canvasBottom);
                context.lineTo(context.canvas.width, context.canvas.height - i * step - options.canvasBottom);
            }

            context.strokeStyle = "#555";
            context.lineWidth = 0.3;
            context.stroke();
        },

        /**
         * Draw X axis tick marks
         *
         * @param context
         * @param minX
         * @param maxX
         * @param options
         */
        drawXAxisTickMarks: function(context, minX, maxX, options) {
            var gridCount = options.gridCount;
            var step = Math.round(context.canvas.width / 5);

            var stepValue = Math.round((maxX - minX) / gridCount);

            for (var i = 0; i < gridCount; i++) {
                var value = TChart.timestampToDate(minX + stepValue * i);
                context.fillText(value, i * step, context.canvas.width - 5);
            }
        },

        /**
         * Draw y axis tick marks
         *
         * @param context
         * @param minY
         * @param maxY
         * @param options
         */
        drawYAxisTickMarks: function(context, minY, maxY, options) {
            var gridCount = options.gridCount;
            var step = Math.round(context.canvas.height / gridCount);

            var stepValue = Math.round((maxY - minY) / gridCount);

            for (var i = 0; i < gridCount; i++) {

                var value = stepValue * i;

                if (value > 1000) {
                    value = Math.round(value / 1000) + "K"
                } else {
                    value = value + "";
                }

                context.fillText(value, 0, context.canvas.height - i * step - 25);
            }
        },

        /**
         * Draw slider thumbs
         *
         * @param canvas
         * @param options
         * @returns {HTMLElement}
         */
        drawThumbs: function (canvas, options) {
            var self = this;
            var slider = TChart.createDiv(
                options.sliderWidth,
                options.sliderHeight,
                - options.sliderHeight - options.canvasHeight,
                0,
                TChart.class.thumbContainer);

            var thumbM = TChart.createThumb(
                options.sliderHeight - 4,
                0,
                TChart.class.thumbMiddle);

            thumbM.style.width = "100%";

            var thumbL = TChart.createThumb(
                options.sliderHeight,
                0,
                TChart.class.thumb);


            thumbL.style.width = options.thumbWidth + "px";
            thumbL.style.left = "0%";

            var thumbR = TChart.createThumb(
                options.sliderHeight,
                0,
                TChart.class.thumb);

            thumbR.style.width = options.thumbWidth + "px";
            thumbR.style.left = "100%";

            thumbM.onmousedown = function(e) {
                self.running = true;

                var thumbMCoords = TChart.getCoords(thumbM);
                var sliderCoords = TChart.getCoords(slider);

                var shiftX = e.pageX - thumbMCoords.left;

                document.onmousemove = function(e) {
                    self.running = true;

                    var left = Math.round((e.pageX - shiftX - sliderCoords.left) / sliderCoords.width * 100);
                    var width = Math.round(thumbMCoords.width / options.sliderWidth * 100);

                    if (left <= 0) { left = 0; }
                    if (left >= 100 - width) { left = 100 - width; }

                    thumbM.style.left = left + '%';
                    thumbL.style.left = left + '%';
                    thumbR.style.left = left + width + '%';

                    self.x1 = left / 100;
                    self.x2 = (left + width) / 100;
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            thumbL.onmousedown = function(e) {
                self.running = true;

                var thumbLCoords = TChart.getCoords(thumbL);
                var sliderCoords = TChart.getCoords(slider);

                var shiftX = e.pageX - thumbLCoords.left;

                document.onmousemove = function(e) {
                    self.running = true;

                    var left = Math.round((e.pageX - shiftX - sliderCoords.left) / sliderCoords.width * 100);

                    if (left <= 0) { left = 0; }
                    if (left >= 100) { left = 100; }

                    thumbL.style.left = left + '%';
                    thumbM.style.left = left + '%';
                    thumbM.style.width = parseInt(thumbR.style.left.slice(0, thumbR.style.left.length - 1)) - left + '%';

                    self.x1 = left / 100;
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            thumbR.onmousedown = function(e) {
                self.running = true;

                var thumbRCoords = TChart.getCoords(thumbR);
                var sliderCoords = TChart.getCoords(slider);

                var shiftX = e.pageX - thumbRCoords.left;

                document.onmousemove = function(e) {
                    self.running = true;

                    var left = Math.round((e.pageX - shiftX - sliderCoords.left) / sliderCoords.width * 100);

                    if (left <= 0) { left = 0; }
                    if (left >= 100) { left = 100; }

                    thumbR.style.left = left + '%';
                    thumbM.style.width = left - parseInt(thumbL.style.left.slice(0, thumbL.style.left.length - 1)) + '%';

                    self.x2 = left / 100;
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            var thumbs = [thumbM, thumbL, thumbR];

            for (var i = 0; i < thumbs.length; i++) {
                var thumb = thumbs[i];

                thumb.ondragstart = function() {
                    self.running = true;
                    return false;
                };

                slider.appendChild(thumb);
            }

            return slider;
        },

        /**
         * Draw checkboxes component
         *
         * @returns {HTMLElement}
         */
        drawCheckboxes: function(options) {
            var container = TChart.createDiv(
                options.sliderWidth,
                options.sliderHeight,
                -options.sliderHeight - options.canvasHeight + 15,
                0,
                TChart.class.checkboxContainer);

            var self = this;
            var charts = this.charts;

            for (var i = 0; i < charts.length; i++) {

                var chart = charts[i];
                var checkboxID = [this.id, chart.id].join("_");

                var checkbox = TChart.createCheckbox(checkboxID, chart.name, chart.color);

                checkbox.onmousedown = function (e) {
                    if (e.button !== 0) return;

                    self.running = true;
                    self.alpha = 0;

                    var chartID = e.target.id.split('_')[1];
                    var targetChart = self.getChartByID(charts, chartID);

                    var targetCheckboxID = [self.id, chartID].join("_");

                    var checked = document.getElementById(targetCheckboxID  + "_input").checked;
                    var span = document.getElementById(targetCheckboxID + "_span");

                    targetChart.active = !checked;

                    if (checked) {
                        span.style.background = "white";
                        span.style.border = "2px solid " + targetChart.color;
                    } else {
                        span.style.background = targetChart.color;
                    }
                };

                checkbox.onmouseup = function() {
                    self.running = false;
                };

                container.appendChild(checkbox);
            }

            return container;
        },

        /**
         * Get relative coordinate of chart node
         *
         * @param value
         * @param min
         * @param max
         * @param scale
         * @returns {number}
         */
        getRelativeCoordinate: function(value, min, max, scale) {
            return Math.round((value - min) / (max - min) * scale);
        },

        /**
         * Get charts by ID
         * @param charts
         * @param id
         * @returns {TChart.Chart}
         */
        getChartByID: function(charts, id) {
            return charts.filter(c => c.id === id)[0];
        }
    };

    TChart.Point = function(x, y) {
        this.x = x;
        this.y = y;
    };

    TChart.Chart = function(id, points, color, name, active) {
        this.id = id;
        this.points = points;
        this.color = color;
        this.name = name;
        this.active = active;
    };

    TChart.getMin = function(array) {
        return Math.min.apply(null, array);
    };

    TChart.getMax = function(array) {
        return Math.max.apply(null, array);
    };

    TChart.getMinExtremum = function(points) {
        return TChart.getMin(points.map(p => p.y));
    };

    TChart.getMaxExtremum = function(points) {
        return TChart.getMax(points.map(p => p.y));
    };

    TChart.getMinXPoint = function(points) {
        return TChart.getMin(points.map(p => p.x));
    };

    TChart.getMaxXPoint = function(points) {
        return TChart.getMax(points.map(p => p.x));
    };

    TChart.getChartsPoints = function(charts) {
        return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
    };

    TChart.getChartsPointsFiltered = function(charts, x1, x2) {
        var points = charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
        return TChart.getChartPoints(points, x1, x2);
    };

    TChart.getChartPoints = function(points, x1, x2) {
        var minX = TChart.getMin(points.map(p => p.x));
        var maxX = TChart.getMax(points.map(p => p.x));

        x1 = minX + (maxX - minX) * x1;
        x2 = minX + (maxX - minX) * x2;

        return points.filter(p => p.x >= x1 && p.x <= x2);
    };

    TChart.createCanvas = function(width, height, top, left) {
        var canvas = document.createElement("canvas");

        canvas.className = "canvas";
        canvas.width = width;
        canvas.height = height;
        canvas.style.top = top + "px";
        canvas.style.left = left + "px";

        return canvas;
    };

    TChart.createDiv = function(width, height, top, left, className) {
        var elem = document.createElement("div");

        elem.className = className;
        elem.style.width = width + "px";
        elem.style.height = height + "px";
        elem.style.top = top + "px";
        elem.style.left = left + "px";

        return elem;
    };

    TChart.createThumb = function(height, top, className) {
        var elem = document.createElement("div");

        elem.className = className;
        elem.style.height = height + "px";
        elem.style.top = top + "px";

        return elem;
    };

    TChart.createCheckbox = function(id, title, color) {
        var label = document.createElement("label");

        label.id = id + "_label";
        label.innerText = title;
        label.name = name;
        label.className = "container";

        var input = document.createElement("input");

        input.type = "checkbox";
        input.id = id + "_input";
        input.checked = true;

        var span = document.createElement("span");

        span.className = "checkmark";
        span.id = id + "_span";
        span.style.backgroundColor = color;

        label.appendChild(input);
        label.appendChild(span);

        return label;
    };

    TChart.getCoords = function(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            width: box.width
        };

    };

    TChart.Exception = function(message) {
        this.message = message;
    };

    TChart.loadCSS = function(options, callback) {
        callback   = callback || function() {};

        var css = document.createElement("link");
        css.type = "text/css";
        css.rel = "stylesheet";
        css.onload = css.onreadystatechange = function() {
            callback();
        };

        css.href = options.cssPath;
        document.getElementsByTagName("head")[0].appendChild(css);
    };

    TChart.loadOptions = function(options) {
        options = options || {};
        for (var k in TChart.defaults) {
            if (!options.hasOwnProperty(k)) {
                options[k] = TChart.defaults[k];
            }
        }
        return options;
    };

    TChart.timestampToDate = function(timestamp) {
        var date = new Date(timestamp);

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var day = date.getDay();
        var month = date.getMonth();

        return monthNames[month] + " " + day;
    };

    return TChart;
}));