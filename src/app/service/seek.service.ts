import { Injectable } from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import {Observable}   from 'rxjs';
import {ResBase}      from '../models/res-base';
import {environment}  from '../../environments/environment';
import {ISeek}        from '../interface/iseek';

@Injectable({
  providedIn: 'root'
})
export class SeekService {

  constructor(private httpClient: HttpClient) { }
  public search(k: string): Observable<ResBase<ISeek[]>>{
    return  this.httpClient.post<ResBase<ISeek[]>>(`${environment.API_URL}/search`,{key: k});
  }
}
