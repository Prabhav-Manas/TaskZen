import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/auth/user.model';
import { ProjectRequest } from 'src/app/core/models/project/project-request';
import { ProjectResponse } from 'src/app/core/models/project/project-response';
import { Project } from 'src/app/core/models/project/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserStateService } from 'src/app/core/services/user-state/user-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user!: User; // logged-in user
  users:User[]=[];
  createProjectForm!:FormGroup;

  isCreateModalOpen:boolean=false;

  projects:Project[]=[];

  constructor(private fb:FormBuilder, private userStateService:UserStateService, private projectService:ProjectService){
    this.createProjectForm=this.fb.group({
      name:new FormControl('', [Validators.required]),
      descriptions:new FormControl(''),
      members:[[]]
    })
  }

  ngOnInit(): void {
    this.user=this.userStateService.getUser();

    console.log('Dashboard SignedIn User:=>', this.user);

    this.fetchProjects();
  }

  openCreateModal(){
    this.isCreateModalOpen=true;
  }

  onCloseModal(){
    this.isCreateModalOpen=false;
  }

  fetchProjects(){
    this.projectService.getProjects().subscribe((res:any)=>{
      if(res.status===200){
        console.log('Fetch All Projects:=>', res);
        this.projects=res.projects.filter((projectStatus:Project)=>projectStatus.status==='active');
      }
    }, (error)=>{
      console.log('Error in Fetching Projects:=>', error);
    })
  }

  onSubmit(){
    if(this.createProjectForm.invalid){
      this.createProjectForm.markAllAsTouched();
      return;
    }

    const payload={
      name:this.createProjectForm.value.name,
      descriptions:this.createProjectForm.value.descriptions,
      members:this.createProjectForm.value.members
    }

    this.projectService.createProject(payload).subscribe({next:(res:ProjectResponse)=>{
      if(res.status===201){
        console.log('Project Created:=>', res);
      }
    }, error:(error)=>{
      console.log('Error in creating project:=>', error);
    }})
  }
}
