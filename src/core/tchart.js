import {Dom, setupCanvas} from '../helpers';
import {Point, Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.charts = charts;

        this.createDom(parent);
        this.resetContext();
        this.drawCharts();

        this.wrapChart.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        window.addEventListener('resize', this.onResize.bind(this), false);
    }

    createDom(parent) {
        // Create main wrap
        this.wrap = Dom.from("div").addClasses("wrap");
        // Create title
        const title = Dom.from('h2').setText(`Chart ${0}`);
        // Create chart
        this.wrapChart = Dom.from('div').addClasses('wrap-chart');
        this.canvasView = Dom.from('canvas').pinTo(this.wrapChart);
        // Create mini map with controls
        this.wrapControl = Dom.from('div').addClasses('wrap-control');
        this.canvasControl = Dom.from('canvas').pinTo(this.wrapControl);
        this.control = new Control(this.wrapControl, this.onControlChange.bind(this));
        // Create legend
        this.wrapLegend = Dom.from('ul').addClasses('wrap-legend');
        this.charts.forEach(chart => new Checkbox(this.wrapLegend, chart, this.onCheckboxClick.bind(this)));
        // Create tooltip
        this.tooltip = new Tooltip(this.wrap, this.charts);

        this.wrap
            .pinTo(parent)
            .append(title)
            .append(this.wrapChart)
            .append(this.wrapControl)
            .append(this.wrapLegend)
    }

    resetContext() {
        this.ctxChart = setupCanvas(this.canvasView.element).ctx;
        this.ctxControl = setupCanvas(this.canvasControl.element).ctx;
    }

    drawCharts() {
        const allPoints = Chart.getAllChartsPoints(this.charts);
        const minY = Point.minY(allPoints);
        const maxY = Point.maxY(allPoints);

        this.ctxChart.setTransform(1, 0, 0, 1, 0, 0);
        this.ctxControl.setTransform(1, 0, 0, 1, 0, 0);

        for (let i = 0; i < this.charts.length; i++) {
            const chart = this.charts[i];
            chart.draw(this.ctxChart, minY, maxY);
            chart.draw(this.ctxControl, minY, maxY);
        }
    }

    onCheckboxClick(checked) {
        console.log(checked);
    }

    onControlChange(l, r) {

        const charts = this.charts;

        charts.forEach(chart => {
            chart.points.filter(p => p.x)
        });

        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);
        this.ctxControl.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);
        this.drawCharts();

        // animate({
        //     duration: 16,
        //     timing: function(timeFraction) {
        //         return timeFraction;
        //     },
        //     draw: function(progress) {
        //         ctxChart.clearRect(0, 0, ctxChart.canvas.width, ctxChart.canvas.height);
        //
        //         ctxChart.setTransform(1 / (r - l), 0, 0, 1, -l * ctxChart.canvas.width, 0);
        //
        //         for (let i = 0; i < series.length; i++) {
        //             const chart = series[i];
        //             chart.draw(ctxChart, minY, maxY);
        //         }
        //     }
        // });
    };

    onMouseMove(e) {
        const {left: wL, width: wW} = this.wrapChart.element.getBoundingClientRect();
        const {width: tW} = this.tooltip.node.element.getBoundingClientRect();

        let tLeft = (e.pageX - wL > wW - tW) ? e.pageX - wL - tW : e.pageX - wL;
        this.tooltip.update(tLeft, 1542412800000);
    };

    onResize() {
        this.resetContext();
        this.drawCharts();
    }
}