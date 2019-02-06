import { Component, OnInit } from '@angular/core';

import { Sale } from 'src/app/classes/Sale';
import { IstatServiceService } from 'src/app/services/istat-service.service';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
    selector: 'app-istat-pivot-grid',
    templateUrl: './istat-pivot-grid.component.html',
    styleUrls: ['./istat-pivot-grid.component.scss']
})
export class IstatPivotGridComponent implements OnInit {
    pivotGridDataSource: any;
    showDataFields: boolean = true;
    showRowFields: boolean = true;
    showColumnFields: boolean = true;
    showFilterFields: boolean = true;

    constructor(private iservice: IstatServiceService) {
        this.pivotGridDataSource = new PivotGridDataSource({
            fields: [{
                caption: "Region",
                width: 120,
                dataField: "region",
                area: "row"
            }, {
                caption: "City",
                dataField: "city",
                width: 150,
                area: "row",
                selector: function (data: Sale) {
                    return data.city + " (" + data.country + ")";
                }
            }, {
                dataField: "date",
                dataType: "date",
                area: "column"
            }, {
                dataField: "sales",
                dataType: "number",
                summaryType: "sum",
                format: "currency",
                area: "data"
            }],
            store: iservice.getSales()
        });


    }

    ngOnInit() {
    }

    contextMenuPreparing(e) {
        var dataSource = e.component.getDataSource(),
            sourceField = e.field;

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
