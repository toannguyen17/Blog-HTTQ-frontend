import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDetail} from '../../interface/user-detail';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDetailService} from '../../service/userdetail.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private userDetailService: UserDetailService) {
    }

    save() {
        if (this.formGroup.valid) {
            // let user: UserDetail = {
            //     firstName: this.formGroup.get('firstName').value,
            //     lastName: this.formGroup.get('lastName').value,
            //     email: this.formGroup.get('email').value,
            //     phone: this.formGroup.get('phone').value,
            //     gender: this.formGroup.get('gender').value,
            //     address: this.formGroup.get('address').value,
            //     accountNonExpired: this.formGroup.get('accountNonExpired').value,
            //     credentialsNonExpired: this.formGroup.get('credentialsNonExpired').value,
            //     accountNonLocked: this.formGroup.get('accountNonLocked').value,
            //     enabled: this.formGroup.get('enabled').value
            // };
            // console.log(user);
            this.userDetailService.createUser(this.formGroup.value).subscribe(rs => {
                alert(rs.msg);
            });
        }
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            gender: ['Male', [Validators.required]],
            address: ['', []],
            enabled: [''],
            accountNonExpired: [''],
            credentialsNonExpired: [''],
            accountNonLocked: [''],
        });
    }

}
