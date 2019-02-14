import { Component, OnInit } from '@angular/core';

import { IstatHackService } from 'src/app/services/istat-hack.service';
import { Point } from '../../classes/Point'
@Component({
  selector: 'app-timereport',
  templateUrl: './timereport.component.html',
  styleUrls: ['./timereport.component.scss']
})
export class TimereportComponent implements OnInit {
  // lineChart
  public nitems: number = 0;
  public lineChartLegend: boolean = true;
  public chartType: string = 'line';

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'YYYY-MM-DD hh:mm:ss'
        }

        }]
      }
    }
  };
  public lineChartColours: Array<any> = [
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

  _this = this;

  constructor(private ihackservice: IstatHackService) { }



  ngOnInit() {

    this.resetItems();
    this.ihackservice.getTimeReport2().subscribe(results => this.updateChart(results));


  }

  resetItems() {
    this.nitems = 0;
    this.lineChartData = [{ label: 'Scatter Dataset', data: [] }];
  }

  public updateChart(resultList) {
    console.log(resultList);
    let _lineChartData_s: Array<any> = [];
    let indexa = 0;
    for (let entry of resultList) {
      let arr_nitems: Array<any> = [];
      let index = 0;
      for (let mood of entry.moods) {
        let p = new Point(mood.timepoint, mood.mood);
        arr_nitems[index] =  mood.mood;
       
        index++;
      }
      let elem = { label: 'user ' + entry.user, data: arr_nitems };

      this.lineChartData.push(elem);
      indexa++;
    }
    let _lineChartLabel_s: Array<any> = [];
    let index = 0;
    for (let mood of resultList[0].moods) {

      _lineChartLabel_s[index] = mood.timepoint + '';

      index++;
    }

    //this.lineChartData=_lineChartData_s;
    this.lineChartLabels = _lineChartLabel_s;

    console.log(this.lineChartData);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
