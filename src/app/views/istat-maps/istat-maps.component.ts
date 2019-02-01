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

  public rowsFeature:Array<any> = [];
  public columnsFeature:Array<any> = [
    {title: 'ID', name: 'id', sort:true, filtering: {filterString: '', placeholder: 'Filter by Id'} },
    {title: 'Terrain type', name: 'name',  sort: true, filtering: {filterString: '', placeholder: 'Filter by type'} },
    {title: 'Center Map', name: 'center'  },
  ];




  constructor() {
    this.gridVisible =true;
  }

  ngOnInit() {
    let _thisC = this;
    this.popup.nativeElement.style.display = "none";


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
      console.log(features); 
      var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      
        return feature;
      });
      
      if (feature) {
       
        //   document.getElementById('popup').style.display = "inline";
        _thisC.popup.nativeElement.style.display = "inline";

        let coordinate = evt.coordinate;

        _thisC.popupContent.nativeElement.innerHTML = feature.get('description');

        let overlay;
        if (this.getOverlays().getLength() > 0) {
          overlay = this.getOverlays().getArray()[0];
          overlay.setPosition(coordinate);
        }
        else {
          overlay = new Overlay({
            element: _thisC.popup.nativeElement,//document.getElementById('popup'),

            position: coordinate,

          });
          this.addOverlay(overlay);
        }


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
          _thisC.rowsFeature.push({id:feat.getId(),name:feat.get('name'),center:_thisC.button(feat.getId())});
       }
       
    
       
      }
    });

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
  public centerPolygonId() { 
   alert('a');
    //idfeat: string='1';
    //var feat= this.vectorLayerKlm.getSource().getFeatureById(idfeat);
   // var polygon = feat.getGeometry();
   // this.view.fit(polygon, { padding: [170, 50, 30, 150], constrainResolution: false });
 
  }

 
  @Output() public button(idfeat: string) {
       return '<button class="btn btn-sm btn-primary" onClick="centerPolygonId()"><i class="fa fa-map-marker"></i></button>';
    // return '<button class="btn btn-sm btn-primary" (click)="centerPolygonId(\''+ idfeat + '\')"><i class="fa fa-map-marker"></i></button>';
}


}
