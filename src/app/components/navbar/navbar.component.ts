import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService}                       from '../../services/authentication.service';

@Component({
    selector     : 'app-navbar',
    templateUrl  : './navbar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

    @Input('hour')
    today: number;

    constructor(public auth: AuthenticationService) {
    }

    ngOnInit(): void {
    }

}
