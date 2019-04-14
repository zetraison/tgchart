import {TChart, ThemeButton} from './core';
import {getCharts} from './data/getCharts';
import {Dom, loadCss, loadJson} from './helpers';


window.addEventListener('load', () => {
    loadCss("./css/style.css", () => {
        loadJson("data/chart_data.json", (chartsData) => {
            const body = Dom.for('body').addClasses('night');

            // Create main chart wrapper
            const wrapMain = Dom.from("div").addClasses("wrap-main").pinTo(body);

            chartsData.forEach(data => {
                // Load chart data
                const charts = getCharts(data);

                // Create chart and pin to main wrapper
                new TChart(wrapMain, charts);
            });

            new ThemeButton(body);
        });
    });
});