import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

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

  put<T>(endpoint: string, body: unknown, options?: any) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { withCredentials: true });
  }

  patch<T>(endpoint: string, body: unknown, options?: any) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { withCredentials: true });
  }

  delete<T>(endpoint: string, options?: any) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { withCredentials: true });
  }
}
