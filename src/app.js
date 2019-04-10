import {TChart} from './core/tchart';
import {Dom, loadCss, loadJson} from './helpers';

const options = {
    canvasWidth: 350,
    canvasHeight: 350,

    sliderWidth: 350,
    sliderHeight: 50
};

const wrap = Dom.from("div")
    .addClasses("wrap-main'")
    .pinTo(document.body);

const drawCharts = arr => arr.forEach(data => wrap.append(new TChart(data, options)));

loadCss("css/style.css", () => loadJson("data.json", drawCharts));