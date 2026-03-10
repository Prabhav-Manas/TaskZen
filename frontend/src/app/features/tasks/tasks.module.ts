import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { WorkBoardComponent } from './work-board/work-board.component';
import { WorkDetailsComponent } from './work-details/work-details.component';


@NgModule({
  declarations: [
    WorkBoardComponent,
    WorkDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
