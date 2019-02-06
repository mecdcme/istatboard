import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/classes/Point';
import { IstatServiceService } from 'src/app/services/istat-service.service';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit {
  public nitems: number;

  constructor(private iservice: IstatServiceService) { }

  chartOptions = {
    responsive: true
  };

  ngOnInit() {
    this.nitems = 10;
    this.randomizeScatter();
  };

  resetItems() {
    this.nitems = 0;
    this.lineChartData_s = [{ label: 'Scatter Dataset', data: [] }];
  }

  // scatter plot
  // lineChart
  public p1 = new Point(1, 2);
  public p2 = new Point(2, 10);
  public p3 = new Point(0, 5);
  public lineChartData_s: Array<any> = [{
    label: 'Scatter Dataset', data: [this.p1, this.p2, this.p3]
  }];

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels_s: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions_s: any = {
    responsive: true
  };
  
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartLegend_s: boolean = true;
  public lineChartType_s: string = 'scatter';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;

  }

  public randomizeScatter(): void {
    let array_el = this.iservice.getPointsLocal(this.nitems);
    let _lineChartData_s: Array<any> = [{ label: 'Scatter Dataset' + this.nitems, data: array_el }];
    this.lineChartData_s = _lineChartData_s;
  }

  public randomizeScatterRemote(): void {
    var array_el: Point[];
    this.iservice.getPointsRemote(this.nitems).subscribe(results => array_el = results);
    console.log(array_el);
    let _lineChartData_s: Array<any> = [{ label: 'Scatter Dataset' + this.nitems, data: array_el }];
    this.lineChartData_s = _lineChartData_s;
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
