import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }

  getAllUsers(){
    return this.api.get('users')
  }
}
