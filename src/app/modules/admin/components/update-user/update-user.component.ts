import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDetailService} from '../../service/userdetail.service';
import {UserDetail} from '../../interface/user-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePWRequest} from '../../../../models/change-pwrequest';
import {ChangePWRequestService} from '../../../../services/change-pwrequest.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UpdateUserComponent implements OnInit {
    formGroup: FormGroup;
    userDetail: UserDetail = {};
    changePwFormGroup: FormGroup;

    constructor(private userDetailService: UserDetailService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,){
    }

    save() {
        console.log(this.formGroup.value);
        if (confirm('Once you saved changes, you can not undo. Are you sure?')) {
            this.userDetailService.updateUser(this.userDetail.id, this.formGroup.value).subscribe(rs => {
                this.userDetail = rs.data;
                alert(rs.msg);
                this.router.navigate(['/admin/user-list']);
            });
        }
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            address: ['', []],
            email: ['', [Validators.email]],
            phone: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            attempts: [''],
            createdAt: [''],
            updatedAt: '',
            enabled: [''],
            accountNonExpired: [''],
            credentialsNonExpired: [''],
            accountNonLocked: ['']
        });

        let id: number = this.activatedRoute.snapshot.params.id;


        this.userDetailService.getUserDetailById(id).subscribe(rs => {
            this.userDetail = rs.data;

            this.formGroup.patchValue({
                firstName: this.userDetail.firstName,
                lastName: this.userDetail.lastName,
                address: this.userDetail.address,
                email: this.userDetail.email,
                phone: this.userDetail.phone,
                gender: this.userDetail.gender,
                attempts: this.userDetail.attempts,
                createdAt: this.userDetail.createdAt,
                updatedAt: this.userDetail.updateAt,
                enabled: this.userDetail.enabled,
                accountNonExpired: this.userDetail.accountNonExpired,
                credentialsNonExpired: this.userDetail.credentialsNonExpired,
                accountNonLocked: this.userDetail.accountNonLocked
            })
        });
    }


}
