import { Component, ViewChild, ComponentFactoryResolver  } from '@angular/core'
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
import { ResultService } from "./result.service";

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
    private http: HttpClient,
    private resservice: ResultService
  ){
    this.widgets = this.widgetservice.getWidgets();
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
          zoom: 18,
          minZoom: 4,
          maxZoom: 20
      })
    });
    this.globals.map = this.map;
    
    this.addLayers()
    // this.loadWidgets()
  }

  addLayers(){

    let layers = [
      {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:farm' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Farm',
        id: 1
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:site' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Site',
        id: 2
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:plot' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Plot',
        id: 3
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:soil_S' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Soil',
        id: 4
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:waterpump' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterpump',
        id: 5
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:watersupply' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Watersupply',
        id: 6
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:watertank' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Watertank',
        id: 7
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:valves' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Valves',
        id: 8
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:AmbientTemperature_AT' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Ambient Temperature',
        id: 9
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:PressureTransducer_PT' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Pressure Transducer',
        id: 10
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:humidity_H' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Humidity',
        id: 11
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:optical' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Optical',
        id: 12
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:rate_R' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Rate',
        id: 13
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:waterlevel_WL_in_field' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterlevel(Wl)In_Field',
        id: 14
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:waterlevel_WL_in_tank' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Waterlevel(Wl)In_Tank',
        id: 15
      }, {
        sourceinfo: {
          url: 'http://192.168.1.14:6600/geoserver/wms',
          params: { 'LAYERS': 'PrecisionFarming:weather_W' },
          serverType: 'geoserver',
          isBaseLayer: false,
          crossOrigin: 'anonymous'
        },
        title: 'Weather(W)',
        id: 16
      }

    ]

    let tilelayers = layers.map(l=>{
      return new Tile({
        source: new TileWMS(l.sourceinfo),
        title: l.title,
        id: l.id
      });
    });

    for (let i = 0; i < tilelayers.length; i++) {
      const tlayer = tilelayers[i];
      this.map.addLayer(tlayer);
    }

    this.loadWidgets();

  }

  loadWidgets():void{
    for (let i = 0; i < this.widgets.length; i++) {
      const widgetItem = this.widgets[i];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetItem.component);
      let viewContainerRef = this.appWidget.viewContainerRef;
      try {
        setTimeout(function(){viewContainerRef.createComponent(componentFactory);},100)
      } catch (error) {
      }
    }
  }
  
  StartIdentify(){

    let promises = [], 
    global = this.globals , 
    http = this.http,
<<<<<<< HEAD
    map = this.map;
    this.map.once('singleclick', function(evt){
=======
    result = this.resservice;

    this.map.once('singleclick', function(evt){

>>>>>>> 97f1491e6ec87310afdcc82b465551c2a936e925
      let coord = transform([ evt.coordinate[0],  evt.coordinate[1]],  'EPSG:3857','EPSG:4326');
      let box:any = [
        (coord[0] - 0.0001),
        (coord[1] - 0.0001),
        (coord[0] + 0.0001),
        (coord[1] + 0.0001)
      ]
      box = box.join(",")+"";
      let visibleLayers = global.getVisibleLayers();
      
      for (let i = 1; i < visibleLayers.length; i++) {

        const layer = visibleLayers[i].getSource().getParams().LAYERS;
        
        let url = `http://192.168.1.14:6600/geoserver/PrecisionFarming/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image:png&TRANSPARENT=true&QUERY_LAYERS=${layer}&LAYERS=${layer}&INFO_FORMAT=application/json&FEATURE_COUNT=300&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX=${box}`;
        // console.log(url);
        
        if(layer != "Basemap"){
          promises.push(
            new Promise((resolve, reject)=>{
              http.get(url).subscribe(
                (res)=>{ res["layerName"]= layer.split(":")[1] ;resolve(res) },
                (error)=>{ reject(error) }
              )
            })
          )
        }
      }

      Promise.all(promises).then(function(res){
        result.showFeatureCollections(res);
      }, function(error){
        console.log(error);
      })

    });
  }

  toggleDrawer():void{
    this.drawerOpenStatus = !this.drawerOpenStatus;
  }

}
