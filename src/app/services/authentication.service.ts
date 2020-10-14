import {Injectable}                  from '@angular/core';
import {Router}                      from '@angular/router';
import {HttpClient}                  from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User}                        from '../models/user';
import {ResBase}                     from '../models/res-base';
import {ResAuth}                     from '../models/res-auth';
import {environment}                 from '../../environments/environment';
import {ChangePWRequest} from '../models/change-pwrequest';
import {UserService}                 from './user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public userSubject: BehaviorSubject<User>;
    public _user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this._user       = this.userSubject.asObservable();
    }

    public isLogin() {
        return !!this.getToken();
    }

    public get user(): User {
        return this.userSubject.value;
    }

    getToken() {
        return window.sessionStorage.getItem("token");
    }

    setToken(token: string) {
        window.sessionStorage.setItem("token", token);
    }

    login(form) {
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/auth/authenticate`, form, {withCredentials: true});
    }

    logout() {
        window.sessionStorage.removeItem("token");
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    keepLogin() {
        this.userService.getMe().subscribe(response => {
            if (response.status == 0){
                this.userSubject.next(response.data)
            }
            console.log(response)
        },error => {
            console.log(error)
        });
        this.refreshToken();

    }

    refreshToken() {
        return this.http.get<ResBase<string>>(`${environment.API_URL}/auth/refresh`).subscribe(response => {
            this.setToken(response.data);
            this.startRefreshTokenTimer();
            console.log('refreshToken', response);
        }, error => {
            console.log(error);
        });
    }

    // helper methods

    private refreshTokenTimeout;

    public startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        let token = this.getToken();
        const jwtToken = JSON.parse(atob(token.split('.')[1]));

        this.stopRefreshTokenTimer();

        // set a timeout to refresh the token a minute before it expires
        const expires            = new Date(jwtToken.exp * 1000);
        const timeout            = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
