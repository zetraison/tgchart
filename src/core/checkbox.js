import {Dom} from "../helpers";

export class Checkbox {
    constructor(parent, chart) {

        this.parent = parent;
        this.chart = chart;

        this.check = Dom.from('i')
            .setStyle('background-color', chart.color)
            .setStyle('border-color', chart.color);

        this.box = Dom.from('li').addClasses('on')
            .append(this.check)
            .setText(chart.name)
            .pinTo(parent);

        return this;
    }

    isChecked() {
        return this.box.hasClass('on');
    }

    isLastCheckedBox() {
        let count = 0;
        this.box.element.parentNode.childNodes.forEach(c => {
            const classList = c.className.split(' ');
            if (classList.indexOf('on') > -1) count++;
        });
        return count === 1;
    }

    addEventListener(callback) {

        const animationListener = e => {
            if (e.type.toLowerCase().indexOf("animationend") >= 0) {
                this.box.removeClasses('animation-shake');
            }
        };

        const onClick = () => {
            if (this.isLastCheckedBox() && this.isChecked())
                return this.box.addClasses('animation-shake');

            this.isChecked()
                ? this.box.removeClasses('on').addClasses('off')
                : this.box.removeClasses('off').addClasses('on');

            callback({ name: this.chart.name, checked: this.isChecked()});
        };

        this.box.addEventListener('click', onClick, true);
        this.box.addEventListener('animationend', animationListener.bind(this), false);
    }
}