import { Component, OnInit } from '@angular/core';

import { IstatHackService } from 'src/app/services/istat-hack.service';
import { Point } from '../../classes/Point'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  chartTypeListAll: any[]= [ {caption: "Bar",value: "bar",stack:"false"}, {caption: "Bar Stacked",value: "bar",stack:"false"},{caption: "H Bar",value: "horizontalBar",stack:"false"},{caption: "Line", value: "line",stack:"false" }, {caption: "Doughnut",value: "doughnut",stack:"false" }, {caption: "Pie",value: "pie",stack:"false" }, {caption: "Radar",value: "Radar",stack:"false" }, {caption: "PolarArea",value: "polarArea",stack:"false" }];
  chartTimeList: any[]= [ {caption: "Bar",value: "bar",stack:false}, {caption: "Bar Stacked",value: "bar",stack:true},{caption: "Bar Horizontal",value: "horizontalBar",stack:false},{caption: "Bar Stacked Horizontal",value: "horizontalBar",stack:true},{caption: "Line", value: "line",stack:false }];
  chartPieList: any[]= [  {caption: "Doughnut",value: "doughnut"}, {caption: "Pie",value: "pie"}, {caption: "Radar",value: "Radar"}, {caption: "PolarArea",value: "polarArea"}];
  
  //reportList: any[]= [  {caption: "eu_activity_time_hour",value: "eu_activity_time_hour"},{caption: "eu_activity_time", value: "eu_activity_time_hour" }, {caption: "eu_sex_time",value: "eu_sex_time"}, {caption: "eu_sex_time_hour",value: "eu_sex_time_hour"}];
  reportList: any[]=[];
  public chartType: any = this.chartTimeList[0];
  
  public reportId: number =-1;
  public source:string;
  



  public lineChartOptions: any = {

    responsive: true,
    
     scales: {
        xAxes: [{
          
           stacked: false // this should be set to make the bars stacked
        }],
        yAxes: [{
           stacked: false // this also..
        }]
     }
     ,
      plugins: {
        colorschemes: {
            scheme: 'brewer.Paired12'  // plugin url https://nagix.github.io/chartjs-plugin-colorschemes/
          }
        }
    
  };
  
  

  _this = this;

  constructor( private route: ActivatedRoute,private ihackservice: IstatHackService) { }

  ngOnInit() {

    this.source = this.route.snapshot.params['source'];
 
    this.ihackservice.getReportList(this.source).subscribe(list => this.reportList=list);
   // this.getRemoteReport();
  }

   
  public getRemoteReport() {
    if (this.reportId >0){
    this.lineChartData=[];
    this.lineChartLabels=[];
  this.ihackservice.getGenericReport(this.reportId).subscribe(results => this.updateChartReport(results));
}

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
  //  let today = new Date();
   // today.setHours(jsonEntry[firstKey]);
    //_lineChartLabel_s.push(today);
    _lineChartLabel_s.push(jsonEntry[firstKey]);
    for (let indexk = 1; indexk < keys.length; indexk++) {
      let keyk = keys[indexk];
     // let p = new Point(jsonEntry[firstKey], jsonEntry[keyk]);
     let p =  jsonEntry[keyk];
     let elem = { label: keys[indexk], data: [p]};
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
    //    let today = new Date();
     //   today.setHours(jsonEntry[firstKey]);
       // _lineChartLabel_s.push(today);
       _lineChartLabel_s.push(jsonEntry[firstKey]);
    }

 
  //  this.lineChartData=_lineChartData_s;
    this.lineChartLabels = _lineChartLabel_s;

 

  }
    // events
    public onSelectChartChange(): void {
       
     // alert(this.chartType.stack);
      //console.log( this.lineChartOptions.scales);
      this.lineChartOptions.scales.xAxes[0].stacked= this.chartType.stack;
      this.lineChartOptions.scales.yAxes[0].stacked= this.chartType.stack;
 
    }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  


}
