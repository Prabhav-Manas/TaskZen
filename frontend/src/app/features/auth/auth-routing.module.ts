import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: 'signin', component:SigninComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'otp', component:OtpComponent},
  {path: 'resend-otp', component:ResetPasswordComponent},
  {path: 'reset-password/:token', component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
