import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit{
  projects:any[]=[
    {
      id:1,
      name:'Project Management App',
      description:'Task tracking system',
      tasks:12,
      status:'Active'
    },

    {
      id:2,
      name:'E-Commerce App',
      description:'Online store system',
      tasks:8,
      status:'In Progress'
    },

    {
      id:3,
      name:'TimeZen API',
      description:'Backend services',
      tasks:5,
      status:'Completed'
    }
  ];

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  openProject(id:number){
    this.router.navigate(['work/work-board', id])
  }
}
