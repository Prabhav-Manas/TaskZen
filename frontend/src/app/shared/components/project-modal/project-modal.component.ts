import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/auth/user.model';
import { ProjectResponse } from 'src/app/core/models/project/project-response';
import { Project } from 'src/app/core/models/project/project.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
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

  constructor(private fb:FormBuilder, private projectService:ProjectService, private userService:UserService, private loaderService:LoaderService){
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

    

    //Close modal immediately on submit, don't wait for API
    this.isOpen = false;
    const projectToEdit = this.selectedProject;
    this.selectedProject = null as any;
    this.createProjectForm.reset();

    if (projectToEdit) {
      this.loaderService.show('Saving Editted Project')
      // ===EDIT===
      this.projectService.updateProject(projectToEdit._id, payload).subscribe({
        next: () => {
          this.projectService.emitProjectRefresh(); //dedicated refresh event
          this.loaderService.hide();
        },
        error: (err: any) => {
          console.log('Error updating project:', err);
          this.isOpen = true; //reopen modal on error
        }
      });
    } else {
      // ===CREATE===
      this.loaderService.show('Creating Your Project')
      this.projectService.createProject(payload).subscribe({
        next: () => {
          this.projectService.emitProjectRefresh(); //dedicated refresh event
          this.loaderService.hide();
        },
        error: (err) => {
          console.log('Error creating project:', err);
          this.isOpen = true; //reopen modal on error
        }
      });
    }
  }
}
