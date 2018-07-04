import { Entity } from "./entity";
import { Point } from "./util/math";

interface PointBinderObj {
    obj: Entity;
    bind: PointBind;
    onUpdate: Function | null
}

export enum PointBind {
    x = 1,
    y = 2
}

export class PointBinder {

    private binds = new Array<PointBinderObj>();
    private lastPoint: Point | null;

    public add(obj: Entity, bind: PointBind, onUpdate?: Function): void {
        this.binds.push({
            obj,
            bind,
            onUpdate
        });
    }

    public remove(obj: Entity): void {
        let has = this.binds
            .filter(b => b.obj === obj);

        if (has.length > 0) {
            let index = this.binds.indexOf(has[0]);
            this.binds.splice(index, 1);
        }
    }

    public update(point: Point): void {
        if (this.lastPoint && this.binds.length > 0) {
            let differ = point.sub(this.lastPoint);
            for (let bind of this.binds) {
                if ((bind.bind & PointBind.x) != PointBind.x) differ.x = 0;
                if ((bind.bind & PointBind.y) != PointBind.y) differ.y = 0;

                if (differ.x != 0
                    || differ.y != 0) {
                    bind.obj.area = bind.obj.area.plus(differ);

                    if (bind.onUpdate) {
                        bind.onUpdate();
                    }
                }
            }
        }
        this.lastPoint = point;
    }
}