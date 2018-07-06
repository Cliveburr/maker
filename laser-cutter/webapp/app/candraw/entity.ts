import { IDrawContext, Draw } from "./draw";
import { Rectangle, Point } from "./util/math";
import { EventsHandler, IEvent } from './util/event';
import { Container } from './container';
import { Canvas } from "./canvas";

export abstract class Entity {
    
    public visible: boolean = true;
    public interactive: boolean = false;
    public needToDraw: boolean = true;
    public zorder: number = 0;
    public cache: Draw;
    public parent: Container;
    public canvas: Canvas;

    public event = new EventsHandler();

    public constructor(
        public area: Rectangle
    ) {
    }

    public abstract draw(ctx: IDrawContext): void;

    public isContainer(): this is Container {
        return typeof (<any>this)['getEntityOn'] !== 'undefined';
    }

    public move(pos: Point): void {
        this.area.x = pos.x;
        this.area.y = pos.y;
        this.parent.needToDraw = true;
        this.canvas.triggerEvent('move', this, true);
    }

    public executeAcross(exec: (e: Entity) => void): void {
        this.executeAcrossRecur(this, exec);
    }

    private executeAcrossRecur(e: Entity, exec: (e: Entity) => void): void {
        exec(e);
        if (e.isContainer()) {
            for (let ent of e.entities) {
                this.executeAcrossRecur(ent, exec);
            }
        }
    }

    // public onmouseenter(): void {
    //     console.log('mouseenter', this);
    // }

    // public onmouseout(): void {
    //     console.log('mouseout', this);
    // }

    // public onmousemove(): void {
    //     //console.log('mousemove', this);
    // }
}