import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse,  Helper } from './helpers.model';
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
  urlToUpdate: string = 'http://localhost:3000/helpers/update/'
  urlForSpecificUsers:string='http://localhost:3000/helpers/getspecificusers'

  getData(data:any): Observable<ApiResponse> {
    const params=new HttpParams({ fromObject: data })
    return this.http.get<ApiResponse>(this.url1,{params})
  }
  getSingleHelperData(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url2 + `${id}`)
  }
  deleteHelperData(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.urlToDelete + `${id}`)
  }
  addhelper(data: FormData): Observable<ApiResponse> {
    // console.log(data)
    return this.http.post<ApiResponse>(this.urlToAdd, data)
  }
  updateHelper(id: string, data: FormData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.urlToUpdate + `${id}`, data)
  }
  getSpecificUsers(data:any): Observable<ApiResponse>{
    const params=new HttpParams({ fromObject: data })
    return this.http.get<ApiResponse>(this.urlForSpecificUsers,{params})
  }
}

