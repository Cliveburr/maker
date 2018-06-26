import { Component } from '@angular/core';
import { BaseView } from '../../view/baseview';

@Component({
    templateUrl: 'simulate.component.html',
    providers: [BaseView]
})
export class SimulateComponent {

    public constructor(
        private base: BaseView,
    ) {
    }

    public doLogin(): void {
        //this.profileService.setLogged(true);
        //this.base.router.navigateByUrl('/');
    }
}