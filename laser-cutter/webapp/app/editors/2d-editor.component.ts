import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Canvas, Text, ITextOptions, Draw, Rect } from '../candraw';
import { Grid } from './2d-editor.draw';
//import { fabric } from 'fabric';
//declare var fabric: any;

export interface ITwoDEditorOptions {
    orientationX: boolean;
    orientationY: boolean;
    infoInterval: number;
    marginX: number;
    marginY: number;
    grid: ITwoDGrid;
    width: number;
    height: number;
}

export interface ITwoDGrid {
    size: number;
    stick: boolean;
    color: string;
    boldColor: string;
}

export interface IPosition {
    left: number;
    top: number;
}

@Component({
    selector: 'twod-editor',
    templateUrl: '2d-editor.component.html',
    styleUrls: ['2d-editor.component.scss']
})
export class TwoDEditorComponent implements OnInit {

    @ViewChild('canvas2')
    public canvas2: ElementRef;

    @ViewChild('canvas')
    public canvas: ElementRef;
    public options: ITwoDEditorOptions;

    //private can: fabric.Canvas;
    //private view: fabric.Group;

    private can: Canvas;
    private view: Grid;

    public constructor() {
        this.options = {
            orientationX: true,
            orientationY: true,
            infoInterval: 50,
            marginX: 25,
            marginY: 15,
            grid: {
                size: 10,
                stick: true,
                color: '#ebebeb',
                boldColor: 'rgba(204, 204, 204, 1)' // '#cccccc'
            },
            width: 600,
            height: 600
        };
    }


    public ngOnInit(): void {

        this.can = new Canvas(this.canvas2.nativeElement);

    //     this.can = new fabric.Canvas(this.canvas.nativeElement, <fabric.ICanvasOptions>{
    //         selection: true,
    //     });

        this.generateGuids();

    //     this.setView();

        this.generateGrid();

        let firstText = new Text('testando', {
            x: 100,
            y: 100,
            fill: '#FF0000'
        });
        this.can.add(firstText);

        let rect = new Rect({
            x: 150,
            y: 150,
            width: 30,
            height: 30,
            fill: '#000000'
        })
        this.view.add(rect);

    //     this.can.add(new fabric.Circle({ 
    //         left: 300, 
    //         top: 300, 
    //         radius: 50, 
    //         fill: '#9f9', 
    //         originX: 'left', 
    //         originY: 'top',
    //         centeredRotation: true
    //     }));

    //     this.can.add(new fabric.Line([100, 100, 200, 200], {
    //         stroke: this.options.grid.color,
    //         strokeWidth: 1,
    //     }));

    //     this.can.on('object:moving', e => {
    //         if (e)
    //             return;

    //         var obj = <any>e.target;
    //          // if object is too big ignore
    //         // if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
    //         //     return;
    //         // }        
    //         obj.setCoords();        
    //         // top-left  corner
    //         if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
    //             obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
    //             obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
    //         }
    //         // bot-right corner
    //         if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
    //             obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
    //             obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
    //         }
    // });
    }

    // private setView(): void {
    //     this.view = new fabric.Group([], <fabric.IObjectOptions>{
    //         left: 100,
    //         top: this.options.marginY,
    //         height: this.options.height,
    //         width: this.options.width
    //     });
    //     this.can.add(<any>this.view);

    //     (<any>this.view).set({ left: 100 });
    // }

    private generateGuids(): void {
        let canHeight = this.options.height;
        let canWidth = this.options.width;

        let options = <ITextOptions>{
            x: 0,
            y: 0,
            fontSize: 14,
            fontFamily: 'Arial',
            fill: this.options.grid.boldColor
        };

        for (let posx = this.options.infoInterval; posx < canHeight - 1; posx += this.options.infoInterval) {
            let realposx = this.options.orientationX ?
                posx + this.options.marginY :
                canHeight - posx - 1;
            
            options.y = realposx - 7;
            let infoText = new Text(posx.toString(), options);
            this.can.add(infoText);
        }

        options.y = 0;
        for (let posy = this.options.infoInterval; posy < canWidth - 1; posy += this.options.infoInterval) {
            let realposy = this.options.orientationX ?
                posy + this.options.marginX :
                canWidth - posy - 1;
            
            options.x = realposy - (posy.toString().length * 3);
            let infoText = new Text(posy.toString(), options);
            this.can.add(infoText);
        }
    }

    private generateGrid(): void {
        this.view = new Grid(this.options.marginX, this.options.marginY, this.options.width, this.options.height, {
            size: this.options.grid.size,
            color: this.options.grid.color,
            boldColor: this.options.grid.boldColor,
            infoInterval: this.options.infoInterval
        });
        this.can.add(this.view);

    //     let options2 = <fabric.IObjectOptions>{
    //         stroke: this.options.grid.color,
    //         strokeWidth: 1,
    //         selectable: false,
    //         hasControls: false,
    //         evented: false
    //     };

    //     for (let x = 0; x < this.options.height - 1; x += this.options.grid.size) {
    //         let line = new fabric.Line([ x, 0, x, this.options.width], options2);

    //         this.view.addWithUpdate(line);

    //         if (x % this.options.infoInterval === 0) {
    //             line.set({
    //                 stroke: this.options.grid.boldColor
    //             });
    //         };
    //     }

    //     for (let y = 0; y < this.options.width - 1; y += this.options.grid.size) {
    //         let line = new fabric.Line([ 0, y, this.options.height, y], options2);

    //         this.view.addWithUpdate(line);

    //         if (y % this.options.infoInterval === 0) {
    //             line.set({
    //                 stroke: this.options.grid.boldColor
    //             });
    //         };
    //     }

    //     // this.can.on('object:moving', e => {
    //     //     if (!this.options.grid.stick)
    //     //         return;

    //     //     e.target.set({
    //     //         left: Math.round(e.target.left / grid) * grid,
    //     //         top: Math.round(e.target.top / grid) * grid
    //     //     });
    //     // });
    }

    // private getRealPos(obj: fabric.Object): IPosition {
    //     return {
    //         left: obj.left - this.options.marginX,
    //         top: obj.top - this.options.marginY
    //     };
    // }

    private test(): void {
        let cache = new Draw(this.canvas2.nativeElement);

        cache.ctx.lineWidth = 1;

        cache.strokeStyle(this.options.grid.color);
        for (let x = 0.5; x < this.options.height - 1; x += this.options.grid.size) {
            if (x % this.options.infoInterval !== 0) {
                cache.line(x, 0, x, this.options.width);
            };
        }
        for (let y = 0.5; y < this.options.width - 1; y += this.options.grid.size) {
            if (y % this.options.infoInterval !== 0) {
                cache.line(0, y, this.options.height, y);
            };
        }
        cache.strokeStyle(this.options.grid.boldColor);
        for (let x = 0.5; x < this.options.height - 1; x += this.options.infoInterval) {
            cache.line(x, 0, x, this.options.width);
        }
        for (let y = 0.5; y < this.options.width - 1; y += this.options.infoInterval) {
            cache.line(0, y, this.options.height, y);
        }
    }
}