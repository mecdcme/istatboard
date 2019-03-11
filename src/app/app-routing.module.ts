import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDashboardComponent } from './views/view-dashboard/view-dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { TeamComponent } from './views/team/team.component';
import { IstatContainerComponent } from './istat-container/istat-container.component';
import { ChartsComponent } from './views/charts/charts.component';
import { ScatterplotComponent } from './views/scatterplot/scatterplot.component';
import { IstatMapsComponent } from './views/istat-maps/istat-maps.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { IstatPivotGridComponent } from './views/istat-pivot-grid/istat-pivot-grid.component';

import { ArchitectureComponent } from './views/architecture/architecture.component';
import { IstatGridMapComponent } from './views/istat-grid-map/istat-grid-map.component';
import { IstatNgtableComponent } from './views/istat-ngtable/istat-ngtable.component';
import { HackPivotComponent } from './views/hack-pivot/hack-pivot.component';
import { TimereportComponent } from './views/timereport/timereport.component';
import { LealeftMapComponent } from './views/lealeft-map/lealeft-map.component';
import { IstatUploadImageComponent } from './views/istat-upload-image/istat-upload-image.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Welcome to SMart Use of TIme Statistics (SMUTIS)'
    }
  },
  {
    path: 'architecture',
    component: ArchitectureComponent,
    data: {
      title: 'Architecture'
    }
  },
  {
    path: 'team',
    component: TeamComponent,
    data: {
      title: 'Our Team'
    }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {
      title: 'Welcome to SMart Use of TIme Statistics (SMUTIS)'  
    }
  },
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'istatboard',
        component: ViewDashboardComponent,
        data: {
          title: 'Board'
        }
      },
      {
        path: 'lmap',
        component: LealeftMapComponent,
        data: {
          title: 'l map'
        }
      },
      {
        path: 'charts',
        component: ChartsComponent,
        data: {
          title: 'Charts'
        }
      },
      {
        path: 'scatter',
        component: ScatterplotComponent,
        data: {
          title: 'scatter plot'
        }
      }, 
      {
        path: 'maps',
        component: IstatMapsComponent,
        data: {
          title: 'Maps'
        }
      } , 
      {
        path: 'food',
        component: IstatUploadImageComponent,
        data: {
          title: 'Food Recognition'
        }
      } ,
      {
        path: 'hackpivot/:source',
        component: HackPivotComponent,
        data: {
          title: 'Analytics'
        } 
      }  
      ,
      {
        path: 'timereport/:source',
        component: TimereportComponent,
        data: {
          title: 'Charts'
        }  
      } ,
      {
        path: 'pivotgrid',
        component: IstatPivotGridComponent,
        data: {
          title: 'Pivot Grid'
        }
      }
      ,
      {
        path: 'gridMap',
        component: IstatGridMapComponent,
        data: {
          title: 'Grid Map'
        }
      }
        ,
      {
        path: 'ngTable',
        component: IstatNgtableComponent,
        data: {
          title: 'NgTable'
        }
      }

    ]
  }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
