import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { FileSelectDirective } from 'ng2-file-upload';

import { PaginationModule } from 'ng2-bootstrap';  
import { TabsModule } from 'ng2-bootstrap';

import { DxPivotGridModule, DxCheckBoxModule, DxChartModule } from 'devextreme-angular';
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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

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
import { TimereportComponent } from './views/timereport/timereport.component';
import { LealeftMapComponent } from './views/lealeft-map/lealeft-map.component';
import { IstatUploadImageComponent } from './views/istat-upload-image/istat-upload-image.component';
import { ImagePreview } from './views/istat-upload-image/image-preview.directive';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ArchitectureComponent } from './views/architecture/architecture.component';


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
    HackPivotComponent,
    TimereportComponent,
    LealeftMapComponent,
    IstatUploadImageComponent,
    FileSelectDirective,
    ImagePreview,
    WelcomeComponent,
    ArchitectureComponent
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
    DxChartModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2TableModule,
    ChartsModule,
    LeafletModule.forRoot()

    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);