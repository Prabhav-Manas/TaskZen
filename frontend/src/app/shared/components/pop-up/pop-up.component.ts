import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit, OnChanges{
  @Input() isOpen:boolean=false;
  @Input() title:string=''
  @Input() message:string='';
  @Input() type:string='';

  safeMessage!:SafeHtml
  
  constructor(private popupService:PopUpService, private sanitizer:DomSanitizer){}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.safeMessage=this.sanitizer.bypassSecurityTrustHtml(this.message);
  }

  getTitleClass() {
    switch (this.type) {
      case 'success': return 'text-success';
      case 'danger': return 'text-danger';
      default: return 'text-primary';
    }
  }

  onClosePopUp(){
    this.popupService.close();
  }
}
