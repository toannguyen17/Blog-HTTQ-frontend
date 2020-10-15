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
    constructor(private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<ResBase<UserDetail[]>> {
        return this.httpClient.get<ResBase<UserDetail[]>>(`${environment.API_URL}/admin/users`);
    }

    getUserById(id:number): Observable<UserDetail> {
        return  this.httpClient.get<UserDetail>(`${environment.API_URL}/admin/users/${id}`)
    }
    deleteUserById(id:number): Observable<UserDetail> {
        return  this.httpClient.delete<UserDetail>(`${environment.API_URL}/admin/users/${id}`)
    }

    updateUser(userDetail: UserDetail): Observable<UserDetail> {
        return this.httpClient.put<UserDetail>(`${environment.API_URL}/admin/user`, userDetail)
    }


}
