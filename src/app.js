import {TChart} from './core/tchart';
import {loadCss, loadJson} from './helpers';

const options = {
    canvasWidth: 350,
    canvasHeight: 350,

    sliderWidth: 350,
    sliderHeight: 50
};

const wrap = document.createElement('div');
wrap.className = 'wrap-main';
document.body.appendChild(wrap);

const drawCharts = arr => arr.forEach(data => wrap.appendChild(new TChart(data, options)));

loadCss("css/style.css", () => loadJson("data.json", drawCharts));