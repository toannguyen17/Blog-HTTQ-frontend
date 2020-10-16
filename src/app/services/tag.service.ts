import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {environment} from '../../environments/environment';
import {Post}        from '../models/post';

@Injectable({providedIn: 'root'})
export class TagService {
    constructor(private http: HttpClient) {
    }

    public findPostByTagList(tags: string[], page: number) {
        return this.http.get<ResBase<any>>(`${environment.API_URL}/tags?t=` + tags.join('&t=') + '&page=' + page);
    }

    public findByTag(tag: string) {
        return this.http.get<ResBase<Post>>(`${environment.API_URL}/tag/${tag}`);
    }

    public findByTagContains(tag: string) {
        return this.http.get<ResBase<Post>>(`${environment.API_URL}/tag/${tag}`);
    }
}
