import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {ResAuth}     from '../models/res-auth';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private http: HttpClient) {
    }

    save(form){
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/post`, form);
    }
}
