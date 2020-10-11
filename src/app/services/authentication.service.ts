import {Injectable}                  from '@angular/core';
import {Router}                      from '@angular/router';
import {HttpClient}                  from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map}                         from 'rxjs/operators';
import {User}                        from '../models/user';
import {ResBase}                     from '../models/res-base';
import {ResAuth}                     from '../models/res-auth';
import {environment}                 from '../../environments/environment';
import {UserService}                 from './user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public userSubject: BehaviorSubject<User>;
    public _user: Observable<User>;
    public _token: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this._user       = this.userSubject.asObservable();
    }

    public get user(): User {
        return this.userSubject.value;
    }

    public get token(): string {
        return this._token;
    }

    login(form) {
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/auth/authenticate`, form, {withCredentials: true});
    }

    logout() {
        this._token = null;
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken() {
        return this.http.post<ResBase<string>>(`${environment.API_URL}/auth/refresh`, {}, {withCredentials: true})
        .pipe(map((response) => {
            this._token = response.data;
            this.startRefreshTokenTimer();
            return response;
        }));
    }

    // helper methods

    private refreshTokenTimeout;

    public startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.token.split('.')[1]));

        this.stopRefreshTokenTimer();

        // set a timeout to refresh the token a minute before it expires
        const expires            = new Date(jwtToken.exp * 1000);
        const timeout            = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
