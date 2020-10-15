import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDetail} from '../../interface/user-detail';
import {UserDetailService} from '../../service/userdetail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

    formGroup: FormGroup;
    user: UserDetail = {};

    constructor(private userDetailService: UserDetailService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            address: ['', []],
            email: ['', [Validators.email]],
            phone: ['', [Validators.required]],
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
            this.user = rs.data;

            console.log(rs);
            this.formGroup.patchValue({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                address: this.user.address,
                email: this.user.email,
                phone: this.user.phone,
                attempts: this.user.attempts,
                createdAt: this.user.createdAt,
                updatedAt: this.user.updateAt,
                enabled: this.user.enabled,
                accountNonExpired: this.user.accountNonExpired,
                credentialsNonExpired: this.user.credentialsNonExpired,
                accountNonLocked: this.user.accountNonLocked
            })
        });
    }
}
