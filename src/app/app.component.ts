import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core'
import View from 'ol/view'
import Map from 'ol/map'
import proj from 'ol/proj'
import OSM from 'ol/source/OSM'
import Tile from 'ol/layer/tile'
import TileWMS from 'ol/source/tilewms'
import {Globals} from './globals'
import { WidgetService } from './widget.service'
import { WidgetDirective } from './widget.directive'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(WidgetDirective) appWidget: WidgetDirective;

  map:any;
  drawerOpenStatus:boolean = true;
  widgets = [];

  constructor(
    private globals:Globals,
    private widgetservice: WidgetService,
    private componentFactoryResolver:ComponentFactoryResolver
  ){
    this.widgets = this.widgetservice.getWidgets();
  }

  toggleDrawer():void{
    this.drawerOpenStatus = !this.drawerOpenStatus;
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({ source: new OSM() })
      ],
      view: new View({
        center: proj.transform(
          [72.821807, 18.974611], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5,
        minZoom: 4,
        maxZoom: 25
      })
    });
    this.globals.map = this.map;
    
    this.addLayers();
  }

  addLayers(){

    // let promises = [];
    // let layers = [
    //   {
    //     sourceinfo: {
    //       url: 'http://192.168.1.11:6600/geoserver/wms',
    //       params: { 'LAYERS': 'Farming:farm' },
    //       serverType: 'geoserver',
    //       isBaseLayer: false,
    //       crossOrigin: 'anonymous'
    //     },
    //     title: "Farm",
    //     id: 1
    //   },
    //   {
    //     sourceinfo: {
    //       url: 'http://192.168.1.11:6600/geoserver/wms',
    //       params: { 'LAYERS': 'Farming:plotdata' },
    //       serverType: 'geoserver',
    //       isBaseLayer: false,
    //       crossOrigin: 'anonymous'
    //     },
    //     title: "Plot",
    //     id: 2
    //   },
    //   {
    //     sourceinfo: {
    //       url: 'http://192.168.1.11:6600/geoserver/wms',
    //       params: { 'LAYERS': 'Farming:waterpipeline' },
    //       serverType: 'geoserver',
    //       isBaseLayer: false,
    //       crossOrigin: 'anonymous'
    //     },
    //     title: "Water Pipeline",
    //     id: 3
    //   },
    //   {
    //     sourceinfo: {
    //       url: 'http://192.168.1.11:6600/geoserver/wms',
    //       params: { 'LAYERS': 'Farming:irigationpoint' },
    //       serverType: 'geoserver',
    //       isBaseLayer: false,
    //       crossOrigin: 'anonymous'
    //     },
    //     title: "Irigation Point",
    //     id: 4
    //   },
    //   {
    //     sourceinfo: {
    //       url: 'http://192.168.1.11:6600/geoserver/wms',
    //       params: { 'LAYERS': 'Farming:waterpumpcontroller' },
    //       serverType: 'geoserver',
    //       isBaseLayer: false,
    //       crossOrigin: 'anonymous'
    //     },
    //     title: "Water Pump Controller",
    //     id: 5
    //   }
    // ]

    // // convert to tile layers
    // let tilelayers = layers.map(l=>{
    //   return new Tile({
    //     source: new TileWMS(l.sourceinfo),
    //     title: l.title,
    //     id: l.id
    //   });
    // });

    // // create layer grp
    // // new LayerGroup({ layers: tilelayers })

    // for (let i = 0; i < tilelayers.length; i++) {
    //   const tlayer = tilelayers[i];
    //   this.map.addLayer(tlayer);

    //   let source = tilelayers[i].getSource()
    //   let promise = new Promise((resolve,reject)=>{ 
    //     source.on("tileloadend", function(){
    //       resolve();
    //     });
    //     source.on('tileloaderror', function() {
    //       reject();
    //     });
    //   });

    //   promises.push(promise);
    // }

    // Promise.all(promises).then( this.loadWidgets.bind(this) );
    this.loadWidgets()
  }



  // public setVisibilityWMSLayer(layerId) {
  //   let allWMSLAyers = this.getAllWMsLayers();
  //   allWMSLAyers.forEach(function (layer) {
  //     if (layer.get('id') === layerId) {
  //       layer.setVisible(layer.getVisible() ? false : true);
  //     }

  //   });
  // }

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
  
}
