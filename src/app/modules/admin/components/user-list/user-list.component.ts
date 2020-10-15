import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserDetail} from '../../interface/user-detail';
import {UserDetailService} from '../../service/userdetail.service';
import {TableComponent} from '../table/table.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    users: UserDetail[] = [];

    @ViewChild('componentT')
    componentT: TableComponent;

    constructor(private userDetailService: UserDetailService) {
        userDetailService.getAllUsers().subscribe(rs => {
            this.componentT.users = rs.data;
            this.users = rs.data;
        });

        console.log(this)
    }

    blockUser(id) {
        let user: UserDetail = {};
        let index: number = -1;
        for (let i = 0; i < this.users.length;i++) {
            if (this.users[i].id == id) {
                user = this.users[i];
                index = i;
                break;
            }
        }
        if (confirm('You are going to block user: ' + user.firstName + ' ' + user.lastName + ', id: ' + user.id + '. Are you sure?')) {
            this.userDetailService.blockUser(user).subscribe(rs => {
                alert(rs.msg);
                this.users[index].enabled = false;
                this.componentT.service.users = this.users;
                this.componentT.service._users$.next(this.users);
            });
        }
    }

    deleteUser(id){
        let user: UserDetail = {};
        let index: number = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i] == id) {
                user = this.users[i];
                index = i;
                break;
            }
        }
        if (confirm('You are going to delete user: ' + user.firstName + ' ' + user.lastName + ', id: ' + user.id + '. Are you sure?')) {
            this.userDetailService.deleteUser(user).subscribe(rs => {
                alert(rs.msg);
                this.users.splice(index,1);
                this.componentT.service.users = this.users;
                this.componentT.service._users$.next(this.users);
            });
        }
    }

    resetUserPw(id){
        let user: UserDetail = {};
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i] == id) {
                user = this.users[i];
                break;
            }
        }
        if (confirm("You are going to reset password of user: " + user.firstName + ' ' + user.lastName + ', id: ' + user.id + '. Are you sure?')){
            this.userDetailService.resetPassword(id).subscribe(rs=>{
                alert(rs.msg);
            })
        }
    }

    unblockUser(id){
        let user: UserDetail = {};
        let index: number = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                user = this.users[i];
                index = i;
                break;
            }
        }
        if (confirm('You are going to unblock user: ' + user.firstName + ' ' + user.lastName + ', id: ' + user.id + '. Are you sure?')) {
            this.userDetailService.unblockUser(user).subscribe(rs => {
                alert(rs.msg);
                this.users[index].enabled = true;
                this.componentT.service.users = this.users;
                this.componentT.service._users$.next(this.users);
            });
        }
    }
    ngOnInit(): void {
    }

}
