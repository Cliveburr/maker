import { Component } from '@angular/core';


@Component({
    selector: 'publicLayout',
    templateUrl: 'public-layout.component.html',
    styleUrls: ['public-layout.component.scss']
})
export class PublicLayoutComponent {

    public layoutAlign: string;

    public constructor() {
        console.log('hit here');
        this.layoutAlign = 'center center';
    }
}