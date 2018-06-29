
export class Input {
    public stopPropagation: boolean = false;
    public mouseX: number = 0;
    public mouseY: number = 0;
    public mouseLeft: boolean = false;
    public mouseRight: boolean = false;
    public mouseWheel: boolean = false;

    public clone(): Input {
        var c = new Input();
        c.stopPropagation = false;
        c.mouseX = this.mouseX;
        c.mouseY = this.mouseY;
        c.mouseLeft = this.mouseLeft;
        c.mouseRight = this.mouseRight;
        c.mouseWheel = this.mouseWheel;
        return c;
    }
}