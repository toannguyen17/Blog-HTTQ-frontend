import {Injectable}                  from '@angular/core';
import {Router}                      from '@angular/router';
import {HttpClient}                  from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map}                         from 'rxjs/operators';
import {environment}                 from '@environments/environment';
import {User}                        from '@app/models/user';
import {UserService}                 from '@app/services/user.service';
import {ResBase}                     from '@app/models/res-base';
import {ResAuth}                     from '@app/models/res-auth';

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

    login(email: string, password: string) {
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/auth/authenticate`, {email, password}, {withCredentials: true});
    }

    logout() {
        this._token = null;
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${environment.API_URL}/auth/refresh`, {}, {withCredentials: true})
        .pipe(map((token) => {
            this._token = token;
            this.startRefreshTokenTimer();
            return token;
        }));
    }

    // helper methods

    private refreshTokenTimeout;

    public startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.token.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires            = new Date(jwtToken.exp * 1000);
        const timeout            = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
