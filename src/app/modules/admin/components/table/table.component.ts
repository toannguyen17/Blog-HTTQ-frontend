import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../../directive/sortable.directive';
import {UserDetail} from '../../interface/user-detail';
import {TableService} from '../../service/table.service';

import {UserDetailService} from '../../service/userdetail.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
    users$: Observable<UserDetail[]>;
    total$: Observable<number>;
    userService: UserDetailService;
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: TableService
    ) {
        this.users$ = service.users$;
        this.total$ = service.total$;
    }

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }

    deleteUser(id: number): void {
        this.userService.deleteUserById(id).subscribe(user => {
            console.log(user);
        });
    }

    ngOnInit(): void {
    }
}
