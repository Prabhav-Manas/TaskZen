import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  @Input() isOpen:boolean=false;
  @Input() title:string='';
  
  @Output() close=new EventEmitter<any>();

  constructor(){}

  ngOnInit(): void {
    
  }

  onCloseModal(){
    this.close.emit();
  }
}
