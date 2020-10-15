import {Injectable}  from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {ResBase}     from '../models/res-base';
import {ResAuth}     from '../models/res-auth';
import {environment} from '../../environments/environment';
import {User}        from '../models/user';
import {PostFindByUser} from '../models/post-find-by-user';
import {PostPageable}   from '../models/post-pageable';
import {ResImage}       from '../models/res-image';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    signUp(form){
        return this.http.post<ResBase<ResAuth>>(`${environment.API_URL}/auth/signup`, form);
    }

    getMe() {
        return this.http.get<ResBase<User>>(`${environment.API_URL}/user/me`, {withCredentials: true});
    }

    getAll() {
        return this.http.get<ResBase<User[]>>(`${environment.API_URL}/users`);
    }

    updateUser(id: number, user: User) {
        return this.http.put<ResBase<User>>(`${environment.API_URL}/info/updateProfile/${id}`, user);
    }

    findPost(form: PostFindByUser) {
        return this.http.post<ResBase<PostPageable>>(`${environment.API_URL}/user/post/search`, form);
    }

    uploadAvatar(form){
        return this.http.post<ResBase<ResImage>>(`${environment.API_URL}/user/uploadAvatar`, form);
    }
}
