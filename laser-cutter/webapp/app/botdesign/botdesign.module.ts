import { NgModule } from '@angular/core';

import { setTheme } from 'ngx-bootstrap/utils';
import { BsDropdownModule } from 'ngx-bootstrap';


@NgModule({
    imports: [BsDropdownModule.forRoot()],
    declarations: [],
    providers: [],
    exports: [BsDropdownModule]
})
export class BotDesignModule {

    public constructor() {
        setTheme('bs4');
    }
}