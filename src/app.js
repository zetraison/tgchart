import {TChart} from './core/tchart';
import {loadJson} from './helpers';

const options = {
    cssPath: "css/style.css",

    canvasWidth: 350,
    canvasHeight: 350,

    sliderWidth: 350,
    sliderHeight: 50
};

const drawCharts = arr => arr.forEach(data => document.body.appendChild(new TChart(data, options)));

// Entry point
loadJson("data.json", drawCharts);