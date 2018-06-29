import { Entity } from "./entity";
import { IDrawContext, Draw } from "./draw";
import { Rectangle } from "./util/math";

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

    public add(e: Entity): void {
        e.parent = this;
        this.ents.push(e);
    }

    public getEntityOn(x: number, y: number): Entity | null {
        let ents = this.ents
            .filter(e => e.visible && e.interactive)
            .sort((a, b) => a.zorder - b.zorder);

        for (let e of ents) {
            if (e.area.isInside(x, y)) {
                if (e.isContainer()) {
                    return e.getEntityOn(x, y);
                }
                else {
                    return e;
                }
            }
        }
        return null;
    }

}