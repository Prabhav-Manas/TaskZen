import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SignUpPayload } from '../../models/signup-request';
import { SignUpResponse } from '../../models/signup-response';
import { SignInPayload } from '../../models/login-request';
import { SignInResponse } from '../../models/login-response';
import { ForgotPasswordRequest } from '../../models/forgot-password-request';
import { ForgotPasswordResponse } from '../../models/forgot-password-response';
import { OtpRequest } from '../../models/otp-request';
import { OtpResponse } from '../../models/otp-response';

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

  forgotPassword(data:ForgotPasswordRequest){
    return this.api.post<ForgotPasswordResponse>('auth/forgot-password', data);
  }

  verifyOtp(data:OtpRequest){
    return this.api.post<OtpResponse>('auth/verify-otp', data);
  }
}
