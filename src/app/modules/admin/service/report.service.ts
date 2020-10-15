import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResBase} from '../../../models/res-base';
import {environment} from '../../../../environments/environment';
import {Report} from '../interface/report';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private httpClient: HttpClient) {
    }

    getReport(): Observable<ResBase<Report>> {
        return this.httpClient.get<ResBase<Report>>(`${environment.API_URL}/admin/report`);
    }
}
