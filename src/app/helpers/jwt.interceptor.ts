import {Injectable}                                           from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable}                                           from 'rxjs';
import {AuthenticationService}                                from '../services/authentication.service';
import {environment}                                          from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user       = this.authenticationService.user;
        const isLoggedIn = user && this.authenticationService.token;
        const isApiUrl   = request.url.startsWith(environment.API_URL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${this.authenticationService.token}`}
            });
        }

        return next.handle(request);
    }
}
