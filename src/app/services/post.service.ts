import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {ResAuth}     from '../models/res-auth';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private http: HttpClient) {
    }

    public save(form){
        return this.http.post<ResBase<any>>(`${environment.API_URL}/post`, form);
    }

    public findBySeo(seo: string){
        return this.http.get<ResBase<any>>(`${environment.API_URL}/post/${seo}`);
    }
}
