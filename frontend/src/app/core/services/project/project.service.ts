import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private api:ApiService) { }

  getProjects(){
    return this.api.get('projects');
  }
}
