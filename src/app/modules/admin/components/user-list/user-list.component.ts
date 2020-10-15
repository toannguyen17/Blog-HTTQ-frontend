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

    blockUser(id) {
        let user: UserDetail = {};
        for (let u of this.users) {
            if (u.id == id) {
                user = u;
                break;
            }
        }
        if (confirm('You are going to block user: ' + user.firstName + ' ' + user.lastName + 'id: ' + user.id + '. Are you sure?')) {
            this.userDetailService.blockUser(user).subscribe(rs => {
                confirm(rs.msg);
            });
        }
    }

    deleteUser(id){
        let user: UserDetail = {};
        for (let u of this.users) {
            if (u.id == id) {
                user = u;
                break;
            }
        }
        if (confirm('You are going to delete user: ' + user.firstName + ' ' + user.lastName + 'id: ' + user.id + '. Are you sure?')) {
            this.userDetailService.deleteUser(user).subscribe(rs => {
                confirm(rs.msg);
            });
        }
    }
    ngOnInit(): void {
    }

}
