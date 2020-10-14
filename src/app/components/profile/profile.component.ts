import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserInfo} from '../../models/userInfo';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

    constructor(
        public auth: AuthenticationService) {
    }

    ngOnInit() {
    }

}
