export const touchHandler = event => {
    const touch = event.changedTouches[0];

    const simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[event.type],
        true,
        true,
        window, 1,
        touch.screenX,
        touch.screenY,
        touch.clientX,
        touch.clientY,
        false,
        false,
        false,
        false,
        0,
        null);

    touch.target.dispatchEvent(simulatedEvent);
};