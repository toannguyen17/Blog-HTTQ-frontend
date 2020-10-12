import {Injectable}                   from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IChangePW}                    from '../interface/ichange-pw';
import {Observable}                   from 'rxjs';
import {ResBase}                      from '../models/res-base';
import {environment}                  from '../../environments/environment';

@Injectable({
                providedIn: 'root'
            })
export class ChangepwService {
    public changePassword(request: IChangePW): Observable<ResBase<boolean>> {
        return this.httpClient.post<ResBase<boolean>>(`${environment.API_URL}/changepw`, request);

    }

    constructor(private httpClient: HttpClient) {
    }
}
