import { Entity, IDrawContext, Draw } from "../candraw";
import { Rectangle } from "../candraw/util/math";

export class Grid extends Entity {

    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        public options: IGridOptions
    ) {
        super(new Rectangle(x, y, width, height));
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