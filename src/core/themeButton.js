import {Dom} from "../helpers";

export class ThemeButton {
    constructor(parent) {

        const button = Dom.from('a').addClasses('theme-switch')
            .setText('Switch to Night Mode')
            .pinTo(parent);

        const onClick = () =>
            parent.hasClass('night')
                ? parent.removeClasses('night').addClasses('day')
                : parent.removeClasses('day').addClasses('night');

        button.addEventListener('click', onClick, true);
    }
}