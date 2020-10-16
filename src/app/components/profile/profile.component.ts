import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService}                from '../../services/authentication.service';
import {UserService}                          from '../../services/user.service';
import {PostPageable}                         from '../../models/post-pageable';
import {Title}                                from '@angular/platform-browser';

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
        private userService: UserService,
        private title: Title
    ) {
    }

    ngOnInit() {
        this.title.setTitle('Profile - Blog HTTQ');
        this.search();
    }

    onInput() {
        let search      = this.searchText.trim();
        this.searchText = search;
        this.search();
    }

    search() {
        let form = {
            key : this.searchText,
            page: this.page
        };
        console.log(form);

        this.userService.findPost(form).subscribe(response => {
            this.postPageable = response.data;
            console.log(this.postPageable);
        });
    }

    pageChange(event) {
        console.log(this.page, event);
        this.page = event;
        this.search();
    }

    change(event) {
        if (event.target.files && event.target.files[0]) {
            let file       = event.target.files[0];
            const formData = new FormData();
            console.log(formData);
            console.log(file);
            formData.append('file', file, file.name);
            this.userService.uploadAvatar(formData).subscribe(response => {
                if (response.status == 0) {
                    let user    = this.auth.user;
                    user.avatar = response.data.url;
                    this.auth.userSubject.next(user);
                }
                console.log(response);
            });
        }
    }

    changerAvatar() {
        let inputFile    = document.createElement('input');
        inputFile.type   = 'file';
        inputFile.accept = 'image/*';
        inputFile.click();
        inputFile.addEventListener('change', this.change.bind(this));
    }
}
