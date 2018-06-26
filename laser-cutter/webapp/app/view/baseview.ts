import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsService } from '../service';

@Injectable()
export class BaseView {

    public constructor(
        public route: ActivatedRoute,
        public router: Router,
        public params: ParamsService
    ) {
    }
}