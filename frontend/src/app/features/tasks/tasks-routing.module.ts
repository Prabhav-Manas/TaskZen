import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkBoardComponent } from './work-board/work-board.component';

const routes: Routes = [
  {path:'work-board', component:WorkBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
