import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {environment} from '../../environments/environment';
import {Post}        from '../models/post';
import {ReViewPost}  from '../models/reViewPost';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private http: HttpClient) {
    }

    public save(form){
        return this.http.post<ResBase<ReViewPost>>(`${environment.API_URL}/post`, form, {withCredentials: true});
    }

    public update(form){
        return this.http.put<ResBase<ReViewPost>>(`${environment.API_URL}/post`, form, {withCredentials: true});
    }

    public findBySeo(seo: string){
        return this.http.get<ResBase<Post>>(`${environment.API_URL}/post/${seo}`);
    }

    public deleteBySeo(seo: string){
        return this.http.delete<ResBase<Post>>(`${environment.API_URL}/post/${seo}`, {withCredentials: true});
    }
}
