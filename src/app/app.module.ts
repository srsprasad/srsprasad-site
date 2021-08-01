import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';
import { AgGridModule } from 'ag-grid-angular';
import { StatisticsComponent } from './components/statistics.component';
import { allIcons } from 'ngx-bootstrap-icons';
import { StudentComponent } from './student/student.component';
import { AlumniComponent } from './alumni/alumni.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    TeamComponent,
    StatisticsComponent,
    StudentComponent,
    AlumniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
