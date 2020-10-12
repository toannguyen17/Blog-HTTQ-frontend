import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IChangePW}                            from '../../interface/ichange-pw';
import {ChangepwService}                    from '../../service/changepw.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
               selector: 'app-change-password',
               templateUrl: './change-password.component.html',
               styleUrls: ['./change-password.component.scss'],
               encapsulation: ViewEncapsulation.None
           })
export class ChangePasswordComponent implements OnInit {
    formGroup: FormGroup;
    message: string = '';

    constructor(private cpwService: ChangepwService,
                private formBuilder: FormBuilder) {
    }

    changePw() {
        let data = {
            email: '',
            password: this.formGroup.get('password').value,
            newPassword: this.formGroup.get('newPassword').value,
            cfNewPassword: this.formGroup.get('cfNewPassword').value
        };
        if (this.formGroup.valid) {
            this.cpwService.changePassword(data).subscribe(rs => {
                this.message = rs.msg;
            });
        }

    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group(
            {
                password: ['', [Validators.required, Validators.minLength(6)]],
                newPassword: ['', [Validators.required, Validators.minLength(6)]],
                cfNewPassword: ['', [Validators.required, Validators.minLength(6)]]
            }
        );
    }

}
