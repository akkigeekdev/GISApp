import { Component, OnInit } from '@angular/core';
import View from 'ol/view';
import Map from 'ol/map';
import proj from 'ol/proj';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import LayerGroup from 'ol/layer/group';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  map: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createmMap();
  }

  createmMap(): void {

    this.map = new Map({
      target: 'map',
      layers: this.getlayersToAdd(),
      view: new View({
        center: proj.transform(
          [72.821807, 18.974611], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5,
        minZoom: 4,
        maxZoom: 25
      })
    });
  }

  getlayersToAdd(): any {

    let layers = [];

    // adding online layers
    layers.push(new Tile({
      source: new OSM()
    }));



    // adding server layers 
    // layers.push(new LayerGroup({
    //   layers: [
    //     new Tile({
    //       source: new TileWMS({
    //         url: 'http://192.168.1.11:6600/geoserver/wms',
    //         params: { 'LAYERS': 'Farming:farm' },
    //         serverType: 'geoserver',
    //         isBaseLayer: false,
    //         crossOrigin: 'anonymous'
    //       }),
    //       opacity: 0.5

    //     }),
    //     new Tile({
    //       source: new TileWMS({
    //         url: 'http://192.168.1.11:6600/geoserver/wms',
    //         params: { 'LAYERS': 'Farming:plotdata' },
    //         serverType: 'geoserver',
    //         isBaseLayer: false,
    //         crossOrigin: 'anonymous'
    //       }),
    //       opacity: 0.5
    //     }),
    //     new Tile({
    //       source: new TileWMS({
    //         url: 'http://192.168.1.11:6600/geoserver/wms',
    //         params: { 'LAYERS': 'Farming:waterpipeline' },
    //         serverType: 'geoserver',
    //         isBaseLayer: false,
    //         crossOrigin: 'anonymous'
    //       }),
    //       opacity: 0.5
    //     }),
    //     new Tile({
    //       source: new TileWMS({
    //         url: 'http://192.168.1.11:6600/geoserver/wms',
    //         params: { 'LAYERS': 'Farming:irigationpoint' },
    //         serverType: 'geoserver',
    //         isBaseLayer: false,
    //         crossOrigin: 'anonymous'
    //       })
    //     }),
    //     new Tile({
    //       source: new TileWMS({
    //         url: 'http://192.168.1.11:6600/geoserver/wms',
    //         params: { 'LAYERS': 'Farming:waterpumpcontroller' },
    //         serverType: 'geoserver',
    //         isBaseLayer: false,
    //         crossOrigin: 'anonymous'
    //       }),
    //       opacity: 0.5
    //     })
    //   ]
    // }));



    return layers;

  }

}
