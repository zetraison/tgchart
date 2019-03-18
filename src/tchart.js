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
        TChart.prototype.init(id, data, options);
        return this;
    };

    TChart.version = "0.1";

    TChart.defaults = {
        cssPath: "../src/css/style.css",
        canvasWidth: 400,
        canvasHeight: 400,

        sliderWidth: 400,
        sliderHeight: 40,

        thumbWidth: 10,
        thumbHeight: 50,
        thumbTop: -50,
        thumbLeft: 200,

        fps: 24
    };

    TChart.types = {
        xAxis: "x",
        yAxis: "line"
    };

    TChart.components = {
        canvas: "canvas",
        slider: "slider",
        thumbContainer: "thumb-container",
        thumb: "thumb",
        checkboxContainer: "checkbox-container"
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

            options = options || TChart.defaults;

            TChart.loadCSS(options);

            // Load chart data
            this.charts = this.getCharts(data);

            this.x1 = 0;
            this.x2 = 1;
            this.running = false;

            // Create UI
            var root = document.getElementById(id);

            var canvas = TChart.createCanvas(TChart.components.canvas, options.canvasWidth, options.canvasHeight);
            root.appendChild(canvas);

            var slider = TChart.createCanvas(TChart.components.slider, options.sliderWidth, options.sliderHeight);
            root.appendChild(slider);

            var thumbs = this.drawThumbs(slider, options);
            root.appendChild(thumbs);

            var checkboxes = this.drawCheckboxes();
            root.appendChild(checkboxes);

            var canvasContext = canvas.getContext("2d");
            var sliderContext = slider.getContext("2d");

            // Set main animation loop
            this.updateScene(sliderContext, canvasContext, options);

            return this;
        },

        /**
         * Main animation loop
         *
         * @param sliderContext
         * @param canvasContext
         * @param options
         */
        animate: function(sliderContext, canvasContext, options) {
            requestAnimationFrame(this.animate.bind(this, sliderContext, canvasContext, options));

            if (!this.running) return;

            // calc elapsed time since last loop
            this.now = Date.now();
            this.elapsed = this.now - this.then;

            // if enough time has elapsed, draw the next frame
            if (this.elapsed > this.fpsInterval) {

                // Get ready for next frame by setting then=now, but also adjust for your
                // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                this.then = this.now - (this.elapsed % this.fpsInterval);

                this.drawCharts(sliderContext, canvasContext);
            }
        },

        /**
         * Update scene
         *
         * @param sliderContext
         * @param canvasContext
         * @param options
         */
        updateScene: function(sliderContext, canvasContext, options) {
            this.drawCharts(sliderContext, canvasContext);

            this.fpsInterval = 1000 / options.fps;
            this.then = Date.now();
            this.animate(sliderContext, canvasContext, options);
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
         */
        drawChart: function(context, points, color) {
            context.beginPath();

            var minX = TChart.getMinXPoint(points);
            var maxX = TChart.getMaxXPoint(points);
            var minY = TChart.getMinExtremum(points);
            var maxY = TChart.getMaxExtremum(points);

            for (var j = 0; j < points.length - 1; j++) {

                var p1 = points[j];
                var p2 = points[j+1];

                var x1 = this.getRelativeCoordinate(p1.x, minX, maxX, context.canvas.width);
                var x2 = this.getRelativeCoordinate(p2.x, minX, maxX, context.canvas.width);

                var y1 = context.canvas.height - this.getRelativeCoordinate(p1.y, minY, maxY, context.canvas.height);
                var y2 = context.canvas.height - this.getRelativeCoordinate(p2.y, minY, maxY, context.canvas.height);

                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
            }

            context.strokeStyle = color;
            context.stroke();
        },

        /**
         * Draw charts on canvas
         *
         * @param sliderContext
         * @param canvasContext
         */
        drawCharts: function(sliderContext, canvasContext) {
            canvasContext.save();

            sliderContext.clearRect(0, 0, sliderContext.canvas.width, sliderContext.canvas.height);
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

            var charts = this.charts.filter(c => c.active);

            for (var i = 0; i < charts.length; i++) {

                var chart = charts[i];
                var points = TChart.getChartPoints(chart.points, this.x1, this.x2);

                this.drawChart(sliderContext, chart.points, chart.color);
                this.drawChart(canvasContext, points, chart.color);
            }
            canvasContext.restore();
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
            var container = TChart.createDiv(options.sliderWidth, options.sliderHeight, -options.sliderHeight, 0, TChart.components.thumbContainer);

            var thumbL = TChart.createDiv(options.thumbWidth, options.sliderHeight, 0, 0, TChart.components.thumb);
            var thumbR = TChart.createDiv(options.thumbWidth, options.sliderHeight, 0, options.sliderWidth - options.thumbWidth, TChart.components.thumb);

            var thumbs = [thumbL, thumbR];

            thumbL.onmousedown = function(e) {
                self.running = true;

                var sliderCoords = TChart.getCoords(canvas);
                var thumbLCoords = TChart.getCoords(thumbL);
                var thumbRCoords = TChart.getCoords(thumbR);

                var shiftX = e.pageX - thumbLCoords.left;

                document.onmousemove = function(e) {
                    self.running = true;

                    var newLeft = e.pageX - shiftX - sliderCoords.left;
                    if (newLeft <= 0) {
                        newLeft = 0;
                    }
                    var rightEdge = thumbRCoords.left - thumbRCoords.width - thumbLCoords.width;
                    if (newLeft >= rightEdge) {
                        newLeft = rightEdge;
                    }

                    thumbL.style.left = newLeft + 'px';

                    self.x1 = newLeft / (options.sliderWidth - 2 * options.thumbWidth);

                    console.log("left: " + newLeft, "rightEdge: " + rightEdge, "x1: " + self.x1);
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            thumbR.onmousedown = function(e) {
                self.running = true;

                var sliderCoords = TChart.getCoords(canvas);
                var thumbLCoords = TChart.getCoords(thumbL);
                var thumbRCoords = TChart.getCoords(thumbR);

                var shiftX = e.pageX - thumbRCoords.left + thumbLCoords.width;

                document.onmousemove = function(e) {
                    self.running = true;

                    var newLeft = e.pageX - shiftX - sliderCoords.left;

                    var leftEdge = thumbLCoords.left - sliderCoords.left;
                    if (newLeft <= leftEdge) {
                        newLeft = leftEdge;
                    }

                    var rightEdge = canvas.offsetWidth - thumbL.offsetWidth - thumbR.offsetWidth;
                    if (newLeft >= rightEdge) {
                        newLeft = rightEdge;
                    }

                    thumbR.style.left = newLeft + 'px';

                    self.x2 = newLeft / (options.sliderWidth - 2 * options.thumbWidth);

                    console.log("rigth: " + newLeft, "leftEdge: " + leftEdge, "x2: " + self.x2);
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            for (var i = 0; i < thumbs.length; i++) {
                var thumb = thumbs[i];

                thumb.ondragstart = function() {
                    self.running = true;
                    return false;
                };

                container.appendChild(thumb);
            }

            return container;
        },

        /**
         * Draw checkboxes component
         *
         * @returns {HTMLElement}
         */
        drawCheckboxes: function() {
            var container = TChart.createDiv(options.sliderWidth, options.sliderHeight, -options.sliderHeight + 15, 0, TChart.components.checkboxContainer);

            var self = this;
            var charts = this.charts;

            for (var i = 0; i < charts.length; i++) {

                var chart = charts[i];

                var checkbox = TChart.createCheckbox(chart.id, chart.name, chart.color);

                checkbox.onmousedown = function (e) {
                    self.running = true;

                    var id = e.target.id.split('_')[1];
                    var targetChart = self.getChartByID(charts, id);

                    if (targetChart) {
                        targetChart.active = !document.getElementById("input_" + id).checked;
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

    TChart.getChartsPoints = function(charts) {
        return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
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

    TChart.getChartPoints = function(points, x1, x2) {
        var minX = TChart.getMin(points.map(p => p.x));
        var maxX = TChart.getMax(points.map(p => p.x));

        x1 = minX + (maxX - minX) * x1;
        x2 = minX + (maxX - minX) * x2;

        return points.filter(p => p.x >= x1 && p.x <= x2);
    };

    TChart.createCanvas = function(id, width, height) {
        var canvas = document.createElement("canvas");

        canvas.id = id;
        canvas.className = "canvas";
        canvas.width = width;
        canvas.height = height;

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

    TChart.createCheckbox = function(id, title, color) {
        var label = document.createElement("label");

        label.id = "label_" + id;
        label.innerText = title;
        label.name = name;
        label.className = "container";

        var input = document.createElement("input");

        input.type = "checkbox";
        input.id = "input_" + id;
        input.checked = true;

        var span = document.createElement("span");

        span.className = "checkmark";
        span.id = "span_" + id;
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

    return TChart;
}));