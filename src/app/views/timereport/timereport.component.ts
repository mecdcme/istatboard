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
  public lineChartLegend: boolean = false;
  
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  chartTypeList: any[]= [ {caption: "Bar",value: "bar"},{caption: "Line", value: "line" }, {caption: "Doughnut",value: "doughnut"}, {caption: "Pie",value: "pie"}, {caption: "Radar",value: "Radar"}, {caption: "PolarArea",value: "polarArea"}];
  public chartType: string = this.chartTypeList[0].value;

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    options: {
      plugins: {
        colorschemes: {
            scheme: 'brewer.Paired12'  // plugin url https://nagix.github.io/chartjs-plugin-colorschemes/
          }
        },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
    }
  };
  
  

  _this = this;

  constructor(private ihackservice: IstatHackService) { }



  ngOnInit() {

    //this.ihackservice.getTimeReport2().subscribe(results => this.updateChart(results));
    //this.ihackservice.getTimeReportFile().subscribe(results => this.updateChartFile(results));
    //this.ihackservice.getActivityReport().subscribe(results => this.updateChartFile(results));
    this.ihackservice.getGenericReport('activity_time_hour').subscribe(results => this.updateChartReport(results));
  }

   

  

  public updateChartReport(resultList) {

    let _lineChartData_s: Array<any> = [];
    let _lineChartLabel_s: Array<any> = [];
    
    //primo elemento
    let jsonEntry = resultList[0];
    let arr_nitems: Array<any> = [];
    let keys = Object.keys(jsonEntry)
    let firstKey = keys[0];
    let key;
    let indexk: number = 0;
    _lineChartLabel_s.push(jsonEntry[firstKey]);
    for (let indexk = 1; indexk < keys.length; indexk++) {
      let keyk = keys[indexk];
     // let p = new Point(jsonEntry[firstKey], jsonEntry[keyk]);
     let p =  jsonEntry[keyk];
     let elem = { label: keys[indexk], data: [p],stack: indexk};
     this.lineChartData.push(elem);
    
 
    }
   // resultList.length
    for (let indexa = 1; indexa <resultList.length; indexa++) {
        jsonEntry = resultList[indexa];
        for (let indexk = 1; indexk < keys.length; indexk++) {
          let keyk = keys[indexk];
          //let p = new Point(jsonEntry[firstKey], jsonEntry[keyk]);
          let p =  jsonEntry[keyk];
         this.lineChartData[indexk-1].data.push(p);
     
        }
        _lineChartLabel_s.push(jsonEntry[firstKey]);
    }

 
  //  this.lineChartData=_lineChartData_s;
    this.lineChartLabels = _lineChartLabel_s;

 

  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  


}
