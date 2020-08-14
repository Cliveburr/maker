import { Entity } from "../entity";
import { IEvent } from "../util/event";
import { Draw, IDrawContext } from "../draw";

export class Selectable {
    
    private isInSelect = false;
    private canvas_mousedownSub: Symbol;
    private entity_moveSub: Symbol;
    private control: SelectControl;
    private avoidSameEvent = true;

    public constructor(
        public entity: Entity
    ) {
        this.entity.event.sub('mousedown', this.entity_mousedown.bind(this));
    }

    public get isSelected(): boolean {
        return this.isInSelect;
    }

    private entity_mousedown(e: IEvent): void {
        if (e.isTarget) {
            this.setSelect(e);
        }
    }

    public setSelect(e?: IEvent): void {
        if (this.isInSelect) {
            return;
        }
        this.isInSelect = true;

        if (this.entity.canvas.selected) {
            this.entity.canvas.selected.unSelect(e);
        }

        this.generateControl();

        this.avoidSameEvent = true
        this.entity.canvas.selected = this;
        this.canvas_mousedownSub = this.entity.canvas.event.sub('mousedown', this.canvas_mousedown.bind(this));
        this.entity_moveSub = this.entity.event.sub('move', this.entity_move.bind(this));
    }

    private canvas_mousedown(e: IEvent): void {
        let posInMe = this.entity.parent.calculatePointInMe(e.mousePos);

        if (!this.control.area.isInside(posInMe) && !this.avoidSameEvent) {
            this.unSelect(e);
        }
        this.avoidSameEvent = false;
    }

    public unSelect(e?: IEvent): void {
        if (!this.isInSelect) {
            return;
        }
        this.isInSelect = false;

        this.entity.canvas.selected = null
        this.removeControl();

        this.entity.canvas.triggerEvent('blur', this.entity, false, e);
        this.entity.canvas.event.unsub('mousedown', this.canvas_mousedownSub);
        this.entity.event.unsub('move', this.entity_moveSub);
    }

    private entity_move(e: IEvent): void {
        setTimeout(() => {
            this.control.reposition();
            this.control.parent.needToDraw = true;
        }, 1);
    }

    private generateControl(): void {
        this.control = new SelectControl(this, {});
        this.entity.parent.add(this.control);
    }

    private removeControl(): void {
        this.entity.parent.remove(this.control);
        delete this.control;
    }
}

export class SelectControl extends Entity {

    public constructor(
        public select: Selectable,
        public options: ISelectControlOptions
    ) {
        super(null);
        this.completeOptions();

        this.reposition();
        this.zorder = 9999;
    }

    public reposition(): void {
        this.area = this.select.entity.area.expand(this.options.padding);
    }

    private completeOptions(): void {
        this.options = {
            padding: this.options.padding || 2
        };
    }

    public draw(ctx: IDrawContext): void {

        this.cache = new Draw(this.area.width, this.area.height);

        this.cache
            .strokeStyle('#000000')
            .strokeRect(0, 0, this.area.width, this.area.height);

        this.needToDraw = false;
    }
}

export interface ISelectControlOptions {
    padding?: number;
}