import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {ResAuth}     from '../models/res-auth';
import {environment} from '../../environments/environment';
import {User}        from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    signUp(form){
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/auth/signup`, form);
    }

    getMe() {
        return this.http.get<ResBase<User>>(`${environment.API_URL}/user/me`, {withCredentials: true});
    }

    getAll() {
        return this.http.get<ResBase<User[]>>(`${environment.API_URL}/users`);
    }
}
