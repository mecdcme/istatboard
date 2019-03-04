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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hack-pivot',
  templateUrl: './hack-pivot.component.html',
  styleUrls: ['./hack-pivot.component.scss']
})
export class HackPivotComponent implements OnInit {
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;

  customStore: any;
  pivotList: any[] = [];

  pivotGridDataSource: any;
  customDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  showRowGrandTotals: boolean = false;
  showColumnGrandTotals: boolean = false;
  showChart: boolean = true;

  public pivotSel: any = -1;
  public source: string;

  ngOnInit() {
    this.source = this.route.snapshot.params['source'];
    this.ihackservice.getPivotList(this.source).subscribe(list => this.pivotList = list);
    // this.getRemoteReport();
  }


  constructor(private route: ActivatedRoute, private ihackservice: IstatHackService) { }

  public onSelectPivot() {
    let _this = this
    if (this.pivotSel.id > 0) {
      //this.resetGraph();
      //  this.lineChartLabels = [];

      this.customStore = new CustomStore({
        load: function (loadOptions: any) {
          return _this.ihackservice.getPivotData(_this.pivotSel.id);
        }
      });
      this.pivotGridDataSource = new PivotGridDataSource({ fields: JSON.parse(this.pivotSel.fields), store: this.customStore, remoteOperations: false });
    }
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
}

