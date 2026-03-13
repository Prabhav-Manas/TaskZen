import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { CreateProjectCardComponent } from './components/create-project-card/create-project-card.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectCardComponent,
    CreateProjectCardComponent,
    ActivityListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
