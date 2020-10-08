import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserProfile} from '../../interface/user-profile';
import {ProfileService} from '../../service/profile.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
    userProfile: UserProfile[] = [];

    constructor(private profileService: ProfileService) {
      this.getAll();
    }

    ngOnInit(): void {
    }

    getAll(): UserProfile[] {
        this.profileService.showProfile().subscribe(p => {
            this.userProfile = p;
        });
        return this.userProfile;
    }

}
