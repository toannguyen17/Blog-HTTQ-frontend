import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {environment} from '../../environments/environment';
import {Home}        from '../models/home';

@Injectable({providedIn: 'root'})
export class HomeService {
    constructor(private http: HttpClient) {
    }

    public get(){
        return this.http.get<ResBase<Home>>(`${environment.API_URL}/home`);
    }
}
