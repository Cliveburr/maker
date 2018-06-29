import { Entity, EventDelegate } from "../entity";
import { IDrawContext, Draw } from "../draw";
import { Rectangle } from "../util/math";
import { Event } from '../util/event';

export class Rect extends Entity {

    public mouseout = new Event<EventDelegate>(this);
    public mousein = new Event<EventDelegate>(this);
    public interactive = true;

    public constructor(
        public options: IRectOptions
    ) {
        super(new Rectangle(options.x, options.y, options.width, options.height));
        this.mousein.sub(this.onmousein);
        this.mouseout.sub(this.onmouseout);
    }

    public draw(ctx: IDrawContext): void {

        this.cache = new Draw(this.area.width, this.area.height);

        this.cache
            .fillStyle(this.options.fill)
            .fillRect(0, 0, this.area.width, this.area.height);

        this.needToDraw = false;
    }

    private onmousein(ctx: IDrawContext): void {
        console.log('in');
    }

    private onmouseout(ctx: IDrawContext): void {
        console.log('out');
    }
}

export interface IRectOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string | CanvasGradient | CanvasPattern;
}