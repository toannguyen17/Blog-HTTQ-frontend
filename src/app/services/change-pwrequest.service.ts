import { Injectable } from '@angular/core';
import {HttpClient}      from '@angular/common/http';
import {ChangePWRequest} from '../models/change-pwrequest';
import {ResBase}         from '../models/res-base';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePWRequestService {

  constructor(private http: HttpClient) {}

  changePassword(changePWRequest: ChangePWRequest) {
    return this.http.put<ResBase<ChangePWRequest>>(`${environment.API_URL}/user/changePassword`, changePWRequest)
  }
}
