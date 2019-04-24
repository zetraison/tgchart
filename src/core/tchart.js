import {Dom, animate, max, min, first, last, linear, fraction, relative, setupCanvas, roundRange} from '../helpers';
import {Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.parent = parent;

        this.gridCount = 6;

        this.charts = charts;
        this.minY = this.prevMinY = min(this.charts.filter(c => c.visible).map(c => c.minY()));
        this.maxY = this.prevMaxY = max(this.charts.filter(c => c.visible).map(c => c.maxY()));

        this.segments = this.getSegment(0.75, 1);
        this.segmentMinY = this.prevSegmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = this.prevSegmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));

        this.roundRange = roundRange(this.segmentMinY, this.segmentMaxY , this.gridCount);

        const options = {
            segment: { update: true, animate: true, alphaOff: false },
            minimap: { update: true, animate: true },
            crosshair: { update: false, animate: true },
            grid: { update: true, animate: true },
            yAxis: { update: true, animate: true }
        };

        this.createDom();
        this.addEventListeners();
        this.setContext();
        this.drawSegment(1, options.segment);
        this.drawGrid(1, options.grid);
        this.drawYAxisTickMarks(1, options.yAxis);
        this.drawMinimap(1, options.minimap);
    }

    createDom() {
        this.wrap = Dom.from("div").addClasses("wrap");

        this.title = Dom.from('h2').setText(`Followers`);

        this.wrapChart = Dom.from('div').addClasses('wrap-chart');
        this.canvasSegment = Dom.from('canvas').pinTo(this.wrapChart);

        this.wrapControl = Dom.from('div').addClasses('wrap-control');
        this.canvasControl = Dom.from('canvas').pinTo(this.wrapControl);
        this.control = new Control(this.wrapControl);

        this.wrapLegend = Dom.from('ul').addClasses('wrap-legend');
        this.checkboxes = this.charts.map(chart => new Checkbox(this.wrapLegend, chart));

        this.tooltip = new Tooltip(this.wrap, this.charts);

        this.wrap.pinTo(this.parent)
            .append(this.title)
            .append(this.wrapChart)
            .append(this.wrapControl)
            .append(this.wrapLegend)
    }

    addEventListeners() {
        this.control.addEventListener(this.onControlChange.bind(this));
        this.checkboxes.forEach(checkbox => checkbox.addEventListener(this.onCheckboxClick.bind(this)));
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

    drawMinimap(progress, options) {
        if (progress === undefined || !options.animate) {
            progress = 1;
        }

        const min = this.prevMinY + (this.minY - this.prevMinY) * progress;
        const max = this.prevMaxY + (this.maxY - this.prevMaxY) * progress;

        this.ctxControl.lineWidth = 1;

        this.charts.forEach(chart =>
            chart.drawLine(this.ctxControl, min, max, this.dpr, (chart.visible ? 1 : 1 - progress)));

        if (progress === 1) {
            this.prevMinY = this.minY;
            this.prevMaxY = this.maxY;
        }
    }

    drawSegment(progress, options) {
        if (progress === undefined || !options.animate) {
            progress = 1;
        }

        const min = this.prevSegmentMinY + (this.segmentMinY - this.prevSegmentMinY) * progress;
        const max = this.prevSegmentMaxY + (this.segmentMaxY - this.prevSegmentMaxY) * progress;

        this.ctxChart.lineWidth = 2;

        this.segments.forEach(segment => {
            const alpha = options.alphaOff && !segment.visible ? 0 : segment.visible ? 1 : 1 - progress;
            segment.drawLine(this.ctxChart, min, max, this.dpr, alpha);
        });

        if (progress === 1) {
            this.prevSegmentMinY = this.segmentMinY;
            this.prevSegmentMaxY = this.segmentMaxY;
        }
    }

    drawCrosshair(progress, options) {
        if (progress === undefined || !options.animate) {
            progress = 1;
        }

        const min = this.segmentMinY + (this.segmentMinY - this.prevSegmentMinY) * progress;
        const max = this.segmentMaxY + (this.segmentMaxY - this.prevSegmentMaxY) * progress;

        this.segments.forEach(segment => {
            if (segment.visible && this.x)
                segment.drawCrosshair(this.ctxChart, this.x, min, max, this.dpr);
        });

        if (progress === 1) {
            this.prevSegmentMinY = this.segmentMinY;
            this.prevSegmentMaxY = this.segmentMaxY;
        }
    }

    drawGrid(progress, options) {
        if (progress === undefined || !options.animate) {
            progress = 1;
        }

        const ctx = this.ctxChart;
        const width = ctx.canvas.width / this.dpr;
        const height = ctx.canvas.height / this.dpr;
        const step = Math.round(height / this.gridCount);

        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 0.2;

        ctx.beginPath();

        for (let i = 0; i < this.gridCount; i++) {
            ctx.moveTo(0, step * (i + progress));
            ctx.lineTo(width, step * (i + progress));
        }

        ctx.closePath();

        ctx.stroke();
    }

    drawYAxisTickMarks(progress, options) {
        if (progress === undefined || !options.animate) {
            progress = 1;
        }

        const ctx = this.ctxChart;

        const draw = () => {
            const height = ctx.canvas.height / this.dpr;
            const step = Math.round(height / this.gridCount);
            const roundRange = this.roundRange;

            ctx.font = "11px bold HelveticaNeue-Light,Helvetica,sans-serif";
            ctx.fillStyle = "#aaa";

            const stepValue = Math.round((roundRange.yMax - roundRange.yMin) / this.gridCount);

            for (let i = 0; i < this.gridCount; i++) {
                ctx.fillText(i * stepValue + "", 0, height - (i - 1 + progress) * step - 6);
            }
        };

        ctx.save();
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        draw();
        ctx.restore();
    }

    update(options) {

        const draw = progress => {
            if (options.minimap.update) {
                this.clearMinimap();
                this.drawMinimap(progress, options.minimap);
            }

            if (options.segment.update || options.crosshair.update || options.grid.update || options.yAxis.update)
                this.clearSegment();

            if (options.segment.update)
                this.drawSegment(progress, options.segment);

            if (options.crosshair.update)
                this.drawCrosshair(progress, options.crosshair);

            if (options.grid.update)
                this.drawGrid(progress, options.grid);

            if (options.yAxis.update)
                this.drawYAxisTickMarks(progress, options.yAxis);
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
        this.roundRange = roundRange(this.segmentMinY, this.segmentMaxY , this.gridCount);

        const options = {
            segment: { update: true, animate: true },
            minimap: { update: true, animate: true },
            crosshair: { update: false, animate: true },
            grid: { update: true, animate: true },
            yAxis: { update: true, animate: true }
        };
        this.update(options);
    }

    onControlChange(left, right) {
        this.segments = this.getSegment(left, right);
        this.segmentMinY = min(this.segments.filter(s => s.visible).map(s => s.minY()));
        this.segmentMaxY = max(this.segments.filter(s => s.visible).map(s => s.maxY()));
        this.roundRange = roundRange(this.segmentMinY, this.segmentMaxY , this.gridCount);

        const options = {
            segment: { update: true, animate: true, alphaOff: true },
            minimap: { update: false, animate: true },
            crosshair: { update: true, animate: true },
            grid: { update: true, animate: true },
            yAxis: { update: true, animate: true }
        };
        this.update(options);
    };

    onMouseMove(e) {

        const {left: wrapLeft, width: wrapWidth} = this.wrapChart.element.getBoundingClientRect();
        const {width: tooltipWidth} = this.tooltip.node().element.getBoundingClientRect();

        const xAxis = first(this.segments).points.map(p => p.x);
        const step = wrapWidth / (xAxis.length - 1);

        const index = Math.ceil((e.pageX - wrapLeft - 0.5 * step) / wrapWidth * (xAxis.length - 1));
        this.x = first(this.segments).points[index].x;

        let left = Math.round(relative(this.x, first(xAxis), last(xAxis)) * wrapWidth);

        if (left + tooltipWidth - 40 > wrapWidth)
            left = wrapWidth - tooltipWidth + 40;

        const options = {
            segment: { update: true, animate: true, alphaOff: true },
            minimap: { update: false, animate: false },
            crosshair: { update: true, animate: true },
            grid: { update: true, animate: false },
            yAxis: { update: true, animate: false }
        };
        this.update(options);

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

        this.x = null;

        const options = {
            segment: { update: true, animate: true, alphaOff: true },
            minimap: { update: false, animate: true },
            crosshair: { update: false, animate: true },
            grid: { update: true, animate: false },
            yAxis: { update: true, animate: false }
        };
        this.update(options);

        this.tooltip.node().setStyle('opacity', 0);
    }

    onWindowResize() {
        const options = {
            segment: { update: true, animate: true, alphaOff: false },
            minimap: { update: true, animate: true },
            crosshair: { update: false, animate: true },
            grid: { update: true, animate: true },
            yAxis: { update: true, animate: true }
        };

        this.setContext();
        this.clearMinimap();
        this.clearSegment();

        this.drawMinimap(1, options.minimap);
        this.drawSegment(1, options.segment);
        this.drawGrid(1, options.grid);
        this.drawYAxisTickMarks(1, options.yAxis);
    }
}