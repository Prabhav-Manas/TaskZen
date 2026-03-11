import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { WorkBoardComponent } from './work-board/work-board.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { AddTaskComponent } from './work-board/add-task/add-task.component';
import { TaskColumnComponent } from './work-board/task-column/task-column.component';
import { ColumnTaskCardComponent } from './work-board/column-task-card/column-task-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WorkBoardComponent,
    WorkDetailsComponent,
    AddTaskComponent,
    TaskColumnComponent,
    ColumnTaskCardComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
