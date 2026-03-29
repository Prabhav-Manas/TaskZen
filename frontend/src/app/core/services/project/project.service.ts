import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ProjectRequest } from '../../models/project/project-request';
import { ProjectResponse } from '../../models/project/project-response';
import { SingleProjectResponse } from '../../models/project/project-single-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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
}
