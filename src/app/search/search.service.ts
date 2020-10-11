import { Injectable }                 from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable}                   from 'rxjs';
import {environment}                  from '../../environments/environment';
import {ResBase}                      from '../models/res-base';
import {ISearchResult}                from './isearch-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }
  public search(k: string): Observable<ResBase<ISearchResult[]>>{
   return  this.httpClient.post<ResBase<ISearchResult[]>>(`${environment.API_URL}/search`,{key: k});
  }
}
