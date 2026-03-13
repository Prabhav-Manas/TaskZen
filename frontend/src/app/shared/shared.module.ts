import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    CardComponent,
    FormInputComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ButtonComponent,
    HeaderComponent,
    CardComponent,
    FormInputComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
