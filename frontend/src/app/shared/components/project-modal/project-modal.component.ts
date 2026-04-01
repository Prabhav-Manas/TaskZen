import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/auth/user.model';
import { ProjectResponse } from 'src/app/core/models/project/project-response';
import { Project } from 'src/app/core/models/project/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit{
  isOpen!:boolean;
  selectedProject!:Project;
  usersList:User[]=[];

  createProjectForm!:FormGroup;

  constructor(    private fb:FormBuilder, private projectService:ProjectService, private userService:UserService){
    this.createProjectForm=this.fb.group({
      name:new FormControl('', Validators.required),
      description:new FormControl(''),
      members:[[]]
    })
  }

  ngOnInit(): void {
    // Listen Edit Event
    this.projectService.editProject$.subscribe(project=>{
      this.onEditClick(project);
    });

    // Listen Create Event
    this.projectService.createProject$.subscribe(()=>{
      this.openCreateModal();
    });

    this.fetchUsers();
  }

    fetchUsers(){
    this.userService.getAllUsers().subscribe((res:any)=>{
      this.usersList=res.users;
    })
  }

  openCreateModal(){
    this.isOpen=true;
    this.selectedProject=null as any;
    this.createProjectForm.reset();
  }

  onCancel(){
    this.isOpen=false;
    this.selectedProject=null as any;
    this.createProjectForm.reset();
  }

  onEditClick(project:Project){
    this.isOpen=true;
    this.selectedProject=project;

    this.createProjectForm.patchValue({
      name:project.name,
      description:project.description,
      members:project.members?.map((m:any)=>m._id)
    })
  }

  onSubmit() {
    if (this.createProjectForm.invalid) {
      this.createProjectForm.markAllAsTouched();
      return;
    }

    const payload = this.createProjectForm.value;

    if (this.selectedProject) {
      // EDIT
      this.projectService.updateProject(this.selectedProject._id, payload).subscribe({
        next: (res: any) => {
          this.isOpen = false;
          this.selectedProject = null as any;
          this.createProjectForm.reset();
          this.projectService.emitCreateProject(); // notify dashboard to re-fetch
        },
        error: (err:any) => console.log('Error updating project:', err)
      });
    } else {
      // CREATE
      this.projectService.createProject(payload).subscribe({
        next: (res: ProjectResponse) => {
          this.isOpen = false;
          this.createProjectForm.reset();
          this.projectService.emitCreateProject(); // notify dashboard to re-fetch
        },
        error: (err) => console.log('Error creating project:', err)
      });
    }
  }
}
