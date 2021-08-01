import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniComponent } from './alumni/alumni.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'team', component: TeamComponent},
  {path: 'alumni', component: AlumniComponent},
  {path: '', component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
