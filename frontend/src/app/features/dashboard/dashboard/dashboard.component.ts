import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/auth/user.model';
import { Project } from 'src/app/core/models/project/project.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserStateService } from 'src/app/core/services/user-state/user-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: User;
  projects: Project[] = [];
  private refreshSub!: Subscription; //track subscription

  constructor(private userStateService: UserStateService,private projectService: ProjectService, private loaderService:LoaderService, private router:Router) {}

  ngOnInit(): void {
    
    this.user = this.userStateService.getUser();
    this.fetchProjects();
    

    // Re-fetch projects after a project is created/edited
    // this.projectService.createProject$.subscribe(() => {
    //   this.fetchProjects();
    // });

    // Listen to projectRefresh$ instead of createProject$
    this.refreshSub = this.projectService.projectRefresh$.subscribe(() => {
      this.fetchProjects();
    });
  }

  fetchProjects() {
    this.loaderService.show('Loading...')

    this.projectService.getProjects().subscribe({next: (res: any) => {
        if (res.status === 200) {
          this.projects = res.projects.filter(
            (p: Project) => p.status === 'active'
          );
          console.log('Dashboard Project Fetched:=>', this.projects);
          this.loaderService.hide();
        }
      },error: (err) => console.log('Error fetching projects:', err)
    });
  }

  onViewProject(project:Project){
    
    if(project){
      this.router.navigate(['/projects', project._id]);
      // this.loaderService.hide()  ====> // Don't hide here hide it in project-details page
    }
  }

  openCreateModal() {
    this.projectService.emitCreateProject();
  }

  // onEditClick(project: Project) {
  //   this.projectService.emitEditProject(project);
  // }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe(); //prevent memory leak
  }
}