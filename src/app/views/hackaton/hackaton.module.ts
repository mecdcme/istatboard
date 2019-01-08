import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackatonRoutingModule } from './hackaton-routing.module';
import { HackatonComponent } from './hackaton/hackaton.component';

@NgModule({
  declarations: [HackatonComponent],
  imports: [
    CommonModule,
    HackatonRoutingModule
  ]
})
export class HackatonModule { }
