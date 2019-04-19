import {Dom, setupCanvas} from '../helpers';
import {Point, Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.charts = charts;
        this.segment = this.getSegment(0.75, 1);

        this.createDom(parent);
        this.addEventLiseners();
        this.setContext();
        this.drawCharts();
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

    addEventLiseners() {
        this.wrapChart.addEventListener('mousemove', this.onWrapChartMouseMove.bind(this), false);
        this.wrapChart.addEventListener('mouseover', this.onWrapChartMouseOver.bind(this), false);
        this.wrapChart.addEventListener('mouseout', this.onWrapChartMouseOut.bind(this), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    setContext() {
        this.ctxChart = setupCanvas(this.canvasView.element);
        this.ctxControl = setupCanvas(this.canvasControl.element);
        this.ctxChart.setTransform(1, 0, 0, -1, 0, this.ctxChart.canvas.height);
        this.ctxControl.setTransform(1, 0, 0, -1, 0, this.ctxControl.canvas.height);
    }

    drawCharts() {
        const allPoints = Chart.getAllChartsPoints(this.segment);
        const minY = Point.minY(allPoints);
        const maxY = Point.maxY(allPoints);

        for (let i = 0; i < this.segment.length; i++) {
            const segment = this.segment[i];
            segment.draw(this.ctxChart, minY, maxY);
        }

        const allSegmentPoints = Chart.getAllChartsPoints(this.charts);
        const segmentMinY = Point.minY(allSegmentPoints);
        const segmentMaxY = Point.maxY(allSegmentPoints);

        for (let i = 0; i < this.charts.length; i++) {
            const chart = this.charts[i];
            chart.draw(this.ctxControl, segmentMinY, segmentMaxY);
        }
    }

    getSegment(left, right) {
        const segment = [];
        this.charts.forEach(chart => {
            const copy = Object.assign(new Chart(), chart);

            const leftX = copy.points[0].x + (copy.points[copy.points.length - 1].x - copy.points[0].x) * left;
            const rightX = copy.points[0].x + (copy.points[copy.points.length - 1].x - copy.points[0].x) * right;

            copy.points = copy.points.filter(p => p.x >= leftX && p.x <= rightX);
            segment.push(copy);
        });
        return segment;
    }

    onCheckboxClick(checked) {}

    onControlChange(left, right) {
        this.segment = this.getSegment(left, right);

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

    onWrapChartMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        this.wrapChart.setStyle('cursor', 'crosshair');

        const {left: wL, width: wW} = this.wrapChart.element.getBoundingClientRect();
        const {width: tW} = this.tooltip.node().element.getBoundingClientRect();

        let x = e.pageX - wL;

        if (x >= wW - tW + 20) x = wW - tW + 20;
        if (x <= 20) x = 20;

        this.tooltip.update(x, 1542412800000);
    };

    onWrapChartMouseOver(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltip.node().setStyle('opacity', 1);
    }

    onWrapChartMouseOut(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltip.node().setStyle('opacity', 0);
    }

    onWindowResize() {
        this.setContext();
        this.drawCharts();
    }
}