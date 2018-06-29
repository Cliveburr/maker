import { Entity } from "./entity";
import { Input } from "./input";

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

    public line(x0: number, y0: number, x1: number, y1: number): this {
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
}

export interface IDrawContext {
    time: number;
    input: Input;
    lastInput: Input;
    mouseOver: Entity | null;
    lastMouseOver: Entity | null;
}