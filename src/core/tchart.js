import {Dom, max, min, fraction, setupCanvas} from '../helpers';
import {Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.parent = parent;

        this.charts = charts;
        this.minY = min(this.charts.filter(c => c.visible).map(c => c.minY()));
        this.maxY = max(this.charts.filter(c => c.visible).map(c => c.maxY()));

        this.segments = this.getSegment(0.75, 1);
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.createDom();
        this.addEventListeners();
        this.setContext();
        this.drawSegment();
        this.drawMinimap();
    }

    createDom() {
        this.wrap = Dom.from("div").addClasses("wrap");

        this.title = Dom.from('h2').setText(`Chart ${0}`);

        this.wrapChart = Dom.from('div').addClasses('wrap-chart');
        this.canvasSegment = Dom.from('canvas').pinTo(this.wrapChart);

        this.wrapControl = Dom.from('div').addClasses('wrap-control');
        this.canvasControl = Dom.from('canvas').pinTo(this.wrapControl);
        this.control = new Control(this.wrapControl, this.onControlChange.bind(this));

        this.wrapLegend = Dom.from('ul').addClasses('wrap-legend');
        this.charts.forEach(chart => new Checkbox(this.wrapLegend, chart, this.onCheckboxClick.bind(this)));

        this.tooltip = new Tooltip(this.wrap, this.charts);

        this.wrap.pinTo(this.parent)
            .append(this.title)
            .append(this.wrapChart)
            .append(this.wrapControl)
            .append(this.wrapLegend)
    }

    addEventListeners() {
        this.wrapChart.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.wrapChart.addEventListener('mouseover', this.onMouseOver.bind(this), false);
        this.wrapChart.addEventListener('mouseout', this.ontMouseOut.bind(this), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    setContext() {
        let {ctx, dpr} = setupCanvas(this.canvasSegment.element);
        this.ctxChart = ctx;
        this.dpr = dpr;
        this.ctxChart.setTransform(dpr, 0, 0, -dpr, 0, this.ctxChart.canvas.height);

        this.ctxControl = setupCanvas(this.canvasControl.element).ctx;
        this.ctxControl.setTransform(dpr, 0, 0, -dpr, 0, this.ctxControl.canvas.height);
    }

    drawMinimap() {
        this.ctxControl.clearRect(0, 0, this.ctxControl.canvas.width, this.ctxControl.canvas.height);
        this.charts.forEach(chart =>
            chart.visible ? chart.drawLine(this.ctxControl, this.minY, this.maxY, this.dpr) : null);
    }

    drawSegment() {
        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);
        this.segments.forEach(segment =>
            segment.visible ? segment.drawLine(this.ctxChart, this.segmentMinY, this.segmentMaxY, this.dpr) : null);
    }

    getSegment(leftPct, rightPct) {

        const copy = chart => {
            const copyChart = Object.assign(new Chart(), chart);

            const leftX = fraction(copyChart.points.map(p => p.x), leftPct);
            const rightX = fraction(copyChart.points.map(p => p.x), rightPct);

            copyChart.points = copyChart.points.filter(p => p.x >= leftX && p.x <= rightX);

            return copyChart;
        };

        return this.charts.map(chart => copy(chart));
    }

    onCheckboxClick(checked) {
        const chart = this.charts.filter(chart => chart.name === checked.name)[0];
        chart.visible = checked.checked;
        const segment = this.segments.filter(segment => segment.name === checked.name)[0];
        segment.visible = checked.checked;

        this.minY = min(this.charts.filter(c => c.visible).map(c => c.minY()));
        this.maxY = max(this.charts.filter(c => c.visible).map(c => c.maxY()));
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.drawSegment();
        this.drawMinimap();
    }

    onControlChange(left, right) {
        this.segments = this.getSegment(left, right);
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.drawSegment();
        this.drawMinimap();
    };

    onMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        this.wrapChart.setStyle('cursor', 'crosshair');

        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);
        this.drawSegment();

        const {left: wL, width: wW} = this.wrapChart.element.getBoundingClientRect();
        const {width: tW} = this.tooltip.node().element.getBoundingClientRect();

        const xAxis = this.segments[0].points.map(p => p.x);

        const index = Math.ceil((e.pageX - wL) / wW * (xAxis.length - 1));
        const x = this.segments[0].points[index].x;

        const step = (x - xAxis[0]) / (xAxis[xAxis.length - 1] - xAxis[0]) * wW;

        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            segment.drawCrosshair(this.ctxChart, x, this.segmentMinY, this.segmentMaxY, this.dpr);
        }

        this.tooltip.update(step, x);
    };

    onMouseOver(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltip.node().setStyle('opacity', 1);
    }

    ontMouseOut(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltip.node().setStyle('opacity', 0);

        this.drawSegment();
    }

    onWindowResize() {
        this.setContext();
        this.drawMinimap();
        this.drawSegment();
    }
}