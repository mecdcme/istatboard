import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';  
import { TabsModule } from 'ng2-bootstrap';

import { DxPivotGridModule, DxCheckBoxModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IstatContainerComponent } from './istat-container/istat-container.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { ViewDashboardComponent } from './views/view-dashboard/view-dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { ChartsComponent } from './views/charts/charts.component';
import { ScatterplotComponent } from './views/scatterplot/scatterplot.component';
import { IstatMapsComponent } from './views/istat-maps/istat-maps.component';
import { IstatPivotGridComponent } from './views/istat-pivot-grid/istat-pivot-grid.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IstatGridMapComponent } from './views/istat-grid-map/istat-grid-map.component';
import { TeamComponent } from './views/team/team.component';
import { IstatNgtableComponent } from './views/istat-ngtable/istat-ngtable.component';
import { HackPivotComponent } from './views/hack-pivot/hack-pivot.component';


@NgModule({
  declarations: [
    AppComponent,
    IstatContainerComponent,
    ViewDashboardComponent,
    HomeComponent,
    ChartsComponent,
    ScatterplotComponent,
    IstatMapsComponent,
    IstatPivotGridComponent,
    IstatGridMapComponent,
    TeamComponent,
    IstatNgtableComponent,
    HackPivotComponent
     ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    DxPivotGridModule,
    DxCheckBoxModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2TableModule,
    ChartsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);