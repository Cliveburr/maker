import { Entity } from "./entity";
import { IDrawContext, Draw } from "./draw";
import { Rectangle, Point } from "./util/math";
import { IEvent } from "./util/event";

export class Container extends Entity {

    private ents: Entity[] = [];

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

    public get entities(): Entity[] {
        return this.ents;
    }

    public add(e: Entity): void {
        e.parent = this;
        this.ents.push(e);
        this.needToDraw = true;
        e.executeAcross(ae => {
            if (this.canvas) {
                ae.canvas = this.canvas;
                this.canvas.triggerEvent('add', ae, false);
            }
        });
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

    public calculatePointInMe(p: Point): Point {
        let inMe = p.sub(this.area.location());
        if (this.parent) {
            return this.parent.calculatePointInMe(inMe);
        }
        else {
            return inMe;
        }
    }
}