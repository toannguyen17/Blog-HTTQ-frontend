import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService}                from '../../services/authentication.service';
import {UserService}                          from '../../services/user.service';
import {PostPageable}                         from '../../models/post-pageable';

@Component({
    selector     : 'app-profile',
    templateUrl  : './profile.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

    searchText: string;
    page: number = 1;

    postPageable: PostPageable;

    constructor(
        public auth: AuthenticationService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.search();
    }

    onInput() {
        let search      = this.searchText.trim();
        this.searchText = search;
        this.search();
    }

    search() {
        let form = {
            key: this.searchText,
            page: this.page
        };
        console.log(form);

        this.userService.findPost(form).subscribe(response => {
            this.postPageable = response.data;
            console.log(this.postPageable);
        });
    }
    pageChange(event){
        console.log(this.page, event)
        this.page = event;
        this.search();
    }
}
