import { Entity } from "../entity";
import { IEvent } from "../util/event";
import { Point } from "../util/math";

export class Draggable {

    private isInDrag = false;
    private entityStartPoint: Point;
    private mouseStartPoint: Point;
    private canvas_mouseupSub: Symbol;
    private entity_mousemoveSub: Symbol;

    public constructor(
        private entity: Entity
    ) {
        this.entity.event.sub('mousedown', this.entity_mousedown.bind(this));
    }

    public get isDragging(): boolean {
        return this.isInDrag;
    }

    private entity_mousedown(e: IEvent): void {
        this.startDrag(e);
    }

    public startDrag(e: IEvent): void {
        if (this.isInDrag) {
            return;
        }
        this.isInDrag = true;

        this.entity.canvas.triggerEvent('dragstart', this.entity, false, e);
        this.canvas_mouseupSub = this.entity.canvas.globalEvent.sub('mouseup', this.canvas_mouseup.bind(this));
        this.entity_mousemoveSub = this.entity.canvas.event.sub('mousemove', this.entity_mousemove.bind(this));

        this.entityStartPoint = this.entity.area.location();
        this.mouseStartPoint = e.mousePos;
    }

    private entity_mousemove(e: IEvent): void {
        let differ = e.mousePos.sub(this.mouseStartPoint);
        if (differ.x != 0
            || differ.y != 0) {
            let newPos = this.entityStartPoint.plus(differ);
            this.entity.move(newPos);
            this.entity.canvas.triggerEvent('dragmove', this.entity, true, e);
        }
    }

    private canvas_mouseup(e: IEvent): void {
        this.stopDrag(e);
    }

    public stopDrag(e: IEvent): void {
        if (!this.isInDrag) {
            return;
        }
        this.isInDrag = false;

        this.entity.canvas.globalEvent.unsub('mouseup', this.canvas_mouseupSub);
        this.entity.canvas.event.unsub('mousemove', this.entity_mousemoveSub);

        this.entity.canvas.triggerEvent('dragend', this.entity, false, e);
    }
}