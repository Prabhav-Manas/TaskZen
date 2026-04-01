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
  editProject$ = new Subject<Project>();
  createProject$ = new Subject<void>();

  constructor(private api:ApiService) { }

  createProject(data:ProjectRequest){
    return this.api.post<ProjectResponse>('project', data);
  }

  getProjects(){
    return this.api.get<ProjectResponse>('project');
  }

  getSingleProject(id:string){
    return this.api.get<SingleProjectResponse>(`project/${id}`);
  }

  emitEditProject(project: Project){
    this.editProject$.next(project);
  }

  emitCreateProject(){
    this.createProject$.next();
  }

  updateProject(id: string, data: ProjectRequest) {
    return this.api.patch<ProjectResponse>(`project/${id}`, data);
  }
}
