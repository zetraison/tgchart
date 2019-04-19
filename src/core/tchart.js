import {Dom, setupCanvas} from '../helpers';
import {Point, Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.charts = charts;
        this.segments = this.getSegment(0.75, 1);

        this.minY = Point.minY(Chart.getAllChartsPoints(this.charts));
        this.maxY = Point.maxY(Chart.getAllChartsPoints(this.charts));
        this.segmentMinY = Point.minY(Chart.getAllChartsPoints(this.segments));
        this.segmentMaxY = Point.maxY(Chart.getAllChartsPoints(this.segments));

        this.createDom(parent);
        this.addEventListeners();
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

    addEventListeners() {
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
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            segment.draw(this.ctxChart, this.segmentMinY, this.segmentMaxY);
            segment.drawCrosshair(this.ctxChart, this.segmentMinY, this.segmentMaxY);
        }

        for (let i = 0; i < this.charts.length; i++) {
            const chart = this.charts[i];
            chart.draw(this.ctxControl, this.minY, this.maxY);
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

    onCheckboxClick(checked) {
        this.drawCharts();
    }

    onControlChange(left, right) {
        this.segments = this.getSegment(left, right);
        this.segmentMinY = Point.minY(Chart.getAllChartsPoints(this.segments));
        this.segmentMaxY = Point.maxY(Chart.getAllChartsPoints(this.segments));

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

        let left = Math.ceil(e.pageX - wL);

        if (left >= wW - tW + 20) left = wW - tW + 20;
        if (left <= 20) left = 20;

        const xAxis = this.segments[0].points;
        const index = Math.ceil((e.pageX - wL) / wW * (xAxis.length - 1));
        const index1 = Math.round((e.pageX - wL) / wW * (xAxis.length - 1) + 0.5);
        const x = this.segments[0].points[index].x;

        console.log(index, index1, index1 - index);

        if (index !== this.prevIndex) {
            this.tooltip.update(left, x);
        }

        this.prevIndex = Math.floor((e.pageX - wL) / wW * (xAxis.length - 1));
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