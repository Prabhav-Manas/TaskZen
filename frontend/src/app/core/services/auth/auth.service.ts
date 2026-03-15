import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SignUpPayload } from '../../models/signup-request';
import { SignUpResponse } from '../../models/signup-response';
import { SignInPayload } from '../../models/login-request';
import { SignInResponse } from '../../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  signup(data:SignUpPayload){
    return this.api.post<SignUpResponse>('auth/signup', data);
  }

  signin(data:SignInPayload){
    return this.api.post<SignInResponse>('auth/signin',data);
  }
}
