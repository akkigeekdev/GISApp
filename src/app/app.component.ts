import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core'
import View from 'ol/view'
import Map from 'ol/map'
import {transform} from 'ol/proj'
import OSM from 'ol/source/OSM'
import Tile from 'ol/layer/tile'
import TileWMS from 'ol/source/tilewms'
import {Globals} from './globals'
import { WidgetService } from './widget.service'
import { WidgetDirective } from './widget.directive'
import {defaults as defaultControls, ScaleLine, FullScreen} from 'ol/control.js';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(WidgetDirective) appWidget: WidgetDirective;

  map:any;
  drawerOpenStatus:boolean = false;
  widgets = [];

  scaleLineControl = new ScaleLine();
  
  constructor(
    private globals:Globals,
    private widgetservice: WidgetService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private http: HttpClient
  ){
    this.widgets = this.widgetservice.getWidgets();
  }

  toggleDrawer():void{
    this.drawerOpenStatus = !this.drawerOpenStatus;
  }

  ngAfterViewInit() {
    this.scaleLineControl.setUnits("metric");
    
    this.map = new Map({
      target: 'map',
      controls: defaultControls({attribution: false}).extend([
        this.scaleLineControl,
        new FullScreen()
      ]),
      layers: [
        new Tile({ source: new OSM(), title: "Basemap", id:"0" })
      ],
      view: new View({
        center: transform(
          [73.999070, 17.617549], 'EPSG:4326', 'EPSG:3857'),
          // [72.821807, 18.974611], 'EPSG:4326', 'EPSG:3857'),
          zoom: 18,
          minZoom: 4,
          maxZoom: 20
        // zoom: 5,
        // minZoom: 4,
        // maxZoom: 25
      })
    });
    this.globals.map = this.map;
    
    this.addLayers()
  }

  addLayers(){

    let promises = [];
    let layers = [
      {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:farm' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Farm',
        id: 1
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:site' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Site',
        id: 2
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:plot' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Plot',
        id: 3
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:soil_S' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Soil',
        id: 4
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:waterpump' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterpump',
        id: 5
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:watersupply' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Watersupply',
        id: 6
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:watertank' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Watertank',
        id: 7
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:valves' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Valves',
        id: 8
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:AmbientTemperature_AT' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Ambient Temperature',
        id: 9
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:PressureTransducer_PT' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Pressure Transducer',
        id: 10
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:humidity_H' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Humidity',
        id: 11
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:optical' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Optical',
        id: 12
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:rate_R' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Rate',
        id: 13
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:waterlevel_WL_in_field' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterlevel(Wl)In_Field',
        id: 14
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:waterlevel_WL_in_tank' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterlevel(Wl)In_Tank',
        id: 15
      }, {
        sourceinfo: {
          url: 'http://192.168.1.11:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecesionFarming:weather_W' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Weather(W)',
        id: 16
      }

    ]

    // convert to tile layers
    let tilelayers = layers.map(l=>{
      return new Tile({
        source: new TileWMS(l.sourceinfo),
        title: l.title,
        id: l.id
      });
    });

    // create layer grp
    // new LayerGroup({ layers: tilelayers })

    for (let i = 0; i < tilelayers.length; i++) {
      const tlayer = tilelayers[i];
      this.map.addLayer(tlayer);

      let source = tilelayers[i].getSource()
      let promise = new Promise((resolve,reject)=>{ 
        source.on("tileloadend", function(){
          resolve();
        });
        source.on('tileloaderror', function() {
          reject();
        });
      });

      promises.push(promise);
    }

    Promise.all(promises).then( this.loadWidgets.bind(this) );
    // this.loadWidgets()
  }

  loadWidgets():void{
    for (let i = 0; i < this.widgets.length; i++) {
      const widgetItem = this.widgets[i];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetItem.component);
      let viewContainerRef = this.appWidget.viewContainerRef;
      try {
        viewContainerRef.createComponent(componentFactory);
      } catch (error) {
      }
    }
    
  }
  

  StartIdentify(){
    this.map.on('singleclick', showResult.bind(this))
    function showResult(evt){
      console.log(evt.coordinate);
      console.log(transform([evt.coordinate[0], evt.coordinate[1]],  'EPSG:3857','EPSG:4326'));

      let coord = evt.coordinate;
      coord = transform([coord[0], coord[1]],  'EPSG:3857','EPSG:4326')

      coord.push(
        (coord[0] + 0.005),
        (coord[1] + 0.005)
      )

      coord=coord.join(",")+"";

      console.log(coord);
      
      
      
      let url = "http://192.168.1.11:6600/geoserver/PrecesionFarming/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image:png&TRANSPARENT=true&QUERY_LAYERS=PrecesionFarming:farm&LAYERS=PrecesionFarming:farm&INFO_FORMAT=application/json&FEATURE_COUNT=300&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX="+coord;
   

      this.http.get(url)
        .subscribe(
          (res)=>{console.log(res)},
          (error)=>{ console.log(error)}
        )
    }
    
  }
}


//http://localhost:6600/geoserver/PrecesionFarming/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image:png&TRANSPARENT=true&QUERY_LAYERS=PrecesionFarming:plot&LAYERS=PrecesionFarming:plot&INFO_FORMAT=application/json&FEATURE_COUNT=300&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX=73.9953256362152, 17.615813190566428, 74.00281436378478, 17.619284792734277