import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {User}        from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getMe() {
        return this.http.get<User>(`${environment.API_URL}/me`);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.API_URL}/users`);
    }
}
