import {TChart, ThemeButton} from './core';
import {getCharts} from './helpers/getCharts';
import {Dom, loadCss, loadJson} from './helpers';

const onCssLoad = () => {
    const body = Dom.for('body').addClasses('night');
    const wrapMain = Dom.from("div").addClasses("wrap-main").pinTo(body);

    const onDataLoad = charts => charts.forEach(chart => new TChart(wrapMain, getCharts(chart)));
    loadJson("data/chart_data.json", onDataLoad);

    new ThemeButton(body);
};

const onLoad = () => loadCss("./css/style.css", onCssLoad);
window.addEventListener('load', onLoad);