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
    user: UserDetail = {};
    changePwRequest: ChangePWRequest = {};
    changePwFormGroup: FormGroup;

    constructor(private userDetailService: UserDetailService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private changePwService: ChangePWRequestService) {
        let id: number = activatedRoute.snapshot.params.id;
        userDetailService.getUserById(id).subscribe(rs => {
            this.user = rs.data;
        });
    }

    save() {
        if (confirm('Once you saved changes, you can not undo. Are you sure?')) {
            this.userDetailService.updateUser(this.user).subscribe(rs => {
                this.user = rs.data;
                alert(rs.msg);
                this.router.navigate(['user-list']);
            });
        }
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            firstName: [this.user.firstName, [Validators.required]],
            lastName: [this.user.lastName, [Validators.required]],
            address: [this.user.address, []],
            email: [this.user.email, [Validators.email]],
            phone: [this.user.phone, [Validators.required]],
        });
        this.changePwFormGroup = this.formBuilder.group({
            password: ['',[Validators.required,Validators.minLength(6)]],
            newPassword: ['',[Validators.required,Validators.minLength(6)]]
        })
    }


}
