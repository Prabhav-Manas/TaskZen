import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{
  @Input() isOpen:boolean=false;
  @Input() title:string=''
  @Input() message:string='';
  @Input() type:string='';
  
  constructor(private popupService:PopUpService){}

  ngOnInit(): void {
    
  }

  onClosePopUp(){
    this.popupService.close();
  }
}
