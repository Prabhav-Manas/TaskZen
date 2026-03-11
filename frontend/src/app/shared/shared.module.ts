import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonComponent,
    HeaderComponent,
    CardComponent
  ]
})
export class SharedModule { }
