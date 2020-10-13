import {Component, OnInit, ViewEncapsulation}                from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router}                                              from '@angular/router';
import {AuthenticationService}                               from '../../services/authentication.service';
import {UserService}                                         from '../../services/user.service';

@Component({
    selector     : 'app-register-form',
    templateUrl  : './register-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RegisterFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authentication: AuthenticationService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName      : ['', [Validators.required]],
            lastName       : ['', [Validators.required]],
            email          : ['', [Validators.required]],
            gender         : ['male', [Validators.required]],
            password       : ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
        }, {validator: this.comparePassword});
    }

    comparePassword(check: AbstractControl) {
        const v = check.value;
        return (v.password === v.confirmPassword) ? null : {
            password_not_match: true
        };
    }

    onSubmit() {
        if (!this.form.invalid) {
            this.userService.signUp(this.form.value).subscribe(
                response => {
                    this.authentication.setToken(response.data.token);
                    this.authentication.userSubject.next(response.data.user)
                    this.authentication.startRefreshTokenTimer();
                    this.router.navigateByUrl("/")
                    console.log(response);
                },
                error => {
                    console.error(error);
                }
            );
        }
        console.log(this);
    }
}
