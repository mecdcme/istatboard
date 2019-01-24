import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDashboardComponent } from './views/view-dashboard/view-dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { IstatContainerComponent } from './istat-container/istat-container.component';
import { ChartsComponent } from './views/charts/charts.component';
import { ScatterplotComponent } from './views/scatterplot/scatterplot.component';
import { IstatMapsComponent } from './views/istat-maps/istat-maps.component';
import { IstatPivotGridComponent } from './views/istat-pivot-grid/istat-pivot-grid.component';
import { IstatMapLeaftComponent } from './views/istat-map-leaft/istat-map-leaft.component';
import { IstatKendouiComponent } from './views/istat-kendoui/istat-kendoui.component';


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
        path: 'mapsleaft',
        component: IstatMapLeaftComponent,
        data: {
          title: 'Maps Leaft'
        }
      },
      {
        path: 'pivotgrid',
        component: IstatPivotGridComponent,
        data: {
          title: 'Pivot Grid'
        }
      }
      ,
      {
        path: 'kendoui',
        component: IstatKendouiComponent,
        data: {
          title: 'Pivot Grid'
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