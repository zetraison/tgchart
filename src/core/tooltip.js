import {Dom, head, timestampToDate} from "../helpers";

export class Tooltip {
    constructor(parent, charts) {
        this.charts = charts;

        const x = head(charts[0].points.map(p => p.x));

        this._node = Dom.from('div').addClasses('tooltip')
            .setStyle('left', 0, 'px')
            .setStyle('opacity', 0)
            .pinTo(parent);

        this.dateNode = Dom.from('div').addClasses('date')
            .setText(timestampToDate(x))
            .pinTo(this._node);

        this.values = [];
        this.charts.forEach(chart => {
            const b = Dom.from('b').setText(chart.getY(x));

            const span = Dom.from('span')
                .append(b)
                .setText(chart.name)
                .setStyle('color', chart.color)
                .pinTo(this._node);

            this.values.push(span);
        });

        return this;
    }

    node() {
        return this._node;
    }

    update(left, x) {
        this.dateNode.empty().setText(timestampToDate(x));

        this.charts.forEach((chart, index) => {
            const span = this.values[index];

            span.empty();

            if (chart.visible) {
                span.append(Dom.from('b').setText(chart.getY(x)))
                    .setText(chart.name);
            }
        });

        this._node.setStyle('left', left, 'px');
    }
}