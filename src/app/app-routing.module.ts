import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDashboardComponent } from './views/view-dashboard/view-dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { TeamComponent } from './views/team/team.component';
import { IstatContainerComponent } from './istat-container/istat-container.component';
import { ChartsComponent } from './views/charts/charts.component';
import { ScatterplotComponent } from './views/scatterplot/scatterplot.component';
import { IstatMapsComponent } from './views/istat-maps/istat-maps.component';
import { IstatPivotGridComponent } from './views/istat-pivot-grid/istat-pivot-grid.component';


import { IstatGridMapComponent } from './views/istat-grid-map/istat-grid-map.component';
import { IstatNgtableComponent } from './views/istat-ngtable/istat-ngtable.component';
import { HackPivotComponent } from './views/hack-pivot/hack-pivot.component';
import { TimereportComponent } from './views/timereport/timereport.component';


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
      title: 'Home'
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
        path: 'hackpivot',
        component: HackPivotComponent,
        data: {
          title: 'Hack Pivot'
        } 
      }  
      ,
      {
        path: 'timereport/:source',
        component: TimereportComponent,
        data: {
          title: 'Hack time'
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
