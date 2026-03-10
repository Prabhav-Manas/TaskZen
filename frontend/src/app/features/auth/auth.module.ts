import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';


@NgModule({
  declarations: [
    SinginComponent,
    SingupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
