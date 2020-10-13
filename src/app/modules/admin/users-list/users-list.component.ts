import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User}                                   from '../../../interface/user';
import {UserService}                            from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
getUser(){
    this.userService.getAll().subscribe(rs => {
      this.users = rs.data;
    })
}

}
