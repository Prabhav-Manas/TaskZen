import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/core/models/project/project.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
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

  constructor(private route:ActivatedRoute, private projectService:ProjectService, private loaderService:LoaderService){}

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

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe(); // prevent memory leak
  }
}
