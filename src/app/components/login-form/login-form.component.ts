import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators}   from '@angular/forms';
import {Router}                               from '@angular/router';
import {AuthenticationService}                from '../../services/authentication.service';

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
        private router: Router
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
                    this.authentication._token = response.data.token;
                    this.authentication.userSubject.next(response.data.user);
                    this.authentication.startRefreshTokenTimer();
                    this.router.navigateByUrl("/")
                },
                error => {
                    console.log(error);
                },
            );
        }
    }
}
