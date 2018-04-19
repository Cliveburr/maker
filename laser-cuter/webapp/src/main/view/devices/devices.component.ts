import { Component } from '@angular/core';
import { BaseView } from '../../view/baseview';
import { DevicesService } from '../../service';

@Component({
    templateUrl: 'devices.component.html',
    providers: [BaseView]
})
export class DevicesComponent {

    public constructor(
        private base: BaseView,
        public devicesService: DevicesService
    ) {
    }

    public doLogin(): void {
        //this.profileService.setLogged(true);
        //this.base.router.navigateByUrl('/');
    }
}