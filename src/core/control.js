import {Dom, limit, touchHandler} from "../helpers";

export class Control {
    constructor(parent, callback) {

        this.WINDOW_MIN_WIDTH = 25;
        this.WINDOW_BORDER_TOUCH_WIDTH = 10;

        this.node = Dom.from("div").addClasses("control");
        this.overlayL = Dom.from("div").addClasses("overlay l");
        this.overlayR = Dom.from("div").addClasses("overlay r");
        this.window = Dom.from("div").addClasses("window")
            .addEventListener("touchstart", touchHandler, true)
            .addEventListener("touchmove", touchHandler, true)
            .addEventListener("touchend", touchHandler, true)
            .addEventListener("mousedown", this.onMouseDown.bind(this, callback), true);

        this.node
            .append(this.overlayL)
            .append(this.window)
            .append(this.overlayR)
            .pinTo(parent);

        return this;
    }

    onMouseDown (callback, event) {
        event.preventDefault();

        const controlRect = this.node.element.getBoundingClientRect();
        const windowRect = this.window.element.getBoundingClientRect();
        const overlayLRect = this.overlayL.element.getBoundingClientRect();
        const overlayRRect = this.overlayR.element.getBoundingClientRect();

        const shiftX = Math.round(event.pageX - windowRect.left);

        const onMouseMove = e => {
            e.preventDefault();

            let min, max, cursor, left = 75, right = 100;
            let value = Math.round(e.pageX - shiftX - controlRect.left);

            if (shiftX > 0 && shiftX < this.WINDOW_BORDER_TOUCH_WIDTH) {

                min = 0;
                max = controlRect.width - overlayRRect.width - this.WINDOW_MIN_WIDTH;

                cursor = limit(value, min, max);

                this.overlayL.setStyle("width", cursor, "px");
                this.window.setStyle("width", controlRect.width - overlayRRect.width - cursor, "px");

                left = Math.round(cursor / controlRect.width * 100) / 100;
                right = Math.round((controlRect.width - overlayRRect.width) / controlRect.width * 100) / 100;
            } else if (shiftX > windowRect.width - this.WINDOW_BORDER_TOUCH_WIDTH && shiftX < windowRect.width) {

                min = overlayLRect.width + this.WINDOW_MIN_WIDTH;
                max = controlRect.width;

                cursor = limit(value + windowRect.width, min, max);

                this.overlayR.setStyle("width", controlRect.width - cursor, "px");
                this.window.setStyle("width", cursor - overlayLRect.width, "px");

                left = Math.round(overlayLRect.width / controlRect.width * 100) / 100;
                right = Math.round(cursor / controlRect.width * 100) / 100;
            } else {

                min = 0;
                max = controlRect.width - windowRect.width;

                cursor = limit(value, min, max);

                this.overlayL.setStyle("width", cursor, "px");
                this.overlayR.setStyle("width", controlRect.width - windowRect.width - cursor, "px");

                left = Math.round(cursor / controlRect.width * 100) / 100;
                right = Math.round((cursor + windowRect.width) / controlRect.width * 100) / 100;
            }

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