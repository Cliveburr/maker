
export class Point {

    public constructor(
        public x: number,
        public y: number
    ) {
    }

    public sub(point: Point): Point {
        return new Point(
            this.x - point.x,
            this.y - point.y);
    }

    public plus(point: Point): Point {
        return new Point(
            this.x + point.x,
            this.y + point.y);
    }

    public min(...points: Point[]): Point {
        return new Point(
            Math.min(...points.map(p => p.x)),
            Math.min(...points.map(p => p.y))
        );
    }

    public max(...points: Point[]): Point {
        return new Point(
            Math.max(...points.map(p => p.x)),
            Math.max(...points.map(p => p.y))
        );
    }

    public multi(value: number): Point {
        return new Point(this.x * value, this.y * value);
    }

    public div(value: number): Point {
        return new Point(this.x / value, this.y / value);
    }
}

export class Size {
    public constructor(
        public width: number,
        public height: number
    ) {
    }
}

export class Rectangle {

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(point: Point, size: Size);
    constructor(x: number, y: number, width: number, height: number);
    constructor(a0: Point | number, a1: Size | number, a2?: number, a3?: number) {
        if (a2 && a3) {
            this.x = <number>a0;
            this.y = <number>a1;
            this.width = a2;
            this.height = a3;
        }
        else {
            this.x = (<Point>a0).x;
            this.y = (<Point>a0).y;
            this.width = (<Size>a1).width;
            this.height = (<Size>a1).height;
        }
    }

    public isInside(point: Point): boolean;
    public isInside(x: number, y: number): boolean;
    public isInside(a0: Point | number, a1?: number): boolean {
        let x = null, y = null;

        if (a1) {
            x = <number>a0;
            y = a1;
        }
        else {
            x = (<Point>a0).x;
            y = (<Point>a0).y;
        }

        return ((x >= this.x && x <= this.x + this.width - 1) && (y >= this.y && y <= this.y + this.height - 1));
    }

    public sub(rectangle: Rectangle): Rectangle {
        return new Rectangle(
            this.x - rectangle.x,
            this.y - rectangle.y,
            this.width - rectangle.width,
            this.height - rectangle.height);
    }

    public plus(point: Point): Rectangle;
    public plus(rectangle: Rectangle): Rectangle;
    public plus(a0: Rectangle | Point): Rectangle {
        if (a0 instanceof Rectangle) {
            return new Rectangle(
                this.x + a0.x,
                this.y + a0.y,
                this.width + a0.width,
                this.height + a0.height);
        }
        else {
            return new Rectangle(
                this.x + a0.x,
                this.y + a0.y,
                this.width,
                this.height);
        }
    }

    public multi(value: number): Rectangle {
        return new Rectangle(this.x * value, this.y * value, this.width * value, this.height * value);
    }

    public expand(value: number): Rectangle {
        return new Rectangle(this.x - value, this.y - value, this.width + (value * 2), this.height + (value * 2));
    }

    public clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public location(): Point {
        return new Point(this.x, this.y);
    }
}