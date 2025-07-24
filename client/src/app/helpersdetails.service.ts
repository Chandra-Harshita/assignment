import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './helpers.model';
@Injectable({
  providedIn: 'root'
})

export class HelpersdetailsService {

  constructor(private http: HttpClient) {

  }

  url1: string = 'http://localhost:3000/helpers/get'
  url2: string = 'http://localhost:3000/helpers/get/'
  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url1)
  }
  getSingleHelperData(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url2 + `${id}`)
  }
}
