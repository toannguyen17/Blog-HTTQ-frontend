import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDetail} from '../../interface/user-detail';
import {UserDetailService} from '../../service/userdetail.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    users: UserDetail[] = [];

    constructor(private userDetailService: UserDetailService) {
        userDetailService.getAllUsers().subscribe(rs => {
            this.users = rs.data;
        });
    }


    ngOnInit(): void {
    }

}
