import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit{
  @Input() title:string='';
  @Input() color:string='';
  @Input() project:any='';

  totalTasks!:any;
  completedTasks!:any;

  constructor(){}

  ngOnInit(): void {
    
  }

  getProgress(): number {
    if (!this.project || !this.project.totalTasks) return 0;

    return (this.project.completedTasks / this.project.totalTasks) * 100;
  }
}
