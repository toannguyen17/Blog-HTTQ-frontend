import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TableComponent} from './components/table/table.component';
import {NgbdSortableHeader} from './directive/sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
        TableComponent,
        TableComponent,
        NgbdSortableHeader],
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
