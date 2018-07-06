import { Point } from "./math";
import { Entity } from "../entity";

export interface IEvent {
    stopPropagation: boolean;
    mousePos?: Point;
    mouseLeft?: boolean;
    mouseRight?: boolean;
    mouseWheel?: boolean;
    wheelDeltaX?: number;
    wheelDeltaY?: number;
    wheelDeltaZ?: number;
    target: Entity;
    isTarget: boolean;
    stack: Entity[];
    stackIndex: number;
    event: string;
    ctrlKey?: boolean;
}

export interface IEventDelegate {
    (e: IEvent): void;
}

export interface IEventFuncs {
    subs: { sy: Symbol, func: IEventDelegate }[];
}

export class EventsHandler {

    private events: { [event: string]: IEventFuncs } = {};

    public sub(event: string, func: IEventDelegate): Symbol {
        let sy = Symbol();
        let ev = this.events[event];
        if (!ev) {
            ev = {
                subs: [{ sy, func }]
            };
            this.events[event] = ev;
        }
        else {
            ev.subs.push({ sy, func });
        }
        return sy;
    }

    public unsub(event: string, sy: Symbol): void {
        let ev = this.events[event];
        if (ev) {
            let find = ev.subs.find(s => s.sy == sy);
            let index = ev.subs.indexOf(find);
            if (index > -1) {
                ev.subs.splice(index, 1);
            }
        }
    }

    public getFuncsOf(event: string): IEventDelegate[] | null {
        let ev = this.events[event];
        if (ev) {
            return ev.subs.map(s => s.func);
        }
        else {
            return null;
        }
    }
}