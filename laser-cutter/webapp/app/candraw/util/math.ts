
export class Point {
    public constructor(
        public x: number,
        public y: number
    ) {
    }
}

export class Size {
    public constructor(
        public width: number,
        public height: number
    ) {
    }
}

export class Rectangle implements Point, Size {

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
}