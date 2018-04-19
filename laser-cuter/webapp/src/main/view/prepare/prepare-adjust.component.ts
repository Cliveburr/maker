import { Component, OnInit } from '@angular/core';
import { BaseView } from '../../view/baseview';

@Component({
    templateUrl: 'prepare-adjust.component.html'
})
export class PrepareAdjustComponent implements OnInit {

    private fileContent: any;

    public constructor(
        private base: BaseView,
    ) {
    }

    public ngOnInit(): void {
        this.fileContent = this.base.params.data;

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(this.fileContent,"text/xml");

        console.log(this.fileContent, xmlDoc);
    }

}