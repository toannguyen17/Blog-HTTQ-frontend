import {NgModule}                                from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent}                           from './components/home/home.component';
import {LoginFormComponent}                      from './components/login-form/login-form.component';
import {RegisterFormComponent}                   from './components/register-form/register-form.component';
import {GuestGuard}                              from '@app/helpers/guest.guard';
import {PostComponent}                           from '@app/components/post/post.component';
import {AuthGuard}                               from '@app/helpers/auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'post', component: PostComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginFormComponent, canActivate: [GuestGuard]},
    {path: 'register', component: RegisterFormComponent, canActivate: [GuestGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
