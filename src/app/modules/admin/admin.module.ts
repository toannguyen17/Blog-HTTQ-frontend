import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminComponent} from './components/admin/admin.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';

import {HttpClientModule} from '@angular/common/http';
import {TableComponent} from './components/table/table.component';
import {NgbdSortableHeader} from './directive/sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportComponent } from './components/report/report.component';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [{
            path: 'user-list',
            component: UserListComponent
        }]
    },
    {
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
            path: 'app-report',
            component: ReportComponent
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
        ReportComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        ChartsModule
    ],
    exports: [RouterModule]
})
export class AdminModule {
}
