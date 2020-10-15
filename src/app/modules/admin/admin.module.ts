import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './components/admin/admin.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';

import {HttpClientModule} from '@angular/common/http';
import {TableComponent} from './components/table/table.component';
import {NgbdSortableHeader} from './directive/sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CreateUserComponent} from './components/create-user/create-user.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'user-list',
            component: UserListComponent
        }]
    }, {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'user-detail/:id',
            component: UserDetailComponent
        }]
    },
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'create-user',
            component: CreateUserComponent
        }]
    },
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'update-user',
            component: UpdateUserComponent
        }]
    }
];

// @ts-ignore
@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        UserListComponent,
        UpdateUserComponent,
        UserDetailComponent,
        TableComponent,
        NgbdSortableHeader,
        CreateUserComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    exports: [RouterModule]
})
export class AdminModule {
}
