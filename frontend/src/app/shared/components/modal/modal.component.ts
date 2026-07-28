import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen:boolean=false;
  @Input() title:string='';

  @Output() closemodal=new EventEmitter<void>();

  onCloseModal(){
    this.closemodal.emit();
  }
}
