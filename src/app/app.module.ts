import {BrowserModule}             from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule}      from './app-routing.module';
import {AppComponent}          from './app.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {LoginFormComponent}    from './components/login-form/login-form.component';
import {HomeComponent}         from './components/home/home.component';
import {NavbarComponent}       from './components/navbar/navbar.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor}                      from './helpers/jwt.interceptor';
import {ErrorInterceptor}                    from './helpers/error.interceptor';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {PostViewComponent}                   from './components/post-view/post-view.component';
import { SeekComponent }        from './components/seek/seek.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './components/toast/toast-container/toast-container.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterFormComponent,
        LoginFormComponent,
        HomeComponent,
        NavbarComponent,
        PostViewComponent,
        SeekComponent,
        ProfileComponent,
        ChangePasswordComponent
        SeekComponent,
        ToastContainerComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
    ],
    providers   : [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
