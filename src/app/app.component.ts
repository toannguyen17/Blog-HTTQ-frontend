import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService}                from './services/authentication.service';

@Component({
    selector     : 'app-root',
    templateUrl  : './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    title = 'Blog-HTTQ-frontend';
    today = new Date().getHours();

    constructor(private auth: AuthenticationService) {
    }

    ngOnInit() {
        if (this.auth.isLogin()){
            this.auth.keepLogin();
        }
        console.log(this)
    }
}
