import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'user-list',
            component: UserListComponent
        }]
    },
];

@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        UserListComponent,
        UpdateUserComponent,
        UserDetailComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
    exports: [RouterModule]
})
export class AdminModule {
}
