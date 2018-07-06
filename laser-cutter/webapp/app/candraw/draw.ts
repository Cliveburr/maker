import { Entity } from "./entity";
import { Point } from "./util/math";

export class Draw {

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D; 

    public constructor(width: number, height: number)
    public constructor(element: HTMLCanvasElement)
    public constructor(arg0: number | HTMLCanvasElement, arg1?: number) {

        if (arg1) {
            this.element = window.document.createElement('canvas');
            this.element.width = <number>arg0;
            this.element.height = arg1;
        }
        else {
            this.element = <HTMLCanvasElement>arg0;    
        }

        this.ctx = this.element.getContext('2d');
    }

    public background(color: string | CanvasGradient | CanvasPattern): this {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
        return this;
    }

    public drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, x: number, y: number, w: number, h: number): this {
        this.ctx.drawImage(image, x, y, w, h);
        return this;
    }

    public drawEntity(entity: Entity): this {
        this.ctx.drawImage(entity.cache.element, entity.area.x, entity.area.y, entity.area.width, entity.area.height);
        return this;
    }

    public fillText(text: string, color: string | CanvasGradient | CanvasPattern, x: number, y: number): this {
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
        return this;
    }

    public strokeStyle(color: string | CanvasGradient | CanvasPattern): this {
        this.ctx.strokeStyle = color;
        return this;
    }

    public fillStyle(color: string | CanvasGradient | CanvasPattern): this {
        this.ctx.fillStyle = color;
        return this;
    }

    public strokeText(text: string, color: string | CanvasGradient | CanvasPattern, x: number, y: number): this {
        this.ctx.strokeStyle = color;
        this.ctx.strokeText(text, x, y); //  .fillText(text, x, y);
        return this;
    }

    public line(p0: Point, p1: Point): this;
    public line(x0: number, y0: number, x1: number, y1: number): this;
    public line(a0: number | Point, a1: number | Point, a2?: number, a3?: number): this {
        let x0: number, y0: number, x1: number, y1: number;

        if (a0 instanceof Point && a1 instanceof Point) {
            x0 = a0.x;
            y0 = a0.y;
            x1 = a1.x;
            y1 = a1.y;
        }
        else {
            x0 = <number>a0;
            y0 = <number>a1;
            x1 = a2;
            y1 = a3;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(x0 + 0.5, y0 + 0.5);
        this.ctx.lineTo(x1 + 0.5, y1 + 0.5);
        this.ctx.stroke();
        return this;
    }

    public fillRect(x: number, y: number, w: number, h: number): this {
        this.ctx.fillRect(x, y, w, h);
        return this;
    }

    public strokeRect(x: number, y: number, w: number, h: number): this {
        this.ctx.strokeRect(x, y, w, h);
        return this;
    }

    public scale(x: number, y: number): this {
        this.ctx.scale(x, y);
        return this;
    }

    public save(): this {
        this.ctx.save();
        return this;
    }

    public restore(): this {
        this.ctx.restore();
        return this;
    }
}

export interface IDrawContext {
    time: number;
}