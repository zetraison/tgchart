import {Dom} from "../helpers";

export class Checkbox {
    constructor(parent, chart, onClicked) {

        const check = Dom.from('i')
            .setStyle('background-color', chart.color)
            .setStyle('border-color', chart.color);

        const box = Dom.from('li').addClasses('on')
            .append(check)
            .setText(chart.name)
            .pinTo(parent);

        box.addEventListener('click', this.onClick.bind(this, chart, onClicked), true);
    }

    onClick(chart, onClicked, e) {
        let target = e.target;
        if (target.tagName !== 'LI') {
            while (target.tagName !== 'LI')
                target = target.parentElement;
        }
        const box = Dom.of(target);

        const checked = box.hasClass('on');
        checked
            ? box.removeClasses('on').addClasses('off')
            : box.removeClasses('off').addClasses('on');

        onClicked({ name: chart.name, checked: !checked});
    };
}