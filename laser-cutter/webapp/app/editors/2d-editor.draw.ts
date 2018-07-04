import { Entity, IDrawContext, Draw, Container, IEvent } from "../candraw";
import { Rectangle, Point } from "../candraw/util/math";

export class GridBackground extends Entity {

    public constructor(
        width: number,
        height: number,
        public options: IGridOptions
    ) {
        super(new Rectangle(0, 0, width, height));
        this.zorder = -9999;
    }

    public draw(ctx: IDrawContext): void {

        this.cache = new Draw(this.area.width, this.area.height);

        this.cache.strokeStyle(this.options.color);
        for (let x = 0; x < this.area.height - 1; x += this.options.size) {
            if (x % this.options.infoInterval !== 0) {
                this.cache.line(x, 0, x, this.area.width);
            };
        }
        for (let y = 0; y < this.area.width - 1; y += this.options.size) {
            if (y % this.options.infoInterval !== 0) {
                this.cache.line(0, y, this.area.height, y);
            };
        }
        this.cache.strokeStyle(this.options.boldColor);
        for (let x = 0; x < this.area.height - 1; x += this.options.infoInterval) {
            this.cache.line(x, 0, x, this.area.width);
        }
        for (let y = 0; y < this.area.width - 1; y += this.options.infoInterval) {
            this.cache.line(0, y, this.area.height, y);
        }
        this.cache.line(this.area.height - 1, 0, this.area.height - 1, this.area.width);
        this.cache.line(0, this.area.width - 1, this.area.height, this.area.width - 1);

        this.needToDraw = false;
    }
    
}

export interface IGridOptions {
    size: number;
    infoInterval: number;
    color: string;
    boldColor: string;
}

export class Grid extends Container {


    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        public options: IGridOptions
    ) {
        super(new Rectangle(x, y, width, height));

        this.interactive = true;
        this.createBackground();
    }

    private createBackground(): void {
        let grid = new GridBackground(this.area.width, this.area.height, this.options);
        super.add(grid);
    }

    public onmove(e: IEvent): void {
        if (e.stackIndex != 1) {
            return;
        }

        let np = new Point(
            Math.round(e.target.area.x / this.options.size) * this.options.size,
            Math.round(e.target.area.y / this.options.size) * this.options.size
        );

        np = np.max(new Point(0, 0), np);
        np = np.min(new Point(this.area.width - e.target.area.width, this.area.height - e.target.area.height), np);

        e.target.area.x = np.x;
        e.target.area.y = np.y;
    }
}