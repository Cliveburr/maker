import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BotDesignModule } from '../botdesign';
import { AppComponent } from './app.component';
import { AppRouting, VIEWS } from './app.routing';
import { BaseView } from '../view';
import { SERVICES } from '../service';
import { ALL_EDITORS } from '../editors';

@NgModule({
    imports: [BrowserModule, FormsModule, BotDesignModule, AppRouting],
    bootstrap: [AppComponent],
    declarations: [AppComponent, VIEWS, ALL_EDITORS],
    providers: [SERVICES, BaseView]
})
export class AppModule {
}