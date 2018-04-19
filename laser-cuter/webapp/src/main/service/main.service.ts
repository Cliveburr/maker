import { Injectable, APP_INITIALIZER, Injector } from '@angular/core'

@Injectable()
export class MainService {

    public constructor(
    ) {
    }

    public load(): Promise<any> {
        return Promise.all([
        ]);
    }
}

export function MainProviderFactory(mainService: MainService): any {
    return () => mainService.load()
};

export const MainProviders = [
    MainService,
    {
        provide: APP_INITIALIZER,
        useFactory: MainProviderFactory,
        deps: [MainService],
        multi: true
    }
];