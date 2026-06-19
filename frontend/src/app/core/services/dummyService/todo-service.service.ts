import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
private baseUrl="https://jsonplaceholder.typicode.com/todos";

  constructor(private http:HttpClient) { }

  getTodoList(){
    return this.http.get(this.baseUrl);
  }
}
