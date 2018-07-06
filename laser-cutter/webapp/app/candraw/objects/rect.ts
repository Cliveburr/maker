import { Entity } from "../entity";
import { IDrawContext, Draw } from "../draw";
import { Rectangle } from "../util/math";
import { IEvent } from '../util/event';
import { Draggable } from "./draggable";
import { Selectable } from "./selectable";

export class Rect extends Entity {

    public interactive = true;
    public drag: Draggable;
    public select: Selectable;

    public constructor(
        public options: IRectOptions
    ) {
        super(new Rectangle(options.x, options.y, options.width, options.height));
        this.select = new Selectable(this);
        this.drag = new Draggable(this);
    }

    public draw(ctx: IDrawContext): void {

        this.cache = new Draw(this.area.width, this.area.height);

        this.cache
            .fillStyle(this.options.fill)
            .fillRect(0, 0, this.area.width, this.area.height);

        this.needToDraw = false;
    }

}

export interface IRectOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string | CanvasGradient | CanvasPattern;
}