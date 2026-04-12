import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/core/models/project/project.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  project!:Project
  private projectId!: string;
  private refreshSub!: Subscription;

  isModalOpen:boolean=false;

  constructor(private route:ActivatedRoute, private projectService:ProjectService, private loaderService:LoaderService, private router:Router, private popupService:PopUpService){}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;

    if (this.projectId) {
      this.fetchProject();
    }

    this.refreshSub = this.projectService.projectRefresh$.subscribe(() => {
      this.fetchProject();
    });
  }

  fetchProject() {
    this.loaderService.show('Loading')
    this.projectService.getSingleProject(this.projectId).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.project = res.project;
          this.loaderService.hide();
        }
      },
      error: (err) => {
        console.log('Error fetching project:', err);
        this.loaderService.hide();
      }
    });
  }

  onClickEdit(event:Event){
    event.stopPropagation();
    this.projectService.emitEditProject(this.project);
  }

  onDeleteProject(project:Project){
    this.loaderService.show('Deleting');

    this.projectService.deleteProject(project._id).subscribe({next:(res:any)=>{
      if(res.status===200){
        this.loaderService.hide();
        this.popupService.show('Deleted', 'Project deleted successfully!', 'success')
        this.router.navigate(['/']);
      }
    }, error:(error)=>{
      console.log('Error in deleting project:=>', error);
      this.loaderService.hide();
      this.popupService.show('Error', 'Failed to delete project!', 'danger');
    }})
  }

  onAddMember(){
    this.projectService.emitEditProject(this.project);
  }

  onAddTask(){
    this.isModalOpen=true
  }

  closemodal(){
    this.isModalOpen=false
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe(); // prevent memory leak
  }
}
