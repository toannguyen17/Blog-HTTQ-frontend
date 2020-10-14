import {Injectable} from '@angular/core';
import {UserDetail} from '../interface/user-detail';
import {HttpClient} from '@angular/common/http';
import {ResBase} from '../../../models/res-base';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserDetailService {

    getAllUsers(): Observable<ResBase<UserDetail[]>> {
        return this.httpClient.get<ResBase<UserDetail[]>>(`${environment.API_URL}/admin/users`);
    }

    constructor(private httpClient: HttpClient) {
    }
}
