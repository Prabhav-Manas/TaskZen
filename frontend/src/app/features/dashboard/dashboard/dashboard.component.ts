import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth/user.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserStateService } from 'src/app/core/services/user-state/user-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user!:User

  projetcs:any[]=[];

  constructor(private userStateService:UserStateService, private projectService:ProjectService){}

  ngOnInit(): void {
    this.user=this.userStateService.getUser();

    console.log('Dashboard SignedIn User:=>', this.user);
  }

  fetchProjects(){
    this.projectService.getProjects().subscribe({next:(res)=>{
      console.log('Fecthed Projects:=>', res);
    }, error:(error)=>{
      console.log('Error in fetching projects:=>', error);
    }})
  }
}
