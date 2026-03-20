import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'signin', component:SigninComponent, canActivate:[authGuard], data:{authRequired:false}},
  {path: 'signup', component:SignupComponent, canActivate:[authGuard], data:{authRequired:false}},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'otp', component:OtpComponent},
  {path: 'resend-otp', component:ResetPasswordComponent},
  {path: 'reset-password/:token', component:ResetPasswordComponent},
  {path: 'verify-email/:email/:token', component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
