import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {environment} from '../../environments/environment';
import {Post}        from '../models/post';
import {ReViewPost}  from '../models/reViewPost';
import {CommentPage} from '../models/commentPage';
import {Comment} from '../models/comment';

@Injectable({providedIn: 'root'})
export class CommentService {
    constructor(private http: HttpClient) {
    }

    public save(form){
        return this.http.post<ResBase<Comment>>(`${environment.API_URL}/comment`, form, {withCredentials: true});
    }

    public update(form){
        return this.http.put<ResBase<ReViewPost>>(`${environment.API_URL}/comment`, form, {withCredentials: true});
    }

    public getComment(form){
        return this.http.post<ResBase<CommentPage>>(`${environment.API_URL}/comment/page`, form);
    }

    public deleteById(id: number){
        return this.http.delete<ResBase<Post>>(`${environment.API_URL}/comment/${id}`, {withCredentials: true});
    }
}
