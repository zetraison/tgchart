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
    } else if (typeof define === "function") {
        if (define.amd) {} else {
            define(["tchart"], factory);
        }
    }
    else {
        window.TChart = factory();
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
            window.requestAnimationFrame = function(callback, element) {
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
        thumb: "thumb",
        comboboxPane: "comboboxPane"
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
            this.scale = 1;
            this.running = false;

            // Create UI
            var root = document.getElementById(id);

            var canvas = TChart.createCanvas(TChart.components.canvas, options.canvasWidth, options.canvasHeight);
            root.appendChild(canvas);

            var slider = TChart.createCanvas(TChart.components.slider, options.sliderWidth, options.sliderHeight);
            root.appendChild(slider);

            var canvasContext = canvas.getContext("2d");
            var sliderContext = slider.getContext("2d");

            var thumbs = this.drawThumbs(slider, options);
            root.appendChild(thumbs);

            var checkboxes = this.drawCheckboxes(options);
            root.appendChild(checkboxes);

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

                this.drawCharts(sliderContext, canvasContext, options);
            }
        },

        /**
         * Update sceen
         *
         * @param sliderContext
         * @param canvasContext
         * @param options
         */
        updateScene: function(sliderContext, canvasContext, options) {
            this.drawCharts(sliderContext, canvasContext, options);

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
         * Draw charts on canvas
         *
         * @param sliderContext
         * @param canvasContext
         * @param options
         */
        drawCharts: function(sliderContext, canvasContext, options) {
            canvasContext.save();

            sliderContext.clearRect(0, 0, sliderContext.canvas.width, sliderContext.canvas.height);
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

            canvasContext.scale(1 / this.scale, 1);

            var charts = this.charts.filter(c => c.active);

            var minX = TChart.getChartsLeftBorder(charts);
            var maxX = TChart.getChartsRightBorder(charts);
            var minY = TChart.getChartsMinExtremum(charts);
            var maxY = TChart.getChartsMaxExtremum(charts);

            for (var i = 0; i < charts.length; i++) {

                sliderContext.beginPath();
                canvasContext.beginPath();

                var chart = charts[i];

                sliderContext.strokeStyle = chart.color;
                canvasContext.strokeStyle = chart.color;

                for (var j = 0; j < chart.points.length - 1; j++) {

                    var p1 = chart.points[j];
                    var p2 = chart.points[j+1];

                    var x1 = this.getRelativeCoordinate(p1.x, minX, maxX, options.sliderWidth);
                    var x2 = this.getRelativeCoordinate(p2.x, minX, maxX, options.sliderWidth);
                    var y1 = sliderContext.canvas.height - this.getRelativeCoordinate(p1.y, minY, maxY, options.sliderHeight);
                    var y2 = sliderContext.canvas.height- this.getRelativeCoordinate(p2.y, minY, maxY, options.sliderHeight);

                    sliderContext.moveTo(x1, y1);
                    sliderContext.lineTo(x2, y2);

                    var y1 = canvasContext.canvas.height - this.getRelativeCoordinate(p1.y, minY, maxY, options.canvasWidth);
                    var y2 = canvasContext.canvas.height - this.getRelativeCoordinate(p2.y, minY, maxY, options.canvasHeight);

                    canvasContext.moveTo(x1, y1);
                    canvasContext.lineTo(x2, y2);
                }

                sliderContext.stroke();
                canvasContext.stroke();
            }

            canvasContext.restore();
        },

        drawThumbs: function (canvas, options) {
            var self = this;
            var container = TChart.createDivContainer("thumb-container", options.sliderWidth, options.sliderHeight);
            var leftThumb = TChart.createThumb(options.thumbWidth, options.thumbHeight, 0, 0);
            var rightThumb = TChart.createThumb(options.thumbWidth, options.thumbHeight, 0, options.sliderWidth - options.thumbWidth);

            var thumbs = [leftThumb, rightThumb];

            leftThumb.onmousedown = function(e) {
                self.running = true;

                var sliderCoords = TChart.getCoords(canvas);
                var leftThumbCoords = TChart.getCoords(leftThumb);
                var rigthThumbCoords = TChart.getCoords(rightThumb);

                var shiftX = e.pageX - leftThumbCoords.left;

                document.onmousemove = function(e) {
                    self.running = true;

                    var newLeft = e.pageX - shiftX - sliderCoords.left;
                    if (newLeft <= 0) {
                        newLeft = 0;
                    }
                    var rightEdge = rigthThumbCoords.left - rigthThumbCoords.width - leftThumbCoords.width;
                    if (newLeft >= rightEdge) {
                        newLeft = rightEdge;
                    }

                    console.log("rightEdge: " + rightEdge);
                    console.log("left: " + newLeft);

                    self.scale = (TChart.getCoords(rightThumb).left - TChart.getCoords(leftThumb).left) / options.sliderWidth;

                    leftThumb.style.left = newLeft + 'px';
                };

                document.onmouseup = function() {
                    self.running = false;
                    document.onmousemove = document.onmouseup = null;
                };

                return false;
            };

            rightThumb.onmousedown = function(e) {
                self.running = true;

                var sliderCoords = TChart.getCoords(canvas);
                var leftThumbCoords = TChart.getCoords(leftThumb);
                var rigthThumbCoords = TChart.getCoords(rightThumb);

                var shiftX = e.pageX - rigthThumbCoords.left + leftThumbCoords.width;

                document.onmousemove = function(e) {
                    self.running = true;

                    var newLeft = e.pageX - shiftX - sliderCoords.left;

                    var leftEdge = leftThumbCoords.left - sliderCoords.left;
                    if (newLeft <= leftEdge) {
                        newLeft = leftEdge;
                    }

                    var rightEdge = canvas.offsetWidth - leftThumb.offsetWidth - rightThumb.offsetWidth;
                    if (newLeft >= rightEdge) {
                        newLeft = rightEdge;
                    }

                    console.log("leftEdge: " + rightEdge);
                    console.log("rigth: " + newLeft);

                    self.scale = (TChart.getCoords(rightThumb).left - TChart.getCoords(leftThumb).left) / options.sliderWidth;

                    rightThumb.style.left = newLeft + 'px';
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

        drawCheckboxes: function(options) {
            var container = TChart.createDivContainer("checkboxContainer");

            var charts = this.charts;
            var self = this;

            for (var i = 0; i < charts.length; i++) {

                var chart = charts[i];

                var checkbox = TChart.createCheckbox(chart.id, chart.name, chart.color);

                checkbox.onmousedown = function (e) {
                    self.running = true;

                    var chartId = e.target.id.split('_')[1];
                    var chart = self.getChartByID(chartId);
                    if (chart) {
                        chart.active = !document.getElementById("input_" + chartId).checked;
                    }
                };

                checkbox.onmouseup = function(e) {
                    self.running = false;
                };

                container.appendChild(checkbox);
            }

            return container;
        },

        getChartByID: function(id) {
            var charts = this.charts;
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

    TChart.getChartsMinExtremum = function(charts) {
        return TChart.getMin(
            charts
                .map(c => c.points)
                .reduce((a, b) => a.concat(b), [])
                .map(p => p.y));
    };

    TChart.getChartsMaxExtremum = function(charts) {
        return TChart.getMax(
            charts
                .map(c => c.points)
                .reduce((a, b) => a.concat(b), [])
                .map(p => p.y));
    };

    TChart.getChartsLeftBorder = function(charts) {
        return TChart.getMin(
            charts
                .map(c => c.points)
                .reduce((a, b) => a.concat(b), [])
                .map(p => p.x));
    };

    TChart.getChartsRightBorder = function(charts) {
        return TChart.getMax(
            charts
                .map(c => c.points)
                .reduce((a, b) => a.concat(b), [])
                .map(p => p.x));
    };

    TChart.createCanvas = function(id, width, height) {
        var canvas = document.createElement("canvas");

        canvas.id = id;
        canvas.className = "canvas";
        canvas.width = width;
        canvas.height = height;

        return canvas;
    };

    TChart.createThumb = function(width, height, top, left) {
        var thumb = document.createElement("div");

        thumb.className = "thumb";
        thumb.style.width = width + "px";
        thumb.style.height = height + "px";
        thumb.style.top = top + "px";
        thumb.style.left = left + "px";

        return thumb;
    };

    TChart.createDivContainer = function(className, width, height) {
        var container = document.createElement("div");

        container.className = className;
        container.style.width = width + "px";
        container.style.height = height + "px";
        container.style.top = -height + "px";

        return container;
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
        input.checked = "checked";

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