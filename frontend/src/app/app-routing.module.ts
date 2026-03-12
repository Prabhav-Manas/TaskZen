import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'auth/signin', pathMatch:'full'},
  {path:'auth', loadChildren:()=>import('./features/auth/auth.module').then(m=>m.AuthModule)},
  {path:'dashboard', loadChildren:()=>import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'projects', loadChildren:()=>import('./features/projects/projects.module').then(m=>m.ProjectsModule)},
  {path:'work', loadChildren:()=>import('./features/tasks/tasks.module').then(m=>m.TasksModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
