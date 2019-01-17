import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';

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
  rome = fromLonLat([12.5, 41.9]);

  ngOnInit() {

    /* Feature and vector */

    this.marker = new Feature({
      // Added fromLonLat
      geometry: new Point(fromLonLat([27.46164, 53.902257]))
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
      center: fromLonLat([27.56164, 53.902257]),
    // center:this.rome,
      zoom: 6
    });

    this.map = new OlMap({
      target: 'map',
       // Added both layers
       layers: [this.layer, this.vectorLayer],
      view: this.view
    });





  }

  

}
