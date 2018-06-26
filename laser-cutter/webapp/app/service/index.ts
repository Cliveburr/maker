export * from './devices.service';
export * from './main.service';
export * from './params.service';

import { DevicesService } from './devices.service';
import { MainService, MainProviders } from './main.service';
import { ParamsService } from './params.service';
export const SERVICES = [
    DevicesService,
    MainService,
    MainProviders,
    ParamsService
];