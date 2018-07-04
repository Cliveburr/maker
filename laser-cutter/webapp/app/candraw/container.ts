import { Entity } from "./entity";
import { IDrawContext, Draw } from "./draw";
import { Rectangle, Point } from "./util/math";
import { IEvent } from "./util/event";

export class Container extends Entity {

    private ents: Entity[] = [];
    protected mouseOver: Entity | null;

    public constructor(
        public area: Rectangle
    ) {
        super(area);
    }

    public draw(ctx: IDrawContext): void {

        let ents = this.ents
            .filter(e => e.needToDraw);

        if (!this.needToDraw) {
            this.needToDraw = ents.length > 0;
        }

        if (this.needToDraw) {
            for (let e of ents) {
                e.draw(ctx);
            }

            let toDraw = this.ents
                .filter(e => e.visible)
                .sort((a, b) => a.zorder - b.zorder)

            this.cache = new Draw(this.area.width, this.area.height);
            for (let e of toDraw) {
                this.cache.drawEntity(e);
            }

            this.needToDraw = false;
        }
    }

    public add(e: Entity): void {
        e.parent = this;
        this.ents.push(e);
        this.needToDraw = true;
        this.setAdd(e);
    }

    public setAdd(e: Entity): void {
        if (this.canvas) {
            e.canvas = this.canvas;
            this.canvas.triggerEvent('add', e, false);
        }
        if (e.isContainer()) {
            for (let ent of e.ents) {
                this.setAdd(ent);
            }
        }
    }

    public remove(e: Entity): void {
        let index = this.ents.indexOf(e);
        if (index > -1) {
            e.parent = null;
            e.canvas = null;
            this.ents.splice(index, 1);
            this.needToDraw = true;
            this.canvas.triggerEvent('remove', e, false);
        }
    }

    public getEntityOn(p: Point): Entity | null {
        let ents = this.ents
            .filter(e => e.visible && e.interactive)
            .sort((a, b) => a.zorder - b.zorder);

        for (let e of ents) {
            if (e.area.isInside(p)) {
                return e;
            }
        }
        return null;
    }
}