import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkBoardComponent } from './work-board/work-board.component';
import { WorkDetailsComponent } from './work-details/work-details.component';

const routes: Routes = [
  {path:'work-board', component:WorkBoardComponent},
  {path:'work-details', component:WorkDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
  