import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() title:string='';
  @Input() cardType:string='';
  @Input() color:string='';
  @Input() bgCardColor:string='';
  @Input() textColor:string="";

  constructor(){}

  ngOnInit(): void {
    
  }
}
