import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  project!:Project

  // @Output() editClick=new EventEmitter<Project>();

  constructor(private route:ActivatedRoute, private projectService:ProjectService){}

  ngOnInit(): void {
    const projectId=this.route.snapshot.paramMap.get('id');

    if(projectId){
      console.log('Single Project:=>', projectId);

      this.projectService.getSingleProject(projectId).subscribe({next:(res)=>{
        if(res.status===200){
          console.log('Single Project:=>', res);
          this.project=res.project;
        }
      }, error:(error)=>{
        console.log('Error in fetching single project:=>', error)
      }})
    }
  }

  onClickEdit(event:Event){
    event.stopPropagation();

    // this.editClick.emit(this.project);
    this.projectService.emitEditProject(this.project);
  }
}
