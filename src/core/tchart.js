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
import {Dom, Exception, timestampToDate} from '../helpers';
import {Point, Chart} from '../models';
import {Control} from './controls';

export const TChart = function (data, options) {
    return this.init(data, options);
};

TChart.version = "0.1";

TChart.defaults = {
    canvasWidth: 400,
    canvasHeight: 400,
    canvasBottom: 20,

    sliderWidth: 400,
    sliderHeight: 40,
    thumbWidth: 6,

    gridCount: 6,

    font: "11px Arial",

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
     * @param {Object} data
     * @param {Object} options
     * @returns {HTMLElement}
     */
    init: function(data, options) {
        if (
            !data.hasOwnProperty("columns") ||
            !data.hasOwnProperty("types") ||
            !data.hasOwnProperty("names") ||
            !data.hasOwnProperty("colors")
        ) {
            throw new Exception("incorrect data")
        }

        options = TChart.loadOptions(options);

        // Load chart data
        this.charts = this.getCharts(data);

        this.x1 = 0;
        this.x2 = 1;
        this.running = false;

        // Create UI
        const wrapChart = Dom.from("div").addClasses("wrap-chart");

        const chartCanvas = Dom.from("canvas").addClasses("chart")
            .setAttribute("width", 460)
            .setAttribute("height", 250);

        const gridCanvas = Dom.from("canvas").addClasses("grid")
            .setAttribute("width", 460)
            .setAttribute("height", 250);

        wrapChart
            .append(chartCanvas)
            .append(gridCanvas);

        const sliderCanvas = Dom.from("canvas").addClasses("canvas")
            .setAttribute("width", 460)
            .setAttribute("height", 70);

        let control = new Control((l, r) => console.log(l, r));

        const wrapControl = Dom.from("div").addClasses("wrap-control")
            .append(sliderCanvas)
            .append(control);

        const wrapLegend = this.drawCheckboxes(options);

        const canvasContext = chartCanvas.element.getContext("2d");
        const sliderContext = sliderCanvas.element.getContext("2d");
        const gridContext = gridCanvas.element.getContext("2d");

        const box = Dom.from("div").addClasses("wrap")
            .append(wrapChart)
            .append(wrapControl)
            .append(wrapLegend);

        this.updateScene(sliderContext, canvasContext, gridContext, options);

        return box.element;
    },

    onStep(left, right) {

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
        for (let i = 0; i < columns.length; i++) {
            const key = columns[i][0];
            if (types[key] === TChart.types.xAxis) {
                return columns[i].slice(1, columns[i].length);
            }
        }
    },

    /**
     * Get charts data
     *
     * @param data
     * @returns {Array<Chart>}
     */
    getCharts: function(data) {
        const columns = data["columns"],
            types = data["types"],
            names = data["names"],
            colors = data["colors"];

        const xAxis = this.getXAxisData(columns, types);
        const charts = [];

        for (let i = 0; i < columns.length; i++) {

            const key = columns[i][0];
            const color = colors[key];
            const name = names[key];

            if (types[key] === TChart.types.yAxis) {

                const yAxis = columns[i].slice(1, columns[i].length);

                const points = [];

                for (let j = 0; j < yAxis.length; j++) {

                    const x = xAxis[j];
                    const y = yAxis[j];

                    points.push(new Point(x, y));
                }

                charts.push(new Chart(points, color, name, true));
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

        const minX = Point.minX(points);
        const maxX = Point.maxX(points);

        for (let j = 0; j < points.length - 1; j++) {

            const p1 = points[j];
            const p2 = points[j+1];

            const x1 = this.getRelativeCoordinate(p1.x, minX, maxX, context.canvas.width);
            const x2 = this.getRelativeCoordinate(p2.x, minX, maxX, context.canvas.width);

            const y1 = context.canvas.height - this.getRelativeCoordinate(p1.y, -options.canvasBottom, maxY, context.canvas.height);
            const y2 = context.canvas.height - this.getRelativeCoordinate(p2.y, -options.canvasBottom, maxY, context.canvas.height);

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
        }

        context.closePath();

        context.strokeStyle = color;
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
        const charts = this.charts;

        const allPoints = TChart.getChartsPoints(charts);

        const maxY = Point.maxY(allPoints);

        for (let i = 0; i < charts.length; i++) {

            const chart = charts[i];
            const points = TChart.getChartPoints(chart.points, this.x1, this.x2);

            this.drawChart(sliderContext, chart.points, chart.color, chart.visible, 0, maxY, options);
            this.drawChart(canvasContext, points, chart.color, chart.visible, 0, maxY, options);
        }
    },

    /**
     * Draw axes
     *
     * @param context
     * @param options
     */
    drawAxes: function(context, options) {
        const charts = this.charts;

        const points = TChart.getChartsPointsFiltered(charts, this.x1, this.x2);

        const minX = Point.minX(points);
        const maxX = Point.maxX(points);
        const minY = Point.minY(points);
        const maxY = Point.maxY(points);

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
        const gridCount = options.gridCount;
        const step = Math.round(context.canvas.height / gridCount);

        for (let i = 0; i < gridCount; i++) {
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
        context.font = options.font;

        const gridCount = options.gridCount;
        const step = Math.round(context.canvas.width / 6);

        const stepValue = Math.round((maxX - minX) / gridCount);

        for (let i = 0; i < gridCount; i++) {
            const value = timestampToDate(minX + stepValue * i);
            context.fillText(value, i * step + 10, context.canvas.width - 5);
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
        context.font = options.font;

        const gridCount = options.gridCount;
        const step = Math.round(context.canvas.height / gridCount);

        const stepValue = Math.round((maxY - minY) / gridCount);

        for (let i = 0; i < gridCount; i++) {

            let value = stepValue * i;

            if (value > 1000) {
                value = Math.round(value / 1000) + "K"
            } else {
                value = value + "";
            }

            context.fillText(value, 0, context.canvas.height - i * step - 25);
        }
    },

    /**
     * Draw checkboxes component
     *
     * @returns {HTMLElement}
     */
    drawCheckboxes: function(options) {
        const container = Dom.from("div")
            .addClasses("wrap-legend")
            .setAttribute("height", options.sliderHeight);

        let self = this;
        const charts = this.charts;

        for (let i = 0; i < charts.length; i++) {

            const chart = charts[i];
            const checkboxID = ['t', chart.id].join("_");

            let checkbox = TChart.createCheckbox(checkboxID, chart.name, chart.color);

            checkbox.onmousedown = function (e) {
                if (e.button !== 0) return;

                self.running = true;
                self.alpha = 0;

                const chartID = e.target.id.split('_')[1];
                let targetChart = self.getChartByID(charts, chartID);

                const targetCheckboxID = [self.id, chartID].join("_");

                const checked = document.getElementById(targetCheckboxID  + "_input").checked;
                let span = document.getElementById(targetCheckboxID + "_span");

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

            container.append(checkbox);
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
     * @returns {Chart}
     */
    getChartByID: function(charts, id) {
        return charts.filter(c => c.id === id)[0];
    }
};

TChart.getChartsPoints = function(charts) {
    return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
};

TChart.getChartsPointsFiltered = function(charts, x1, x2) {
    const points = charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
    return TChart.getChartPoints(points, x1, x2);
};

TChart.getChartPoints = function(points, x1, x2) {
    const minX = Point.minX(points);
    const maxX = Point.maxX(points);

    x1 = minX + (maxX - minX) * x1;
    x2 = minX + (maxX - minX) * x2;

    return points.filter(p => p.x >= x1 && p.x <= x2);
};

TChart.createCheckbox = function(id, title, color) {
    let label = document.createElement("label");

    label.id = id + "_label";
    label.innerText = title;
    label.name = name;
    label.className = "container";

    let input = document.createElement("input");

    input.type = "checkbox";
    input.id = id + "_input";
    input.checked = true;

    let span = document.createElement("span");

    span.className = "checkmark";
    span.id = id + "_span";
    span.style.backgroundColor = color;

    label.appendChild(input);
    label.appendChild(span);

    return label;
};

TChart.getCoords = function(elem) {
    const box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        width: box.width
    };

};

TChart.loadOptions = function(options) {
    options = options || {};
    for (let k in TChart.defaults) {
        if (!options.hasOwnProperty(k)) {
            options[k] = TChart.defaults[k];
        }
    }
    return options;
};
