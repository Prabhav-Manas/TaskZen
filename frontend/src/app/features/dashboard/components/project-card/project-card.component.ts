import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit{
  @Input() name:string='';
  @Input() color:string='';
  @Input() project!:Project;

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
