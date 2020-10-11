import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfilesComponent implements OnInit {
    id: number;
    user: User;

    constructor(private activeRoute: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit(): void {
        this.id = this.activeRoute.snapshot.params['id'];
        this.userService.getById(this.id).subscribe(data => {
            this.user = data;
            // tslint:disable-next-line:no-unused-expression
        }), error => console.log(error);
    }

}
