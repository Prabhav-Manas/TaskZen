import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Output() editClick = new EventEmitter<Project>();

  totalTasks!:any;
  completedTasks!:any;

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  getProgress(): number {
    if (!this.project || !this.project.totalTasks) return 0;

    return (this.project.completedTasks / this.project.totalTasks) * 100;
  }



  // onViewProject(){
  //   this
  // }
}
