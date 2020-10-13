import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators}   from '@angular/forms';
import {Router}                               from '@angular/router';
import {AuthenticationService}                from '../../services/authentication.service';
import {ToastService}                         from '../../services/toast.service';

@Component({
    selector     : 'app-login-form',
    templateUrl  : './login-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService,
        private router: Router,
        private toast: ToastService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email   : ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (!this.form.invalid) {
            this.authentication.login(this.form.value).subscribe(
                response => {
                    this.authentication.setToken(response.data.token);
                    this.authentication.userSubject.next(response.data.user)
                    this.authentication.startRefreshTokenTimer();
                    this.router.navigateByUrl("/")
                    this.toast.show('Login success.', {
                        class: 'bg-success text-light'
                    })
                },
                error => {
                    let text_err = 'Login error.';
                    switch (error.status){
                        case 422:
                            text_err = error.error.msg;
                            break;
                    }

                    this.toast.show(text_err, {
                        class: 'bg-danger text-light'
                    })
                    console.log(error);
                },
            );
        }
    }
}
