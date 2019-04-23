import {Dom, animate, max, min, first, last, linear, fraction, relative, setupCanvas} from '../helpers';
import {Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.parent = parent;

        this.charts = charts;
        this.minY = this.prevMinY = min(this.charts.filter(c => c.visible).map(c => c.minY()));
        this.maxY = this.prevMaxY = max(this.charts.filter(c => c.visible).map(c => c.maxY()));

        this.segments = this.getSegment(0.75, 1);
        this.segmentMinY = this.prevSegmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = this.prevSegmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.updateSegment = false;
        this.updateMinimap = false;
        this.updateCrosshair = false;

        this.createDom();
        this.addEventListeners();
        this.setContext();
        this.drawSegment();
        this.drawMinimap();
    }

    createDom() {
        this.wrap = Dom.from("div").addClasses("wrap");

        this.title = Dom.from('h2').setText(`Followers`);

        this.wrapChart = Dom.from('div').addClasses('wrap-chart');
        this.canvasSegment = Dom.from('canvas').pinTo(this.wrapChart);

        this.wrapControl = Dom.from('div').addClasses('wrap-control');
        this.canvasControl = Dom.from('canvas').pinTo(this.wrapControl);
        this.control = new Control(this.wrapControl, this.onControlChange.bind(this));

        this.wrapLegend = Dom.from('ul').addClasses('wrap-legend');
        this.charts.map(chart => new Checkbox(this.wrapLegend, chart, this.onCheckboxClick.bind(this)));

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

    setContext() {
        let {ctx, dpr} = setupCanvas(this.canvasSegment.element);
        this.ctxChart = ctx;
        this.dpr = dpr;
        this.ctxChart.setTransform(dpr, 0, 0, -dpr, 0, this.ctxChart.canvas.height);

        this.ctxControl = setupCanvas(this.canvasControl.element).ctx;
        this.ctxControl.setTransform(dpr, 0, 0, -dpr, 0, this.ctxControl.canvas.height);
    }

    clearMinimap() {
        this.ctxControl.clearRect(0, 0, this.ctxControl.canvas.width, this.ctxControl.canvas.height);
    }

    clearSegment() {
        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);
    }

    drawMinimap(progress) {
        if (progress === undefined) progress = 1;

        const min = this.prevMinY + (this.minY - this.prevMinY) * progress;
        const max = this.prevMaxY + (this.maxY - this.prevMaxY) * progress;

        this.charts.forEach(chart =>
            chart.drawLine(this.ctxControl, min, max, this.dpr, (chart.visible ? 1 : 1 - progress)));

        if (progress === 1) {
            this.prevMinY = this.minY;
            this.prevMaxY = this.maxY;
        }
    }

    drawSegment(progress) {
        if (progress === undefined) progress = 1;

        const min = this.prevSegmentMinY + (this.segmentMinY - this.prevSegmentMinY) * progress;
        const max = this.prevSegmentMaxY + (this.segmentMaxY - this.prevSegmentMaxY) * progress;

        this.segments.forEach(segment =>
            segment.drawLine(this.ctxChart, min, max, this.dpr, (segment.visible ? 1 : 1 - progress)));

        if (progress === 1) {
            this.prevSegmentMinY = this.segmentMinY;
            this.prevSegmentMaxY = this.segmentMaxY;
        }
    }

    drawCrosshair(progress) {
        if (progress === undefined) progress = 1;

        const min = this.segmentMinY + (this.segmentMinY - this.prevSegmentMinY) * progress;
        const max = this.segmentMaxY + (this.segmentMaxY - this.prevSegmentMaxY) * progress;

        this.segments.forEach(segment => {
            if (segment.visible)
                segment.drawCrosshair(this.ctxChart,  this.x, min, max, this.dpr);
        });

        if (progress === 1) {
            this.prevSegmentMinY = this.segmentMinY;
            this.prevSegmentMaxY = this.segmentMaxY;
        }
    }

    update(anim) {
        const draw = progress => {
            progress = anim ? progress : 1;

            if (this.updateMinimap) {
                this.clearMinimap();
                this.drawMinimap(progress);
            }

            if (this.updateSegment || this.updateCrosshair)
                this.clearSegment();

            if (this.updateSegment)
                this.drawSegment(progress);

            if (this.updateCrosshair)
                this.drawCrosshair(progress);
        };

        animate({duration: 200, timing: linear, draw: draw});
    }

    onCheckboxClick(checked) {
        const chart = first(this.charts.filter(chart => chart.name === checked.name));
        chart.visible = checked.checked;
        const segment = first(this.segments.filter(segment => segment.name === checked.name));
        segment.visible = checked.checked;

        this.minY = min(this.charts.filter(c => c.visible).map(c => c.minY()));
        this.maxY = max(this.charts.filter(c => c.visible).map(c => c.maxY()));
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.updateSegment = true;
        this.updateMinimap = true;
        this.updateCrosshair = false;
        this.update(true);
    }

    onControlChange(left, right) {
        this.segments = this.getSegment(left, right);
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.updateSegment = true;
        this.updateMinimap = false;
        this.updateCrosshair = false;
        this.update(true);
    };

    onMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        const {left: wrapLeft, width: wrapWidth} = this.wrapChart.element.getBoundingClientRect();
        const {width: tooltipWidth} = this.tooltip.node().element.getBoundingClientRect();

        const xAxis = first(this.segments).points.map(p => p.x);
        const step = wrapWidth / (xAxis.length - 1);

        const index = Math.ceil((e.pageX - wrapLeft - 0.5 * step) / wrapWidth * (xAxis.length - 1));
        this.x = first(this.segments).points[index].x;

        let left = Math.round(relative(this.x, first(xAxis), last(xAxis)) * wrapWidth);

        if (left + tooltipWidth - 40 > wrapWidth)
            left = wrapWidth - tooltipWidth + 40;

        this.updateSegment = true;
        this.updateMinimap = false;
        this.updateCrosshair = true;
        this.update(false);

        this.tooltip.update(left, this.x);
        this.wrapChart.setStyle('cursor', 'crosshair');
    };

    onMouseOver(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltip.node().setStyle('opacity', 1);
    }

    ontMouseOut(e) {
        e.preventDefault();
        e.stopPropagation();

        this.updateSegment = true;
        this.updateMinimap = false;
        this.updateCrosshair = false;
        this.update();

        this.tooltip.node().setStyle('opacity', 0);
    }

    onWindowResize() {
        this.setContext();

        this.clearMinimap();
        this.drawMinimap();

        this.clearSegment();
        this.drawSegment();
    }
}