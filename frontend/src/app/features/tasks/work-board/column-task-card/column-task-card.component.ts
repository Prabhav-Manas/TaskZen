import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-task-card',
  templateUrl: './column-task-card.component.html',
  styleUrls: ['./column-task-card.component.css']
})
export class ColumnTaskCardComponent{
  @Input() title:string='';
}
