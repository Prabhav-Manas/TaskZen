import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  post<T>(endpoint:string, body:unknown, options?:any){
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { withCredentials: true });
  }

  get<T>(endpoint:string, options?:any){
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { withCredentials: true });
  }
}
