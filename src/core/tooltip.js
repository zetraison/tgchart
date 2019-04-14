import {Dom, timestampToDate} from "../helpers";

export class Tooltip {
    constructor(parent, charts) {
        this.charts = charts;

        const x = charts[0].points.map(p => p.x)[0];

        this.node = Dom.from('div').addClasses('tooltip')
            .setStyle('left', 0, 'px')
            .pinTo(parent);

        this.dateNode = Dom.from('div').addClasses('date')
            .setText(timestampToDate(x))
            .pinTo(this.node);

        this.values = [];
        this.charts.forEach(chart => {
            const b = Dom.from('b').setText(chart.getY(x));

            const span = Dom.from('span')
                .append(b)
                .setText(chart.name)
                .setStyle('color', chart.color)
                .pinTo(this.node);

            this.values.push(span);
        });

        return this;
    }

    update(left, x) {
        this.dateNode.empty().setText(timestampToDate(x));

        this.charts.forEach((chart, index) => {
            const span = this.values[index];

            span.empty()
                .append(Dom.from('b').setText(chart.getY(x)))
                .setText(chart.name);
        });

        this.node.setStyle('left', left, 'px');
    }
}