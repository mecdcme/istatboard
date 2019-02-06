import { Component, OnInit, ViewChild } from '@angular/core';
import { IstatHackService } from 'src/app/services/istat-hack.service';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxPivotGridModule,
  DxPivotGridComponent,
  DxChartModule,
  DxChartComponent } from 'devextreme-angular';
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

  customStore:any;
  pivotGridDataSource: any;
  customDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  ngOnInit() {
  }
  constructor(private ihackservice: IstatHackService ) {

    this.customStore = new CustomStore({
      load: function (loadOptions: any) {
          var params = '?';

          params += 'skip=' + loadOptions.skip || 0;
          params += '&take=' + loadOptions.take || 12;

          if(loadOptions.sort) {
              params += '&orderby=' + loadOptions.sort[0].selector;
              if(loadOptions.sort[0].desc) {
                  params += ' desc';
              }
          }
          return ihackservice.getReportPivotUserWeek(params);
      }
  });

    this.pivotGridDataSource = new PivotGridDataSource({
      fields: [{
        caption: "User",
        width: 120,
        dataField: "user",
        area: "row"
      }, {
        caption: "Activity",
        dataField: "activity",
        width: 150,
        area: "row"
      }, {
        dataField: "Mood",
        dataType: "mood",
        area: "row"
      }, {
        dataField: "Place",
        dataType: "place",
        area: "row"
      }, {
        dataField: "Person",
        dataType: "person",
        area: "column"
      }, {
        dataField: "hours",
        dataType: "number",
        summaryType: "sum",
        area: "data"
      }],
      store:   this.customStore , 
      remoteOperations: false,
      
    });
  }
  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });
  }
  customizeTooltip(args) {
    const valueText =     args.originalValue;

    return {
      html: args.seriesName + "<div class='currency'>" + valueText + "</div>"
    };
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
        };
      }
    }
  }
}

