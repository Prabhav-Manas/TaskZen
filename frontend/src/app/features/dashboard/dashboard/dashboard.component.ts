import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth/user.model';
import { Project } from 'src/app/core/models/project/project.model';
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

  constructor(private userStateService: UserStateService,private projectService: ProjectService) {}

  ngOnInit(): void {
    this.user = this.userStateService.getUser();
    this.fetchProjects();

    // Re-fetch projects after a project is created/edited
    this.projectService.createProject$.subscribe(() => {
      this.fetchProjects();
    });
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe({next: (res: any) => {
        if (res.status === 200) {
          this.projects = res.projects.filter(
            (p: Project) => p.status === 'active'
          );
        }
      },error: (err) => console.log('Error fetching projects:', err)
    });
  }

  openCreateModal() {
    this.projectService.emitCreateProject();
  }

  onEditClick(project: Project) {
    this.projectService.emitEditProject(project);
  }
}