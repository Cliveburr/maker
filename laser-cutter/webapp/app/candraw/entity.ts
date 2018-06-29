import { IDrawContext, Draw } from "./draw";
import { Rectangle } from "./util/math";
import { Event } from './util/event';
import { Container } from './container';

export interface EventDelegate {
    (ctx: IDrawContext): void;
}

export abstract class Entity {
    
    public visible: boolean = true;
    public interactive: boolean = false;
    public needToDraw: boolean = true;
    public zorder: number = 0;
    public cache: Draw;
    public parent: Entity;

    public mouseout?: Event<EventDelegate>;
    public mousein?: Event<EventDelegate>;
    public mousemove?: Event<EventDelegate>;
    public mousebutton?: Event<EventDelegate>;

    public constructor(
        public area: Rectangle
    ) {
    }

    public abstract draw(ctx: IDrawContext): void;

    public isContainer(): this is Container {
        return typeof (<any>this)['getEntityOn'] !== 'undefined';
    }
}