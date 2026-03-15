import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  post<T>(endpoint:string, body:unknown){
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  get<T>(endpoint:string){
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
}
