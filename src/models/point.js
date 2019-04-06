import {min, max} from "../helpers/array";

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    static minX(points) {
        return min(points.map(p => p.x));
    }

    static maxX(points) {
        return max(points.map(p => p.x));
    }

    static minY(points) {
        return min(points.map(p => p.y));
    }

    static maxY(points) {
        return max(points.map(p => p.y));
    }
}
