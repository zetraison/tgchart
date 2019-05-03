import {Point} from "./point";
import {Dom, first, relative, timestampToDate} from "../helpers";

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

    drawMinimapLine(ctx, minY, maxY, dpr, opacity) {
        const points = this.points;
        const minX = this.minX();
        const maxX = this.maxX();

        const width = ctx.canvas.width / dpr;
        const height = ctx.canvas.height / dpr;

        ctx.save();

        ctx.globalAlpha = opacity;
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";

        ctx.beginPath();
        for (let i = 0; i < points.length - 1; i++) {

            const p1 = points[i];
            const p2 = points[i+1];

            const x1 = Math.round(relative(p1.x, minX, maxX) * width);
            const x2 = Math.round(relative(p2.x, minX, maxX) * width);
            const y1 = Math.round(relative(p1.y, minY, maxY) * (height));
            const y2 = Math.round(relative(p2.y, minY, maxY) * (height));

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.closePath();

        ctx.stroke();
        ctx.restore();
    }

    drawLine(ctx, minY, maxY, dpr, opacity) {
        const points = this.points;
        const minX = this.minX();
        const maxX = this.maxX();

        const xAxisHeight = 25;

        const width = ctx.canvas.width / dpr;
        const height = ctx.canvas.height / dpr;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (let i = 0; i < points.length - 1; i++) {

            const p1 = points[i];
            const p2 = points[i+1];

            const x1 = Math.round(relative(p1.x, minX, maxX) * width);
            const x2 = Math.round(relative(p2.x, minX, maxX) * width);
            const y1 = xAxisHeight + Math.round(relative(p1.y, minY, maxY) * (height - xAxisHeight - 1));
            const y2 = xAxisHeight + Math.round(relative(p2.y, minY, maxY) * (height - xAxisHeight - 1));

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

            this.drawXTick(ctx, x1 - 15, height - 8, i, timestampToDate(p1.x), dpr)
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    drawXTick(ctx, x, y, index, text, dpr) {
        const scale = Math.floor(this.points.length / 6);

        ctx.font = "11px bold HelveticaNeue-Light,Helvetica,sans-serif";
        ctx.fillStyle = "#556778";

        if (index % scale === 0) {
            ctx.save();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillText(text, x, y);
            ctx.restore();
        }
    }

    drawCrosshair(ctx, x, minY, maxY, dpr) {
        const p = first(this.points.filter(p => p.x === x));
        if (!p) return;

        const minX = this.minX();
        const maxX = this.maxX();

        const width = ctx.canvas.width / dpr;
        const height = ctx.canvas.height / dpr;

        let lineX = Math.round(relative(p.x, minX, maxX) * width);

        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, height);
        ctx.closePath();

        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 0.1;
        ctx.stroke();

        const arcX = Math.round(relative(p.x, minX, maxX) * (width));
        const arcY = 25 + Math.round(relative(p.y, minY, maxY) * (height - 25));

        ctx.beginPath();
        ctx.arc(arcX, arcY, 5, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = Dom.for('body').hasClass('night') ? '#242f3e' : '#fff';
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}