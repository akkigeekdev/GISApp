import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core'
import View from 'ol/View'
import Map from 'ol/Map'
import { transform } from 'ol/proj'
import OSM from 'ol/source/OSM'
import Tile from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import { Globals, FlashFeature, FeatureQuery } from './globals'
import { WidgetService } from './services/widget-loader/widget.service'
import { WidgetDirective } from './services/widget-loader/widget.directive'
import { defaults as defaultControls, ScaleLine } from 'ol/control.js';
import { HttpClient } from "@angular/common/http";
import { ResultService } from "./widgets/result-window/result-window.component";
import WMSCapabilities from 'ol/format/WMSCapabilities'
import { HttpHeaders } from '@angular/common/http'
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import { equalTo, bbox } from "ol/format/filter";
import BingMaps from 'ol/source/BingMaps';



export interface Params {
  LAYERS: any;
}
export interface sourceInfo {
  url: any;
  params: Params;
  serverType: 'geoserver',
  isBaseLayer: false,
  crossOrigin: 'anonymous',
  tiled: true;
}
export interface Layers {
  SourceInfo: sourceInfo;
  Title: any;
  LegendUrl: any;
  BoundingBox: any;
  id: any;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild(WidgetDirective) appWidget: WidgetDirective;

  map: any;
  drawerOpenStatus: boolean = false;
  widgets = [];

  scaleLineControl = new ScaleLine();

  constructor(
    private globals: Globals,
    private widgetservice: WidgetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient,
    private resservice: ResultService
  ) {
    this.widgets = this.widgetservice.getWidgets();
  }


  ngAfterViewInit() {
    this.scaleLineControl.setUnits("metric");

    let mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(5),
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: document.getElementById("widget-coordinate"),
      undefinedHTML: '&nbsp;'
    });
    
    this.map = new Map({
      target: 'map',
      controls: defaultControls({ attribution: false }).extend([
        this.scaleLineControl,
        mousePositionControl
      ]),
      layers: [
        new Tile(
          { 
            source: new BingMaps({
              key: 'AjN0UtayJCMrJz9YEVutFuV1AFiDkNt9kHFTtw7gC4expbJGflke5DkefuXns7Hd',
              imagerySet: 'Aerial'
            }), 
            title: "Basemap", 
            id: "0" })
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

    this.addLayers();
  }

  addLayers() {
    let layers: Layers[] = [];

    var parser = new WMSCapabilities();
    let WMSCapabilitiesUrl = "http://192.168.1.14:6600/geoserver/ows?service=wms&version=1.1.1&request=GetCapabilities";
    this.http
      .get(WMSCapabilitiesUrl, { headers: new HttpHeaders({ 'Accept': 'application/xml' }), responseType: 'text' })
      .subscribe((res: any) => {

        var result = parser.read(res);
        result.Capability.Layer.Layer[0].Layer.forEach(function (layer, index) {
          layers.push({
            SourceInfo: {
              url: 'http://192.168.1.14:6600/geoserver/wms',
              params: { LAYERS: layer.Name },
              serverType: 'geoserver',
              isBaseLayer: false,
              crossOrigin: 'anonymous',
              tiled: true
            },
            Title: layer.Title.toUpperCase(),
            LegendUrl: layer.Style[0].LegendURL[0].OnlineResource,
            BoundingBox: layer.BoundingBox[0].extent,
            id: index + 1
          })
        });

        let tilelayers = layers.map(l => {
          return new Tile({
            source: new TileWMS(l.SourceInfo),
            title: l.Title,
            id: l.id,
            legendUrl: l.LegendUrl,
            boundingBox: l.BoundingBox
          });
        });

        for (let i = 0; i < tilelayers.length; i++) {
          const tlayer = tilelayers[i];
          this.map.addLayer(tlayer);
        }

        this.loadWidgets();

      }, (error) => { console.log(error) }
      );

  }

  loadWidgets(): void {
    for (let i = 0; i < this.widgets.length; i++) {
      const widgetItem = this.widgets[i];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetItem.component);
      let viewContainerRef = this.appWidget.viewContainerRef;
      try {
        setTimeout(function () { viewContainerRef.createComponent(componentFactory); }, 100)
      } catch (error) { }
    }

    this.flashValve();
  }

  StartIdentify() {

    // get all visible layers name
    let layernames = this.globals.getVisibleLayers().reduce((acc, l) =>{
      if(l.getSource().getParams){
        const layer = l.getSource().getParams().LAYERS
        let name = layer.split(":")[1]
        acc.push(name)
      }      
      return acc
    },[])

    this.map.once('singleclick',  (evt) => {
      
      let coord = evt.coordinate
      let box: any = [ (coord[0] - 0.0001),(coord[1] - 0.0001), (coord[0] + 0.0001), (coord[1] + 0.0001) ]

      let query = new FeatureQuery()
      query.featurePrefix = 'PFDB';
      query.featureTypes = layernames;
      query.geometryName = "GEOM";
      query.bbox = box;
      
      query.send((features)=>{
        console.log(features);
        console.log(layernames)
        this.resservice.showFeatureCollections(features);
      }, (err) => {
        console.log(err);
      })
    })
  }

  toggleDrawer(): void {
    this.drawerOpenStatus = !this.drawerOpenStatus;
  }

  flashValve(){
    let query = new FeatureQuery();
    query.featurePrefix = 'PFDB';
    query.featureTypes = ['VALVE'];
    query.filter = equalTo('DEVICE_STATUS', 'ON');
    query.send( (features)=>{
      new FlashFeature(this.map, features,{color:"red"});
    }, (err) => {
      console.log(err);
    })

  }
}
