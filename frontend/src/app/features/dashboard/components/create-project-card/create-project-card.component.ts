import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-project-card',
  templateUrl: './create-project-card.component.html',
  styleUrls: ['./create-project-card.component.css']
})
export class CreateProjectCardComponent implements OnInit{
  @Input() label:string='';

  @Output() open=new EventEmitter<any>();
  
  constructor(){}

  ngOnInit(): void {
    
  }
}
