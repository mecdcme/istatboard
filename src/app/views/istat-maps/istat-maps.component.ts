import { Component, OnInit, ElementRef, ViewChild,Input ,Output} from '@angular/core';
 

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlKML from 'ol/format/KML';
import Overlay from 'ol/Overlay';


import { fromLonLat } from 'ol/proj';




@Component({
  selector: 'app-istat-maps',
  templateUrl: './istat-maps.component.html',
  styleUrls: ['./istat-maps.component.scss']
})
export class IstatMapsComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  marker: Feature;
  featuresKml: Feature[];
  @Input() gridVisible?: boolean = true;
  

  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  vectorLayerKlm: OlVectorLayer;
  rome = fromLonLat([12.5, 41.9]);
  lecce = fromLonLat([18.1728, 40.358]);
   
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('popupContent') popupContent: ElementRef;

  // ng-table
  public rowsFeature:Array<any> = [];
  public rows:Array<any> = [];
  public columnsFeature:Array<any> = [
    {title: 'ID', name: 'id', sort:true  },
    {title: 'Terrain type', name: 'name',  sort: true },
    {title: 'Center Map', name: 'center' },
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public totalItems:number = 0;
  public config:any = {
    paging: true,
   
    sorting: {columns: this.columnsFeature},
    //filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  private data:Array<any> = this.rowsFeature;

  constructor() {
    this.gridVisible =true;
    this.length = this.data.length;
  }

  ngOnInit() {
    let _thisC = this;
    this.popup.nativeElement.style.display = "none";
    this.onChangeTable(this.config);

    /**
           * Create an overlay to anchor the popup to the map.
           */

    this.vectorLayerKlm = new OlVectorLayer({
      source: new OlVectorSource({
        url: 'assets/data/kml/doc.kml',
        format: new OlKML()
      })
    });


    /* Feature and vector */

    this.marker = new Feature({
      // Added fromLonLat
      geometry: new Point(this.lecce)
    });

    this.vectorSource = new OlVectorSource({
      features: [this.marker]
    });

    this.vectorLayer = new OlVectorLayer({
      source: this.vectorSource
    });


    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png',
      features: [this.marker]
    });

    this.layer = new OlTileLayer({
      source: this.source,
      preload:4
    });

    this.view = new OlView({
      //  center: fromLonLat([27.56164, 53.902257]),
      projection: 'EPSG:3857',
      center: this.lecce,
      zoom: 9
    });

    this.map = new OlMap({
      target: 'map',
      //   overlays: [this.overlay],
      // Added both layers
      layers: [this.layer, this.vectorLayerKlm],
      view: this.view
    });

    //  this.map.on('singleclick', function(evt) {
    this.map.on('pointermove', function (evt) {
      
      let features =  this.getFeaturesAtPixel(evt.pixel) ;
      let coordinate = evt.coordinate;
       
      var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
         return feature;
      });
      
      if (feature) {
       
        _thisC.viewPopupFeature(feature,coordinate);
        }
      else {
        _thisC.popup.nativeElement.style.display = "none";

      }


    });


    this.vectorLayerKlm.getSource().on('change', function (evt) {
      var source = evt.target;
      if (source.getState() === 'ready') {
        var numFeatures = source.getFeatures().length;

        _thisC.featuresKml = source.getFeatures();
       
        for (  let feat of _thisC.featuresKml   ) {
       //   _thisC.rowsFeature.push({id:feat.getId(),name:feat.get('name'),center:_thisC.button(feat.getId())});
       _thisC.rowsFeature.push({id:feat.get('@id'),name:feat.get('name'),center:_thisC.button(feat.get('@id'))});
       }
       
       _thisC.length = _thisC.rowsFeature.length;
       _thisC.data=_thisC.rowsFeature;
       _thisC.onChangeTable( _thisC.config);
     // _thisC.page=1;
      // _thisC.changePage( _thisC.page)  ;
      }
    });

  }
  viewPopupFeature(feature: any,coordinate:any): any {
     //   document.getElementById('popup').style.display = "inline";
     this.popup.nativeElement.style.display = "inline";

   
   //  this.popupContent.nativeElement.innerHTML = feature.get('description');
     this.popupContent.nativeElement.innerHTML = feature.get('name');

     let overlay;
     if (this.map.getOverlays().getLength() > 0) {
       overlay = this.map.getOverlays().getArray()[0];
       overlay.setPosition(coordinate);
     }
     else {
       overlay = new Overlay({
         element:this.popup.nativeElement,//document.getElementById('popup'),

         position: coordinate,

       });
       this.map.addOverlay(overlay);
     }
    
  }
  over(evt) {
    var coordinate = evt.coordinate;
    //    document.getElementById('popup-content').innerHTML = '<code>' + feature.get('name') + '</code>';
    this.popupContent.nativeElement.innerHTML = '<code>' + coordinate + '</code>';

  }

  stampa() {

    let featuresk = this.vectorLayerKlm.getSource().getFeatures();
    this.featuresKml = featuresk;

    console.log(featuresk.length);
    // for (let entry of featuresk) {
    //  console.log(entry); // 1, "string",
    //}

  }
  
  public centerPolygon(feat: Feature) { 
    var polygon = feat.getGeometry();
    this.view.fit(polygon, { padding: [170, 50, 30, 150], constrainResolution: false });
 
  }
  public centerPolygonId(event) {
    let idfeat: string = event.row.id;
    //     overpassturbo  let feat= this.vectorLayerKlm.getSource().getFeatureById(idfeat); getFeatures()
    let feat= this.vectorLayerKlm.getSource().getFeatures().find(x => x.get('@id') == idfeat);
    let polygon = feat.getGeometry();
    var center =  feat.getGeometry().getCoordinates()[0];
    this.viewPopupFeature(feat,center)
     this.view.fit(polygon, { padding: [170, 50, 30, 150],  nearest: true });
 
  }

 
 public button(idfeat: string) {
       return '<button class="btn btn-sm btn-primary" ><i class="fa fa-map-marker"></i></button>';
    // return '<button class="btn btn-sm btn-primary" (click)="centerPolygonId(\''+ idfeat + '\')"><i class="fa fa-map-marker"></i></button>';
}
public changePage(page:any, data:Array<any> = this.data):Array<any> {
  let start = (page.page - 1) * page.itemsPerPage;
  let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  return data.slice(start, end);
}

public changeSort(data:any, config:any):any {
  if (!config.sorting) {
    return data;
  }

  let columns = this.config.sorting.columns || [];
  let columnName:string = void 0;
  let sort:string = void 0;

  for (let i = 0; i < columns.length; i++) {
    if (columns[i].sort !== '' && columns[i].sort !== false) {
      columnName = columns[i].name;
      sort = columns[i].sort;
    }
  }

  if (!columnName) {
    return data;
  }

  // simple sorting
  return data.sort((previous:any, current:any) => {
    if (previous[columnName] > current[columnName]) {
      return sort === 'desc' ? -1 : 1;
    } else if (previous[columnName] < current[columnName]) {
      return sort === 'asc' ? -1 : 1;
    }
    return 0;
  });
}

public changeFilter(data:any, config:any):any {
  let filteredData:Array<any> = data;
  this.columnsFeature.forEach((column:any) => {
    if (column.filtering) {
      filteredData = filteredData.filter((item:any) => {
        return item[column.name].match(column.filtering.filterString);
      });
    }
  });

  if (!config.filtering) {
    return filteredData;
  }

  if (config.filtering.columnName) {
    return filteredData.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));
  }

  let tempArray:Array<any> = [];
  filteredData.forEach((item:any) => {
    let flag = false;
    this.columnsFeature.forEach((column:any) => {
      if (item[column.name].toString().match(this.config.filtering.filterString)) {
        flag = true;
      }
    });
    if (flag) {
      tempArray.push(item);
    }
  });
  filteredData = tempArray;

  return filteredData;
}

public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  if (config.filtering) {
    Object.assign(this.config.filtering, config.filtering);
  }

  if (config.sorting) {
    Object.assign(this.config.sorting, config.sorting);
  }

  let filteredData = this.changeFilter(this.rowsFeature, this.config);
  let sortedData = this.changeSort(filteredData, this.config);
  this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  this.length = sortedData.length;
}

}
