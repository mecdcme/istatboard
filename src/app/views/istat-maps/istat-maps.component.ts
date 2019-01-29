import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';

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
import { DivOverlayOptions } from 'leaflet';


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
  featuresKml: Feature;
  
  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  vectorLayerKlm: OlVectorLayer;
  rome = fromLonLat([12.5, 41.9]);

  @ViewChild('popup') popup: ElementRef;
  @ViewChild('popup-content') popupContent: ElementRef;
  @ViewChild('popupCloser') popupCloser: ElementRef;
  

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
      center: this.rome,
      zoom: 6
    });

    this.map = new OlMap({
      target: 'map',
    
      // Added both layers
      layers: [this.layer, this.vectorLayerKlm],
      view: this.view
    });

  //  this.map.on('singleclick', function(evt) {
    this.map.on('pointermove', function(evt) {
      var feature = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });
    var coordinate = evt.coordinate;
    if(feature)   document.getElementById('popup-content').innerHTML =  feature.get('description');
    //document.getElementById('popup-content').innerHTML = '<code>' + coordinate + '</code>';
   // this.getOverlays(0).setPosition(coordinate);
    //this.addOverlay(this.getOverlays(0));
 
    var vienna = new Overlay({
      position: coordinate,
      element:  document.getElementById('popup')
    });
    this.addOverlay(vienna);
       
      
    });

  }
  over(evt) {
    var coordinate = evt.coordinate;
  //  document.getElementById('popup-content').innerHTML = '<code>' + feature.get('name') + '</code>';
    document.getElementById('popup-content').innerHTML = '<code>' + coordinate + '</code>';
    
  }

  stampa() {

    let featuresk = this.vectorLayerKlm.getSource().getFeatures();
    this.featuresKml = featuresk;

    console.log(featuresk.length);
    // for (let entry of featuresk) {
    //  console.log(entry); // 1, "string",
    //}

  }
  public  centerPolygon(feat: Feature) {
    console.log('centerPolygon');

    //console.log(features_poly[0].geometry.bounds);
    var polygon = feat.getGeometry();

    //this.view.fit(bounds, {padding: [170, 50, 30, 150]});
    this.view.fit(polygon, { padding: [170, 50, 30, 150], constrainResolution: false });
   
    for (let entry of  feat.getKeys()) {
    
      console.log(entry); // 1, "string",
      console.log( feat.get(entry)); // 1, "string",
    }

  }


  maponsingleclick(evt) {
    //let pix=evt.pixel;

    let px = evt.pageX;
    let py = evt.pageY;

    // var hdms = toStringHDMS(toLonLat(coordinate));

    //  this.map.forEachFeatureAtPixel([px,py], function (feature, layer) {
    //  console.log(feature); // 1, "string",
    //});
  }

  

}
