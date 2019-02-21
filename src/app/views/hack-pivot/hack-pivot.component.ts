import { Component, OnInit, ViewChild } from '@angular/core';
import { IstatHackService } from 'src/app/services/istat-hack.service';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import {
  DxPivotGridModule,
  DxPivotGridComponent,
  DxChartModule,
  DxChartComponent
} from 'devextreme-angular';
import { Report } from 'src/app/classes/Report';
import { IstatServiceService } from 'src/app/services/istat-service.service';
import CustomStore from 'devextreme/data/custom_store';


@Component({
  selector: 'app-hack-pivot',
  templateUrl: './hack-pivot.component.html',
  styleUrls: ['./hack-pivot.component.scss']
})
export class HackPivotComponent implements OnInit {
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;

  customStore: any;
 

  pivotGridDataSource: any;
  customDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  reportList: any[]= [{caption: "User Week", value: "userweek" }, {caption: "User Week Name",value: "userweekjoin"},];

  selectedReport = this.reportList[0];
  ngOnInit() {
  
  }
 

  constructor(private ihackservice: IstatHackService) {


    this.customStore = new CustomStore({
      load: function (loadOptions: any) {
        return ihackservice.getReportPivotUser("userweekjoin");
      }             
    });

    this.pivotGridDataSource = new PivotGridDataSource({
      fields: [{
        caption: "User",
        width: 120,
        dataField: "user",
        area: "filter"
      }, {
        caption: "Activity",
        dataField: "activity",
        width: 120,
        area: "row"
      }, {
        caption: "Mood",
        dataField: "mood",
        width: 120,
        area: "column"
      }, {
        caption: "Place",
        dataField: "place",
        width: 120,
        area: "filter"
      }, {
        caption: "Person",
        dataField: "person",
        area: "filter"
      }, 
      {
        dataField: "hours",
        dataType: "number",
        summaryType: "sum",
        area: "data"
      }],
      store: this.customStore,
      remoteOperations: false,
    });
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });
  }

  contextMenuPreparing(e) {
    var dataSource = e.component.getDataSource(),
      sourceField = e.field;
    console.log('contextMenuPreparing');
    if (sourceField) {
      if (!sourceField.groupName || sourceField.groupIndex === 0) {
        e.items.push({
          text: "Hide field",
          onItemClick: function () {
            var fieldIndex;
            if (sourceField.groupName) {
              fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
            } else {
              fieldIndex = sourceField.index;
            }

            dataSource.field(fieldIndex, {
              area: null
            });
            dataSource.load();
          }
        });
      }

      if (sourceField.dataType === "number") {
        var setSummaryType = function (args) {
          dataSource.field(sourceField.index, {
            summaryType: args.itemData.value
          });
          dataSource.load();
        },
        menuItems = [];

        e.items.push({ text: "Summary Type", items: menuItems });

        for (let summaryType of ["Sum", "Avg", "Min", "Max"]) {
          var summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: setSummaryType,
            selected: e.field.summaryType === summaryTypeValue
          });
        }
      }
    }
  }

  
public  onChangeReport(report) {
     
    alert(report); 
}
}

