import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDetail} from '../../interface/user-detail';
import {UserDetailService} from '../../service/userdetail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
    user: UserDetail;
    id: number;

    constructor(private userDetailService: UserDetailService, private router: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.userDetail();
    }

    userDetail(): void {
        this.id = this.router.snapshot.params.id;
        this.user = new UserDetail();
        this.userDetailService.getUserById(this.id).subscribe(value => {
            this.user = value;
        });
    }
}
