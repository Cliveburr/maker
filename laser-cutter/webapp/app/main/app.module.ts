//import 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRouting, VIEWS } from './app.routing';
import { BaseView } from '../view';
import { SERVICES } from '../service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatCardModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
const MATERIAL = [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
    imports: [BrowserModule, FormsModule, MATERIAL, AppRouting],
    bootstrap: [AppComponent],
    declarations: [AppComponent, VIEWS],
    providers: [SERVICES, BaseView]
})
export class AppModule {
}