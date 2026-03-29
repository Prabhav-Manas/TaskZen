import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit{
  @Input() projectId!: string;
  
  constructor(){}

  ngOnInit(): void {
    
  }
}
