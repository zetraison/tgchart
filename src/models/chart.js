import {Point} from "./point";
import {relative} from "../helpers";

export class Chart {
    constructor(points, color, name, visible) {
        this.points = points;
        this.color = color;
        this.name = name;
        this.visible = visible;
    };

    minX() {
        return Point.minX(this.points);
    }

    maxX() {
        return Point.maxX(this.points);
    }

    minY() {
        return Point.minY(this.points);
    }

    maxY() {
        return Point.maxY(this.points);
    }

    getY(x) {
        const points = this.points.filter(p => p.x === x);
        return points.length > 0 ? points[0].y : NaN;
    }

    cropPoints(l, r) {
        const points = this.points;
        const minX = this.minX();
        const maxX = this.maxX();

        l = Math.round(minX + (maxX - minX) * l);
        r = Math.round(minX + (maxX - minX) * r);

        return points.filter(p => p.x >= l && p.x <= r);
    }

    draw(ctx, minY, maxY) {

        const points = this.points;
        const minX = this.minX();
        const maxX = this.maxX();

        ctx.beginPath();

        for (let i = 0; i < points.length - 1; i++) {

            const p1 = points[i];
            const p2 = points[i+1];

            const x1 = Math.round(relative(p1.x, minX, maxX) * ctx.canvas.width);
            const x2 = Math.round(relative(p2.x, minX, maxX) * ctx.canvas.width);

            const y1 = ctx.canvas.height - Math.round(relative(p1.y, minY, maxY) * ctx.canvas.height);
            const y2 = ctx.canvas.height - Math.round(relative(p2.y, minY, maxY) * ctx.canvas.height);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }

        ctx.closePath();

        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.stroke();
    }

    static getAllChartsPoints(charts) {
        return charts.map(c => c.points).reduce((a, b) => a.concat(b), []);
    }
}