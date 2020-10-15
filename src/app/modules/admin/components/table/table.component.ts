import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../../directive/sortable.directive';
import {UserDetail} from '../../interface/user-detail';
import {TableService} from '../../service/table.service';
import {UserDetailService} from '../../service/userdetail.service';
import {tsStructureIsReused} from '@angular/compiler-cli/src/transformers/util';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
    users: UserDetail[] = [];


    users$: Observable<UserDetail[]>;
    total$: Observable<number>;
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    @Output('blockUser') blockUser: EventEmitter<any> = new EventEmitter<any>();
    @Output('deleteUser') deleteUser: EventEmitter<any> = new EventEmitter<any>();
    @Output('unblockUser') unblockUser: EventEmitter<any> = new EventEmitter<any>();
    @Output('resetUserPw') resetUserPw: EventEmitter<any> = new EventEmitter<any>();

    constructor(public service: TableService,
                private userDetailService: UserDetailService
    ) {
        this.users$ = service.users$;
        this.total$ = service.total$;
    }

    refresh() {

    }
    resetPw(id){
        this.resetUserPw.emit(id);
    }

    delete(id) {
        this.deleteUser.emit(id);
    }

    block(user) {
        if (user.enabled) {
            this.blockUser.emit(user.id);
        } else {
            this.unblockUser.emit(user.id);
        }

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

    ngOnInit(): void {
    }
}
