import {Dom, limit, touchHandler} from "../helpers";

export class Control {
    constructor(callback) {

        this.control = Dom.from("div").addClasses("control");
        this.overlayL = Dom.from("div").addClasses("overlay l");
        this.overlayR = Dom.from("div").addClasses("overlay r");
        this.window = Dom.from("div").addClasses("window")
            .addEventListener("touchstart", touchHandler, true)
            .addEventListener("touchmove", touchHandler, true)
            .addEventListener("touchend", touchHandler, true)
            .addEventListener("mousedown", this.onMouseDown.bind(this, callback), true);

        this.control
            .append(this.overlayL)
            .append(this.window)
            .append(this.overlayR);

        return this.control;
    }

    onMouseDown (callback, event) {
        event.preventDefault();

        const controlRect = this.control.element.getBoundingClientRect();
        const windowRect = this.window.element.getBoundingClientRect();

        const shiftX = Math.round(event.pageX - windowRect.left);

        const onMouseMove = e => {
            e.preventDefault();

            let min = 0;
            let max = controlRect.width - windowRect.width;
            let value = Math.round(e.pageX - shiftX - controlRect.left);

            const cursor = limit(value, min, max);

            const left = Math.round(cursor / controlRect.width * 100);
            const right = Math.round((cursor + windowRect.width) / controlRect.width * 100);

            this.window.setStyle("width", windowRect.width + "px");
            this.overlayL.setStyle("width", cursor + "px");
            this.overlayR.setStyle("width", controlRect.width - cursor - windowRect.width + "px");

            callback(left, right);
        };

        const onMouseUp = e => {
            e.preventDefault();

            document.removeEventListener("mousemove", onMouseMove, true);
            document.removeEventListener("mouseup", onMouseUp, true);
        };

        document.addEventListener("mousemove", onMouseMove, true);
        document.addEventListener("mouseup", onMouseUp, true);
    };
}