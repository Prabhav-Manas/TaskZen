import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { WorkBoardComponent } from './work-board/work-board.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { AddTaskComponent } from './work-board/add-task/add-task.component';
import { TaskColumnComponent } from './work-board/task-column/task-column.component';
import { ColumnTaskCardComponent } from './work-board/column-task-card/column-task-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksInfoComponent } from './work-details/components/tasks-info/tasks-info.component';
import { TasksDescriptionComponent } from './work-details/components/tasks-description/tasks-description.component';
import { CommentsListComponent } from './work-details/components/comments-list/comments-list.component';
import { CommentInputComponent } from './work-details/components/comment-input/comment-input.component';
import { TaskSidebarComponent } from './work-details/components/task-sidebar/task-sidebar.component';


@NgModule({
  declarations: [
    WorkBoardComponent,
    WorkDetailsComponent,
    AddTaskComponent,
    TaskColumnComponent,
    ColumnTaskCardComponent,
    TasksInfoComponent,
    TasksDescriptionComponent,
    CommentsListComponent,
    CommentInputComponent,
    TaskSidebarComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
