import {NgModule}                from '@angular/core';
import {Routes, RouterModule}    from '@angular/router';
import {HomeComponent}           from './components/home/home.component';
import {LoginFormComponent}      from './components/login-form/login-form.component';
import {RegisterFormComponent}   from './components/register-form/register-form.component';
import {ProfileComponent}        from './components/profile/profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {GuestGuard}              from './helpers/guard/guest.guard';
import {PostViewComponent}       from './components/post-view/post-view.component';
import {UpdateUserComponent}     from './modules/admin/components/update-user/update-user.component';
import {TagsComponent}           from './components/tags/tags.component';

const routes: Routes = [
    {
        path     : '',
        component: HomeComponent
    },
    {
        path        : 'post',
        loadChildren: () => import('./modules/form-post.module').then(m => m.FormPostModule)
    },
    //admin
    {
        path        : 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'updateUser',
        component: UpdateUserComponent
    },
    //
    {
        path     : 'login',
        component: LoginFormComponent, canActivate: [GuestGuard]
    },
    {
        path     : 'register',
        component: RegisterFormComponent, canActivate: [GuestGuard]
    },
    {
        path     : 'profile',
        component: ProfileComponent
    },
    {
        path     : 'editProfile',
        component: ChangePasswordComponent
    },
    {
        path     : 'tags',
        component: TagsComponent
    },
    {
        path     : ':seo',
        component: PostViewComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
