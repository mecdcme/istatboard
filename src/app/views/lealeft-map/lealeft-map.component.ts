import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, GeoJSON} from 'leaflet';


@Component({
  selector: 'app-lealeft-map',
  templateUrl: './lealeft-map.component.html',
  styleUrls: ['./lealeft-map.component.scss']
})
export class LealeftMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  cartoDB_PositronNoLabels = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a target="_blank" href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });



 

 

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
