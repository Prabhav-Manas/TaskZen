import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SignUpPayload } from '../../models/auth/signup-request';
import { SignUpResponse } from '../../models/auth/signup-response';
import { SignInPayload } from '../../models/auth/login-request';
import { SignInResponse } from '../../models/auth/login-response';

import { ForgotPasswordRequest } from '../../models/auth/forgot-password-request';
import { ForgotPasswordResponse } from '../../models/auth/forgot-password-response';
import { OtpRequest } from '../../models/auth/otp-request';
import { OtpResponse } from '../../models/auth/otp-response';
import { ResetPasswordRequest } from '../../models/auth/reset-password-request';
import { ResetPasswordResponse } from '../../models/auth/reset-password-response';
import { RefreshTokenResponse } from '../../models/auth/refresh-token-response';

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

  refreshToken() {
    return this.api.post<RefreshTokenResponse>('auth/refresh-token', {}, {withCredentials: true});
  }

  verifyEmail(email: string, token: string) {
    return this.api.get(`auth/verify-email/${email}/${token}`, {withCredentials: true});
  }

  resendVerification(email: string) {
    return this.api.post('auth/resend-verification', { email }, {withCredentials: true});
  }

  forgotPassword(data:ForgotPasswordRequest){
    return this.api.post<ForgotPasswordResponse>('auth/forgot-password', data);
  }

  verifyOtp(data:OtpRequest){
    return this.api.post<OtpResponse>('auth/verify-otp', data);
  }

  resendOtp(email:string){
    return this.api.post<OtpResponse>('auth/resend-otp', {email});
  }

  resetPassword(data:ResetPasswordRequest){
    return this.api.post<ResetPasswordResponse>(`auth/reset-password/${data.token}`, data);
  }

  autoSignout(){
    
  }

  signout(){
    return this.api.post<any>('auth/signout', {}, {withCredentials:true});
  }
}
