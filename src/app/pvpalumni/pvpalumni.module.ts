import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PvpalumniRoutingModule } from './pvpalumni-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PvpalumniRoutingModule
  ]
})
export class PvpalumniModule { }
