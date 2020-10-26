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
    form: FormGroup;
    formChangePW: FormGroup;

    constructor(private auth: AuthenticationService,
                private userService: UserService,
                private changePWRequestService: ChangePWRequestService,
                private fromBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.fromBuilder.group({
            email: [this.auth.user.email, [Validators.email]],
            firstName: [this.auth.user.firstName, [Validators.required]],
            lastName: [this.auth.user.lastName, [Validators.required]],
            phone: [this.auth.user.phone, []],
            gender: [this.auth.user.gender, [Validators.required]],
            address: [this.auth.user.address, []]
        });
        this.formChangePW = this.fromBuilder.group({
            password: [''],
            newPassword: [''],
            confirmNewPassword: ['']
        });
    }

    updateUser() {
        if (this.form.valid) {
            this.userService.updateUser(this.auth.user.id, this.form.value).subscribe(value => {
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
        if (this.formChangePW.value.newPassword == this.formChangePW.value.confirmNewPassword) {
            this.changePWRequestService.changePassword(this.formChangePW.value).subscribe(response => {
                if (response.status == 0) {
                    this.router.navigate(['profile']);
                    alert('Đổi thành công')
                } else {
                    alert("Nhập sai mật khẩu")
                }
            });
        } else {
            alert('Mật khẩu mới không khớp');
        }
    }
}
