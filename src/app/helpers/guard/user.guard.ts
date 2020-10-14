import {Injectable}                                                       from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService}                                            from '../../services/authentication.service';
import {UserRole}                                                         from '../../models/user-role';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.user;
        if (user &&
            user.roles.filter(role => role == UserRole.ROLE_USER).length > 0
        ) {
            this.router.navigate(['/']);
            return true;
        }
        return false;
    }
}
