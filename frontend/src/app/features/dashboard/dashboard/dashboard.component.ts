import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth/user.model';
import { UserStateService } from 'src/app/core/services/user-state/user-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user!:User

  constructor(private userStateService:UserStateService){}

  ngOnInit(): void {
    this.user=this.userStateService.getUser();

    console.log('Dashboard SignedIn User:=>', this.user);
  }
}
