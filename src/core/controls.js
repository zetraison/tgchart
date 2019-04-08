import {Dom, touchHandler} from "../helpers";

export class Control {
    constructor() {

        const omMouseDown = e => {
            e.preventDefault();

            const controlRect = control.element.getBoundingClientRect();
            const windowRect = window.element.getBoundingClientRect();

            const shiftX = Math.round(e.pageX - windowRect.left);

            const omMouseMove = e => {
                e.preventDefault();

                let cursor = Math.round(e.pageX - shiftX - controlRect.left);

                if (cursor < 0)
                    cursor = 0;
                if (cursor > controlRect.width - windowRect.width)
                    cursor = controlRect.width - windowRect.width;

                console.log(e.pageX, shiftX, cursor, controlRect.width - cursor);

                window.setStyle("width", windowRect.width + "px");
                overlayL.setStyle("width", cursor + "px");
                overlayR.setStyle("width", controlRect.width - cursor - windowRect.width + "px");

                return false;
            };

            const omMouseUp = e => {
                e.preventDefault();

                document.removeEventListener("mousemove", omMouseMove, true);
                document.removeEventListener("mouseup", omMouseUp, true);
            };

            document.addEventListener("mousemove", omMouseMove, true);
            document.addEventListener("mouseup", omMouseUp, true);
        };

        const overlayL = Dom.from("div").addClasses("overlay l")
            .setStyle("width", "75%");

        const overlayR = Dom.from("div").addClasses("overlay r");

        const window = Dom.from("div").addClasses("window")
            .addEventListener("touchstart", touchHandler, true)
            .addEventListener("touchmove", touchHandler, true)
            .addEventListener("touchend", touchHandler, true)
            .addEventListener("mousedown", omMouseDown, true)
            .setStyle("width", "25%");

       const control = Dom.from("div")
            .addClasses("control")
            .append(overlayL)
            .append(window)
            .append(overlayR);

        return Dom.from("div").addClasses("wrap-control")
            .append(control);
    }
}