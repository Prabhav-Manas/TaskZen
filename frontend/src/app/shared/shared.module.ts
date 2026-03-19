import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    CardComponent,
    FormInputComponent,
    PasswordInputComponent,
    PopUpComponent,
    LoaderComponent
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
    FormsModule,
    PopUpComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
