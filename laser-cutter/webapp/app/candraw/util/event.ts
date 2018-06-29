
export class Event<T> {
    public raise: T;

    private subs: T[];
    private forThis: any;

    constructor(forThis: any) {
        this.subs = [];
        this.forThis = forThis;
        this.raise = <any>this.innerRaise;
    }

    private innerRaise(...args: any[]): void {
        this.subs.forEach(e => {
            var toCall: any = e;
            toCall.apply(this.forThis, args);
        });
    }

    public sub(fun: T): void {
        this.subs.push(fun);
    }

    public remove(fun: T): boolean {
        var i = this.subs.indexOf(fun);
        if (i == -1) return false;
        this.subs.splice(i, 1);
        return true;
    }
}