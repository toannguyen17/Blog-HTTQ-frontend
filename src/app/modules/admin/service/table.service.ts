import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {UserDetail} from '../interface/user-detail';
import {SortColumn, SortDirection} from '../directive/sortable.directive';
import {UserDetailService} from './userdetail.service';

interface SearchResult {
  users: UserDetail[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(users: UserDetail[], column: SortColumn, direction: string): UserDetail[] {
  if (direction === '' || column === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: UserDetail, term: string) {
  let firstName = user.firstName != null? user.firstName.toLowerCase().includes(term.toLowerCase()) : false;
  let lastName = user.lastName != null? user.lastName.toLowerCase().includes(term.toLowerCase()) : false;
  let address = user.address != null? user.address.toLowerCase().includes(term.toLowerCase()) : false;
  let mail = user.email != null? user.email.toLowerCase().includes(term.toLowerCase()) : false;
  let gender = user.gender != null? user.gender.toLowerCase().includes(term.toLowerCase()) : false;
  return firstName || lastName || address || mail || gender;
}

@Injectable({providedIn: 'root'})
export class TableService {
  public _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  public _users$ = new BehaviorSubject<UserDetail[]>([]);
  public _total$ = new BehaviorSubject<number>(0);
  public users: UserDetail[] = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
              private userDetailService: UserDetailService) {
    this.userDetailService.getAllUsers().subscribe(rs => {
      this.users = rs.data;
    })
    this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._users$.next(result.users);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let users = sort(this.users, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }
}
