import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ProjectRequest } from '../../models/project/project-request';
import { ProjectResponse } from '../../models/project/project-response';
import { SingleProjectResponse } from '../../models/project/project-single-response';
import { Subject } from 'rxjs';
import { Project } from '../../models/project/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Separate subjects for open-modal and refresh-data
  private createProjectSubject = new Subject<void>();
  private editProjectSubject = new Subject<any>();
  private projectRefreshSubject = new Subject<void>();

  createProject$ = this.createProjectSubject.asObservable();
  editProject$ = this.editProjectSubject.asObservable();
  projectRefresh$ = this.projectRefreshSubject.asObservable();

  constructor(private api:ApiService) { }

  emitCreateProject(){
    this.createProjectSubject.next();
  }

  emitEditProject(project: Project){
    this.editProjectSubject.next(project);
  }

  emitProjectRefresh() { 
    this.projectRefreshSubject.next(); 
  }

  createProject(data:ProjectRequest){
    return this.api.post<ProjectResponse>('project', data);
  }

  getProjects(){
    return this.api.get<ProjectResponse>('project');
  }

  getSingleProject(id:string){
    return this.api.get<SingleProjectResponse>(`project/${id}`);
  }

  updateProject(id: string, data: ProjectRequest) {
    return this.api.patch<ProjectResponse>(`project/${id}`, data);
  }

  deleteProject(id:string){
    return this.api.delete(`project/${id}`);
  }
}
