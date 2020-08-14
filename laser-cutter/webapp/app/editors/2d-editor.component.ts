import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Canvas, Text, ITextOptions, Draw, Rect, Rectangle, Point, IEvent } from '../candraw';
import { Grid, Figures, Format } from './2d-editor.draw';

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

    @ViewChild('canvas', null)
    public canvas: ElementRef;
    public options: ITwoDEditorOptions;

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

    private can_wheel(e: IEvent): void {
        if (!e.ctrlKey) {
            return;
        }
        let v = e.wheelDeltaY / 1000;
        this.can.zoom -= v;
        this.can.needToDraw = true;
    }

    public ngOnInit(): void {

        this.can = new Canvas(this.canvas.nativeElement);
        this.can.event.sub('wheel', this.can_wheel.bind(this));
        //this.can.zoom = 1.5;

        this.generateGuids();

        this.generateGrid();

        // let firstText = new Text('testando', {
        //     x: 100,
        //     y: 100,
        //     fill: '#FF0000'
        // });
        // this.can.add(firstText);

        let rect = new Rect({
            x: 150,
            y: 150,
            width: 30,
            height: 30,
            fill: '#000000'
        })
        this.view.add(rect);


        let fig0 = new Figures(new Rectangle(10, 10, 100, 100));
        fig0.add(
            new Format(),
            [new Point(5, 5), new Point(30, 30)]
        );
        fig0.add(
            new Format(),
            [new Point(30, 60)]
        )
        this.view.add(fig0);
    }

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
    }
}