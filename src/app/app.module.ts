import {BrowserModule}             from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule}                    from './app-routing.module';
import {AppComponent}                        from './app.component';
import {ChangePasswordComponent}             from './components/change-password/change-password.component';
import {ProfileComponent}                    from './components/profile/profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor}                      from './helpers/jwt.interceptor';
import {appInitializer}                      from './helpers/app.initializer';
import {ErrorInterceptor}                    from './helpers/error.interceptor';
import {AuthenticationService}               from './services/authentication.service';

@NgModule({
    declarations: [
        AppComponent,
        ChangePasswordComponent,
        ProfileComponent,
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers   : [
        {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService]},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
