import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProfile} from '../interface/user-profile';
import {User} from '../interface/user';

const API_URL = `${environment.API_URL}`;

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    showProfile(): Observable<UserProfile[]> {
        return this.http.get<UserProfile[]>(API_URL + '/profile');
    }

    changePassword(id: number, user: User): Observable<User> {
        return this.http.put<User>(API_URL + `profile/${id}`, user);
    }
}
