import { Component } from '@angular/core';
import { BaseView } from '../../view/baseview';

@Component({
    templateUrl: 'prepare.component.html'
})
export class PrepareComponent {

    public constructor(
        private base: BaseView,
    ) {
    }

    public fileChange(event: Event): void {
        let fileList: FileList = (<any>event.target).files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = this.onLoadFile.bind(this);
        }
    }

    private onLoadFile(event: ProgressEvent): void {
        let content = (<any>event.target).result;

        this.base.params.data = content;
        this.base.router.navigateByUrl('prepare/adjust')
    }
}