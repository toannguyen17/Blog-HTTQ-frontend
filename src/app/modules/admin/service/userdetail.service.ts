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


    deleteUser(user) {
        return this.httpClient.delete<ResBase<UserDetail>>(`${environment.API_URL}/admin/users/${user.id}`);
    }

    blockUser(user) {
        return this.httpClient.put<ResBase<UserDetail>>(`${environment.API_URL}/admin/block-user`, user);
    }

    unblockUser(user) {
        return this.httpClient.put<ResBase<UserDetail>>(`${environment.API_URL}/admin/unblock-user`, user);
    }

    updateUser(id: number, userDetail: UserDetail) {
        return this.httpClient.put<ResBase<UserDetail>>(`${environment.API_URL}/admin/updateUser/${id}`, userDetail);
    }

    createUser(user) {
        return this.httpClient.post<ResBase<UserDetail>>(`${environment.API_URL}/admin/users`, user);
    }

    getUserById(id) {
        return this.httpClient.get<ResBase<UserDetail>>(`${environment.API_URL}/admin/users/${id}`);
    }

    getUserDetailById(id) {
        return this.httpClient.get<ResBase<UserDetail>>(`${environment.API_URL}/admin/showUser/${id}`);
    }

    resetPassword(id) {
        return this.httpClient.put<ResBase<UserDetail>>(`${environment.API_URL}/admin/resetpw`, id);
    }
}
