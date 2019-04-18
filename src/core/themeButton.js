import {Dom} from "../helpers";

export class ThemeButton {
    constructor(parent) {

        const button = Dom.from('a').addClasses('theme-switch')
            .setText('Switch to Day Mode')
            .pinTo(parent);

        const onClick = () => {
            if (parent.hasClass('night')) {
                parent.removeClasses('night').addClasses('day');
                button.empty().setText('Switch to Night Mode');
            } else {
                parent.removeClasses('day').addClasses('night');
                button.empty().setText('Switch to Day Mode')
            }
        };

        button.addEventListener('click', onClick, true);
    }
}