import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlKML from 'ol/format/KML';
import OlBingMaps from 'ol/source/BingMaps';
 

import {fromLonLat} from 'ol/proj';
 
 
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
  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  vectorLayerKlm: OlVectorLayer;
  rome = fromLonLat([12.5, 41.9]);

 

  ngOnInit() {


    this.vectorLayerKlm = new OlVectorLayer({
      source: new OlVectorSource({
        url: 'assets/data/kml/doc.kml',
        format: new OlKML()
      })
    });


    /* Feature and vector */

    this.marker = new Feature({
      // Added fromLonLat
      geometry: new Point(fromLonLat([12.5, 41.91]))
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
     center:this.rome,
      zoom: 6
    });

    this.map = new OlMap({
      target: 'map',
       // Added both layers
       layers: [this.layer, this.vectorLayerKlm],
      view: this.view
    });
    

  }

  

}
