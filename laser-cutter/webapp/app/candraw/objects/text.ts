import { Entity } from "../entity";
import { IDrawContext, Draw } from "../draw";
import { Rectangle } from "../util/math";

export class Text extends Entity {

    public constructor(
        public text: string,
        public options: ITextOptions
    ) {
        super(null);
        this.completeOptions();
    }

    private completeOptions(): void {
        this.options = {
            x: this.options.x,
            y: this.options.y,
            fontSize: this.options.fontSize || 14,
            fontFamily: this.options.fontFamily || 'sans-serif',
            fill: this.options.fill || '#000000'
        };
    }

    public draw(ctx: IDrawContext): void {

        let font = this.adjustFont();

        this.cache = new Draw(1, this.options.fontSize);
        this.cache.ctx.font = font;
        let width = Math.ceil(this.cache.ctx.measureText(this.text).width);
        this.cache.element.width = width;
        this.area = new Rectangle(this.options.x, this.options.y, width, this.options.fontSize);

        this.cache.ctx.font = font;
        this.cache.fillText(this.text, this.options.fill, 0, this.options.fontSize);

        this.needToDraw = false;
    }

    private adjustFont(): string {
        let font = this.options.fontSize.toString() + 'px';
        font += ' ' + this.options.fontFamily;
        //font += ' normal';
        return font;
    }
}

export interface ITextOptions {
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    fill?: string | CanvasGradient | CanvasPattern;
}