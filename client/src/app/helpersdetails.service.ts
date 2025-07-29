import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Helper } from './helpers.model';
@Injectable({
  providedIn: 'root'
})

export class HelpersdetailsService {

  constructor(private http: HttpClient) {

  }

  url1: string = 'http://localhost:3000/helpers/get'
  url2: string = 'http://localhost:3000/helpers/get/'
  urlToDelete: string = 'http://localhost:3000/helpers/delete/'
  urlToAdd: string = 'http://localhost:3000/helpers/add'
  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url1)
  }
  getSingleHelperData(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url2 + `${id}`)
  }
  deleteHelperData(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.urlToDelete + `${id}`)
  }
  addhelper(data: Partial<Helper>): Observable<ApiResponse> {
    console.log("hi there", data);
    return this.http.post<ApiResponse>(this.urlToAdd, data)
  }
}
