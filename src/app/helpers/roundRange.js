export function roundRange(y1, y2, cnt) {
    const calc = function(d) {
        const power = curPower * d;
        const min = Math.floor(y1 / power) * power;
        const max = min + cnt * Math.ceil((y2 - min) * scale / power) * power;

        return {
            good: max <= maxLevel && min >= minLevel,
            yMin: Math.round(min),
            yMax: Math.round(max),
            yMinOrig: y1,
            yMaxOrig: y2,
        }
    };

    const scale = 1 / cnt;
    const step = (y2 - y1) * scale;
    let curPower = Math.max(Math.pow(10, Math.floor(Math.log10(step))), 1);
    const minLevel = y1 - step * 0.5;
    const maxLevel = y2 + step * 0.5;
    let range;

    while (true) {
        range = calc(5);
        if (range.good) break;
        range = calc(2);
        if (range.good) break;
        range = calc(1);
        if (range.good) break;
        curPower *= 0.1;
    }

    return range;
}