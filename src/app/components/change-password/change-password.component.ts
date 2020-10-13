import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangePWRequestService} from '../../services/change-pwrequest.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
    from: FormGroup;
    // changePWRequest: ChangePWRequest = {};

    constructor(private auth: AuthenticationService,
                private userService: UserService,
                private changePWRequestService: ChangePWRequestService,
                private fromBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.from = this.fromBuilder.group({
            email: [this.auth.user.email],
            firstName: [this.auth.user.firstName, [Validators.required]],
            lastName: [this.auth.user.lastName, []],
            phone: [this.auth.user.phone, []],
            gender: [this.auth.user.gender, []],
            address: [this.auth.user.address, []]
        });
    }

    updateUser() {
        if (this.from.valid) {
            this.userService.updateUser(this.auth.user.id, this.from.value).subscribe(value => {
                alert('Information changed successfully');
                this.auth.userSubject.next(value.data);
                this.router.navigate(['/profile']);
                console.log(this.auth.user);
            });
        } else {
            alert('Not information changed');
        }
    }

    changePassword() {

    }


}
