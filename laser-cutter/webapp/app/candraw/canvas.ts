import { Container } from "./container";
import { Draw, IDrawContext } from "./draw";
import { Rectangle } from "./util/math";
import { Input } from "./input";
import { Entity } from "./entity";

export class Canvas extends Container {

    private drawEl: Draw;
    private input = new Input();
    private lastInput: Input;
    private lastMouseOver: Entity | null;

    public constructor(
        element: HTMLCanvasElement
    ) {
        super(null);

        this.lastInput = this.input.clone();
        this.area = new Rectangle(0, 0, element.width, element.height);
        this.drawEl = new Draw(element);

        this.bindEvents();
        this.tick(0);
    }

    private tick(time: number): void {
        let input = this.input.clone();
        let ctx = <IDrawContext>{
            time,
            input,
            lastInput: this.lastInput,
            mouseOver: this.getEntityOn(input.mouseX, input.mouseY),
            lastMouseOver: this.lastMouseOver
        };

        this.computeEvents(ctx);
        this.draw(ctx);

        this.lastInput = input;
        this.lastMouseOver = ctx.mouseOver;
        this.requestAnimFrame(this.tick.bind(this));
    }

    private requestAnimFrame(callBack: FrameRequestCallback): void {
        (
            (<any>window).requestAnimationFrame ||
            (<any>window).webkitRequestAnimationFrame ||
            (<any>window).mozRequestAnimationFrame ||
            (<any>window).oRequestAnimationFrame ||
            (<any>window).msRequestAnimationFrame
        )
            (callBack);
    }

    private bindEvents(): void {
        let event = this.drawEl.element.addEventListener;
        event('mousedown', this.updateMouseInputState.bind(this));
        event('mouseup', this.updateMouseInputState.bind(this));
        event('mousemove', this.updateMouseInputState.bind(this));
        event('mouseenter', this.updateMouseInputState.bind(this));
        event('mouseleave', this.updateMouseInputState.bind(this));
        event('mouseout', this.updateMouseInputState.bind(this));
    }

    private updateMouseInputState(el: MouseEvent): void {
        this.input.mouseX = el.clientX;
        this.input.mouseY = el.clientY;
        this.input.mouseLeft = (el.buttons & 1) == 1;
        this.input.mouseRight = (el.buttons & 2) == 2;
        this.input.mouseWheel = (el.buttons & 4) == 4;
    }

    public draw(ctx: IDrawContext): void {

        super.draw(ctx);

        this.drawEl
            .background('#FFFFFF')
            .drawEntity(this);
    }

    private computeEvents(ctx: IDrawContext): void {
        if (ctx.lastMouseOver != ctx.mouseOver) {
            if (ctx.lastMouseOver && ctx.lastMouseOver.mouseout) {
                ctx.lastMouseOver.mouseout.raise(ctx);
            }

            if (ctx.mouseOver && ctx.mouseOver.mousein) {
                ctx.mouseOver.mousein.raise(ctx);
            }
        }
        if (ctx.lastInput.mouseX != ctx.input.mouseX ||
            ctx.lastInput.mouseY != ctx.input.mouseY) {
            if (ctx.mouseOver && ctx.mouseOver.mousemove) {
                ctx.mouseOver.mousemove.raise(ctx);
            }
        }
        if (ctx.lastInput.mouseLeft != ctx.input.mouseLeft ||
            ctx.lastInput.mouseRight !=ctx.input.mouseRight ||
            ctx.lastInput.mouseWheel !=ctx.input.mouseWheel) {
            if (ctx.mouseOver && ctx.mouseOver.mousebutton) {
                ctx.mouseOver.mousebutton.raise(ctx);
            }
        }
    }
}