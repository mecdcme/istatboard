import { Component, OnInit, ElementRef, ViewChild, Input, Output } from '@angular/core';


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
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';



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


  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  vectorLayerKlm: OlVectorLayer;
  vectorLayerKlmPoint: OlVectorLayer;
  rome = fromLonLat([12.5, 41.9]);


  info: string = '-';

  constructor() {

  }

  ngOnInit() {
    let _thisC = this;


    /**
           * Create an overlay to anchor the popup to the map.
           */

    this.vectorLayerKlm = new OlVectorLayer({
      source: new OlVectorSource({
        url: 'assets/data/kml/layer1.kml',
        format: new OlKML()
      })
    });
    this.vectorLayerKlmPoint = new OlVectorLayer({
      source: new OlVectorSource({
        url: 'assets/data/kml/poi.kml',
        format: new OlKML()
      })
    });


    /* Feature and vector */

    this.marker = new Feature({
      // Added fromLonLat
      geometry: new Point(this.rome),
     
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
      preload: 4
    });

    this.view = new OlView({
      //  center: fromLonLat([27.56164, 53.902257]),
      projection: 'EPSG:3857',
      center: this.rome,
      zoom: 12
    });

    this.map = new OlMap({
      target: 'map',
      //   overlays: [this.overlay],
      // Added both layers
      layers: [this.layer, this.vectorLayerKlm, this.vectorLayerKlmPoint],
      view: this.view,
    });

    //  this.map.on('singleclick', function(evt) {
    this.map.on('pointermove', function (event) {
      let features = _thisC.map.getFeaturesAtPixel(event.pixel);
      if (!features) {
        _thisC.info = '-';

        return;
      }
      let desc = features[0].get('name');
        _thisC.info = desc;


    });

  }



}
