import { Container } from "./container";
import { Draw, IDrawContext } from "./draw";
import { Rectangle, Point } from "./util/math";
import { IEvent, EventsHandler} from './util/event';
import { Entity } from "./entity";
import { Selectable } from "./objects/selectable";

export class Canvas extends Container {

    private drawEl: Draw;
    private rect: ClientRect | DOMRect;
    private lastStack: Entity[] = [];

    public typeCanvas = true;
    public selected: Selectable | null;
    public globalEvent = new EventsHandler();
    public zoom: number = 1;

    public constructor(
        element: HTMLCanvasElement
    ) {
        super(null);

        this.area = new Rectangle(0, 0, element.width, element.height);
        this.drawEl = new Draw(element);
        this.canvas = this;

        this.onUpdateArea();
        this.bindEvents();
        this.tick(0);
    }

    private tick(time: number): void {
        let ctx = <IDrawContext>{
            time
        };

        this.draw(ctx);

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
        event('mousedown', this.computeMouseEvent.bind(this, 'mousedown'));
        event('mouseup', this.computeMouseEvent.bind(this, 'mouseup'));
        event('mousemove', this.computeMouseEvent.bind(this, 'mousemove'));
        event('mouseenter', this.computeMouseEvent.bind(this, 'mousemove'));
        event('mouseout', this.computeMouseEvent.bind(this, 'mousemove'));
        event('wheel', this.computeMouseEvent.bind(this, 'wheel'));
    }

    private onUpdateArea(): void {
        this.rect = this.drawEl.element.getBoundingClientRect();
    }

    public draw(ctx: IDrawContext): void {

        super.draw(ctx);

        this.drawEl
            .save()
            .scale(this.zoom, this.zoom)
            .background('#FFFFFF')
            .drawEntity(this)
            .restore();
    }

    private computeMouseEvent(event: string, ev: MouseEvent & WheelEvent): void {
        let mousePos = new Point(ev.clientX - this.rect.left + window.scrollX, ev.clientY - this.rect.top + window.scrollY)
            .div(this.zoom);
        let stack = this.mountStackByPoint(mousePos);
        let target = stack[0];

        if (event == 'mousedown') {
            //console.log(stack);
        }

        let e: IEvent = {
            stopPropagation: false,
            mousePos: mousePos,
            mouseLeft: (ev.buttons & 1) == 1,
            mouseRight: (ev.buttons & 2) == 2,
            mouseWheel: (ev.buttons & 4) == 4,
            wheelDeltaX: ev.deltaX,
            wheelDeltaY: ev.deltaY,
            wheelDeltaZ: ev.deltaZ,
            target: target,
            isTarget: true,
            event: event,
            stack: stack,
            stackIndex: 0,
            ctrlKey: ev.ctrlKey
        };

        for (let entity of stack) {
            let has = this.lastStack.indexOf(entity);
            if (has == -1) {
                this.triggerEvent('mouseenter', entity, false, e);
            }
        }
        for (let entity of this.lastStack) {
            let has = stack.indexOf(entity);
            if (has == -1) {
                this.triggerEvent('mouseout', entity, false, e);
            }
        }

        this.runEvent(e);
        this.lastStack = stack;
    }

    private mountStackByPoint(p: Point): Entity[] {
        let tr: Entity[] = [];
        let ent: Entity | null = this;
        let onp = p;

        if (this.area.isInside(p)) {
            tr.push(this);
        }

        while(ent) {
            if (ent.isContainer()) {
                ent = ent.getEntityOn(onp);
                if (ent) {
                    tr.unshift(ent);
                    onp = onp.sub(ent.area.location());
                }
            }
            else {
                ent = null;
            }
        }
        return tr;
    }

    private mountStackByParent(entity: Entity): Entity[] {
        let tr = [entity];
        let parent = entity.parent;
        while (parent) {
            tr.push(parent);
            parent = parent.parent;
        }
        return tr;
    }

    private runEvent(e: IEvent): void {
        let globalFuncs = this.globalEvent.getFuncsOf(e.event);
        if (globalFuncs) {
            for (let func of globalFuncs) {
                if (e.stopPropagation) {
                    return;
                } 
                func(e);
            }
        }

        for (let i = 0; i < e.stack.length; i++) {
            if (e.stopPropagation) {
                return;
            }

            e.stackIndex = i;
            let ent = e.stack[i];
            e.isTarget = ent == e.target;
            let entOnFunc = (<any>ent)['on' + e.event]

            if (entOnFunc) {
                entOnFunc.apply(ent, [e]);
            }

            if (e.stopPropagation) {
                return;
            }

            let funcs = ent.event.getFuncsOf(e.event);
            if (funcs) {
                for (let func of funcs) {
                    if (e.stopPropagation) {
                        return;
                    }
                    func(e);
                }
            }
        }
    }

    public triggerEvent(event: string, target: Entity, stack?: boolean, arg?: IEvent): void {
        let stackCon = stack ?
            this.mountStackByParent(target) :
            [target];

        let e: IEvent = {
            stopPropagation: false,
            target,
            isTarget: true,
            event,
            stack: stackCon,
            stackIndex: 0
        };

        if (arg) {
            e.mousePos = arg.mousePos;
            e.mouseLeft = arg.mouseLeft;
            e.mouseRight = arg.mouseRight;
            e.mouseWheel = arg.mouseWheel;
        }

        this.runEvent(e);
    }
}