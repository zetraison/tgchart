import {Dom, setupCanvas} from '../helpers';
import {Point, Chart} from '../models';
import {Control} from './control';
import {Checkbox} from './checkbox';
import {Tooltip} from './tooltip';

export class TChart {
    constructor(parent, charts) {
        this.charts = charts;
        // Create UI
        const wrap = Dom.from("div").addClasses("wrap").pinTo(parent);
        // Create title
        const title = Dom.from('h2').setText(`Chart ${0}`);
        // Create chart
        const wrapChart = Dom.from('div').addClasses('wrap-chart');
        const canvasChart = Dom.from('canvas').pinTo(wrapChart);
        // Create mini map with controls
        const wrapControl = Dom.from('div').addClasses('wrap-control');
        const canvasControl = Dom.from('canvas').pinTo(wrapControl);
        const control = new Control(wrapControl, this.onControlChange.bind(this));
        // Create legend
        const wrapLegend = Dom.from('ul').addClasses('wrap-legend');
        charts.forEach(chart => new Checkbox(wrapLegend, chart, this.onCheckboxClick.bind(this)));
        // Create tooltip
        const tooltip = new Tooltip(wrap, charts);

        wrap.append(title)
            .append(wrapChart)
            .append(wrapControl)
            .append(wrapLegend);

        // Drawing
        this.ctxChart = setupCanvas(canvasChart.element).ctx;
        this.ctxControl = setupCanvas(canvasControl.element).ctx;

        const allPoints = Chart.getAllChartsPoints(charts);
        const minY = Point.minY(allPoints);
        const maxY = Point.maxY(allPoints);

        this.ctxChart.setTransform(1, 0, 0, 1, 0, 0);
        for (let i = 0; i < charts.length; i++) {
            const chart = charts[i];

            chart.draw(this.ctxChart, minY, maxY);
            chart.draw(this.ctxControl, minY, maxY);
        }

        const {left, x: clientXOffset} = wrapChart.element.getBoundingClientRect();

        const onMouseMove = e => {
            tooltip.update(e.pageX - left, 1542412800000)
        };

        wrapChart.addEventListener('mousemove', onMouseMove, true);
    }

    onCheckboxClick(checked) {
        console.log(checked);
    }

    onControlChange(l, r) {
        console.log(l, r);

        const allPoints = Chart.getAllChartsPoints(this.charts);
        const minY = Point.minY(allPoints);
        const maxY = Point.maxY(allPoints);

        this.ctxChart.setTransform(1, 0, 0, 1, 0, 0);
        this.ctxChart.clearRect(0, 0, this.ctxChart.canvas.width, this.ctxChart.canvas.height);

        this.ctxChart.translate((r - l) * this.ctxChart.canvas.width, 0);
        this.ctxChart.scale(1 / (r - l), 1);
        this.ctxChart.translate(-(r - l) * this.ctxChart.canvas.width, 0);

        for (let i = 0; i < this.charts.length; i++) {
            const chart = this.charts[i];
            chart.draw(this.ctxChart, minY, maxY);
        }

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
}