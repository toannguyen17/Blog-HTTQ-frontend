import {NgModule}                                from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent}                           from './components/home/home.component';
import {LoginFormComponent}                      from './components/login-form/login-form.component';
import {RegisterFormComponent}                   from './components/register-form/register-form.component';
import {PostComponent}                           from './components/post/create/post.component';
import {GuestGuard}                              from './helpers/guest.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'post', component: PostComponent},
    {path: 'login', component: LoginFormComponent, canActivate: [GuestGuard]},
    {path: 'register', component: RegisterFormComponent, canActivate: [GuestGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
