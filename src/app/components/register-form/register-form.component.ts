import {Component, OnInit, ViewEncapsulation}                from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router}                                              from '@angular/router';
import {AuthenticationService}                               from '../../services/authentication.service';
import {UserService}                                         from '../../services/user.service';
import {ToastService}                                        from '../../services/toast.service';

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
        private userService: UserService,
        private toast: ToastService
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
        if (this.form.valid) {
            this.userService.signUp(this.form.value).subscribe(
                response => {
                    if (response.status == 0){
                        this.authentication.setToken(response.data.token);
                        this.authentication.userSubject.next(response.data.user);
                        this.authentication.startRefreshTokenTimer();
                        this.router.navigateByUrl('/');
                        this.toast.show(response.msg, {
                            class: 'bg-success text-white'
                        });
                    }else{
                        console.log(response);
                        this.toast.show(response.msg, {
                            class: 'bg-danger text-white'
                        });
                    }
                },
                error => {
                    this.toast.show('Erorr !!', {
                        class: 'bg-danger text-white'
                    });
                    console.error(error);
                }
            );
        }else{
            this.toast.show('Enter the required fields', {
                class: 'bg-danger text-white'
            });
        }
        console.log(this.form.value);
    }
}
