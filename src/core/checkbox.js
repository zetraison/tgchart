import {Dom} from "../helpers";

export class Checkbox {
    constructor(parent, chart, onClicked) {

        this.parent = parent;

        this.check = Dom.from('i')
            .setStyle('background-color', chart.color)
            .setStyle('border-color', chart.color);

        this.box = Dom.from('li').addClasses('on')
            .append(this.check)
            .setText(chart.name)
            .pinTo(parent);

        this.box.addEventListener('click', this.onClick.bind(this, chart, onClicked), true);
        this.box.addEventListener('animationend', this.animationListener.bind(this), false);

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

    animationListener(e) {
        if (e.type.toLowerCase().indexOf("animationend") >= 0) {
            this.box.removeClasses('animation-shake');
        }
    }

    onClick(chart, onClicked) {
        if (this.isLastCheckedBox() && this.isChecked())
            return this.box.addClasses('animation-shake');

        this.isChecked()
            ? this.box.removeClasses('on').addClasses('off')
            : this.box.removeClasses('off').addClasses('on');

        onClicked({ name: chart.name, checked: this.isChecked()});
    };
}