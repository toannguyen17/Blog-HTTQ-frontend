import {Injectable}                                                       from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService}                                            from '../../services/authentication.service';

@Injectable({providedIn: 'root'})
export class GuestGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.user;
        if (user) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}
