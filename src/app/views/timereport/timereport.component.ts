import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { IstatHackService } from 'src/app/services/istat-hack.service';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

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
  public fieldsFilter: Array<any> = [];
  chartTypeListAll: any[] = [{ caption: "Bar", value: "bar", stack: "false" }, { caption: "Bar Stacked", value: "bar", stack: "false" }, { caption: "H Bar", value: "horizontalBar", stack: "false" }, { caption: "Line", value: "line", stack: "false" }, { caption: "Doughnut", value: "doughnut", stack: "false" }, { caption: "Pie", value: "pie", stack: "false" }, { caption: "Radar", value: "Radar", stack: "false" }, { caption: "PolarArea", value: "polarArea", stack: "false" }];
  chartTimeList: any[] = [{ caption: "Doughnut", value: "doughnut", stack: false  }, { caption: "Pie", value: "pie", stack: false  },{ caption: "Bar", value: "bar", stack: false }, { caption: "Line", value: "line", stack: false }, { caption: "Bar Stacked", value: "bar", stack: true }, { caption: "Bar Horizontal", value: "horizontalBar", stack: false }, { caption: "Bar Stacked Horizontal", value: "horizontalBar", stack: true }];
  chartPieList: any[] = [{ caption: "Doughnut", value: "doughnut" }, { caption: "Pie", value: "pie" }, { caption: "Radar", value: "Radar" }, { caption: "PolarArea", value: "polarArea" }];

  //reportList: any[]= [  {caption: "eu_activity_time_hour",value: "eu_activity_time_hour"},{caption: "eu_activity_time", value: "eu_activity_time_hour" }, {caption: "eu_sex_time",value: "eu_sex_time"}, {caption: "eu_sex_time_hour",value: "eu_sex_time_hour"}];
  reportList: any[] = [];
  public chartType: any = this.chartTimeList[0];
  public chartTypeValue = this.chartType.value;

  //public reportSel: any = { id: -1 };
  public reportSel: any = -1;
  public source: string;

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false // this should be set to make the bars stacked
      }],
      yAxes: [{
        stacked: false // this also..
      }]
    },
    plugins: {
      colorschemes: {
        scheme: 'brewer.Paired12'  // plugin url https://nagix.github.io/chartjs-plugin-colorschemes/
      }
    }
  };



  _this = this;

  constructor(private route: ActivatedRoute, private ihackservice: IstatHackService) { }

  ngOnInit() {

    this.source = this.route.snapshot.params['source'];

    this.ihackservice.getReportList(this.source).subscribe(list => this.reportList = list);
    // this.getRemoteReport();
  }


  public onSelectReport() {
    this.fieldsFilter = [];
    if (this.reportSel.id > 0) {
      this.resetGraph();
      //  this.lineChartLabels = [];
      if (this.reportSel.query_type == 'table') {
        this.getDataReport();
      }
      else if (this.reportSel.query_type == 'proc') {
        console.log(this.reportSel);
        for (let inputI of JSON.parse(this.reportSel.inputs)) {
          let elem = { label: inputI.label, field: inputI.field, cls: inputI.cls, data: [] };
          this.getClsValues(inputI.field, inputI.cls);
          this.fieldsFilter.push(elem);
        }

        console.log(this.fieldsFilter);

      }
    }

  }

  public resetGraph() {
    this.lineChartData = [];
    this.lineChartLabels = [];

    this.nitems = 0;


  }

  public getDataReport() {
    this.resetGraph();
    let params = ''
    if (this.reportSel.inputs) {
      for (let inputI of JSON.parse(this.reportSel.inputs)) {
        let fiedlId = inputI.field;

        let value: string = (<HTMLInputElement>document.getElementById(fiedlId)).value;
        console.log(fiedlId);
        console.log(value);
        params += fiedlId + '=' + value + '&';
        // this.getClsValues(inputI.field, inputI.cls) ;
        //  this.fieldsFilter.push(elem);
      }
      if (params.length > 0) params = params.substring(0, params.length - 1);
    }
    this.ihackservice.getGenericReport(this.reportSel.id, this.reportSel.query_type, params).subscribe(results => {

      if (results.length > 0) {
        if(this.reportSel.report_type=='PIE')  this.updatePieReport(results);
        else
        this.updateChartReport(results);
      }
      else {
        let elem = { data: [], label: 'No Data' };
       // this.lineChartData.push(elem);
        //this.lineChartLabels = [];

      }

    });
  }



  public updateChartReport(resultList) {


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
      let p = jsonEntry[keyk];
      let elem = { label: keys[indexk], data: [p] };
      this.lineChartData.push(elem);

    }
    // resultList.length
    for (let indexa = 1; indexa < resultList.length; indexa++) {
      jsonEntry = resultList[indexa];
      for (let indexk = 1; indexk < keys.length; indexk++) {
        let keyk = keys[indexk];
        //let p = new Point(jsonEntry[firstKey], jsonEntry[keyk]);
        let p = jsonEntry[keyk];
        this.lineChartData[indexk - 1].data.push(p);

      }
      //    let today = new Date();
      //   today.setHours(jsonEntry[firstKey]);
      // _lineChartLabel_s.push(today);
      _lineChartLabel_s.push(jsonEntry[firstKey]);
    }
    this.lineChartLabels = _lineChartLabel_s;

  }
  public updatePieReport(resultList) {

    let elem = { data: [] };
    this.lineChartData.push(elem);
    let _lineChartLabel_s: Array<any> = [];

    //primo elemento

    let jsonEntry ;
    let arr_nitems: Array<any> = [];
    let keys ;
    let firstKey ;
    let key;
    let indexk: number = 0;
    //  let today = new Date();
    // today.setHours(jsonEntry[firstKey]);
    //_lineChartLabel_s.push(today);
    //_lineChartLabel_s.push(jsonEntry[firstKey]);
    
    // resultList.length
    for (let indexa = 0; indexa < resultList.length; indexa++) {
      jsonEntry = resultList[indexa];
       keys = Object.keys(jsonEntry);
      for (let indexk = 2; indexk < keys.length; indexk++) {
        let keyk = keys[indexk];
        //let p = new Point(jsonEntry[firstKey], jsonEntry[keyk]);
        let p = jsonEntry[keyk];
        this.lineChartData[0].data.push(p);
        _lineChartLabel_s.push(keyk);
      }
      //    let today = new Date();
      //   today.setHours(jsonEntry[firstKey]);
      // _lineChartLabel_s.push(today);
  
    }
    this.lineChartLabels = _lineChartLabel_s;
console.log(this.lineChartLabels);
console.log(this.lineChartData);
  }

  // events
  public onSelectChartChange(): void {

    // alert(this.chartType.stack);
    this.chartTypeValue = '';
    this.chartTypeValue = this.chartType.value;

    this.lineChartOptions.scales.xAxes[0].stacked = this.chartType.stack;
    this.lineChartOptions.scales.yAxes[0].stacked = this.chartType.stack;



  }

  public toArray(string: string) {
    return JSON.parse(string);
  }



  public getClsValues(field: string, cls: string) {

    return this.ihackservice.getClsValues(cls).subscribe(results => {
      let item;
      // find the first occurrence of item with name "k1"
      item = this.fieldsFilter.find(item => item.field == field);
      item.data = results;

    }
    );

  }




  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }




}
