import {Dom} from "../helpers";

export class ThemeButton {
    constructor(parent) {

        this.button = Dom.from('a').addClasses('theme-switch')
            .setText('Switch to Day Mode')
            .pinTo(parent);

        this.button.addEventListener('click', this.onClick.bind(this, parent), true);
    }

    onClick(parent) {
        if (parent.hasClass('night')) {
            parent.removeClasses('night').addClasses('day');
            this.button.empty().setText('Switch to Night Mode');
        } else {
            parent.removeClasses('day').addClasses('night');
            this.button.empty().setText('Switch to Day Mode')
        }
    };
}