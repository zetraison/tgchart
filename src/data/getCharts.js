import {Exception, head, tail} from "../helpers";
import {Chart, Point} from "../models";

const Types = {
    xAxis: "x",
    yAxis: "line"
};

function getXAxis(columns, types) {
    for (let i = 0; i < columns.length; i++) {
        const key = head(columns[i]);
        if (types[key] === Types.xAxis) {
            return tail(columns[i]);
        }
    }
}

export function getCharts(data) {
    // Validate input json data
    if (
        !data.hasOwnProperty('columns') ||
        !data.hasOwnProperty('types') ||
        !data.hasOwnProperty('names') ||
        !data.hasOwnProperty('colors')
    ) {
        throw new Exception('incorrect data')
    }

    const {columns, types, names, colors} = data;

    const xAxis = getXAxis(columns, types);
    const charts = [];

    for (let i = 0; i < columns.length; i++) {

        const key = head(columns[i]);
        const color = colors[key];
        const name = names[key];

        if (types[key] === Types.yAxis) {

            const yAxis = tail(columns[i]);

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
}