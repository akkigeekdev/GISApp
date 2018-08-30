import { Injectable } from '@angular/core';
import Feature from 'ol/Feature.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import {Stroke, Style} from 'ol/style.js';
import Circle from 'ol/geom/Circle';
import WFS from 'ol/format/WFS';
import GeoJSON from 'ol/format/GeoJSON';

let featureNS = 'http://www.fairearthcounsultants.com';

@Injectable()
export class Globals {
  map: any;
  
  getVisibleLayers():any{
    return this.map.getLayers().getArray().filter(l=>l.getVisible())
  }
}

export interface FlashStyle{
  color?:string
}
export class FlashFeature{

  layer; source; timer; addedFeature = []
  constructor(
    private map:any,
    private features:Array<any>,
    private style?: FlashStyle 
  ){ 
    this.source = new VectorSource()
    this.layer = new VectorLayer({
      source: this.source
    })
    this.setStyle(this.style)
    this.map.addLayer(this.layer)

    this.addFeatures(this.features)
    this.start()
  }


  setStyle(style:FlashStyle){

    let color = "green";

    if(style && style.color) color = style.color

    let s = new Style({
      stroke: new Stroke({
          color: color,
          width: 10
      })
    })

    this.layer.setStyle(s)

  }

  addFeature(feature){
    let coor = feature.getGeometry().getCoordinates()
    coor.pop();
    let point = new Circle(coor,0)
    // point.transform('EPSG:4326', 'EPSG:3857')
    let f = new Feature({ geometry: point })
    this.source.addFeature(f)
    this.addedFeature.push(f)
  }

  addFeatures(features){
    for (let i = 0; i < features.length; i++) {
      const feature = features[i]
      this.addFeature(feature)
    }
  }

  removeAllFeature(){
    for (let i = 0; i < this.addedFeature.length; i++) {
      const f = this.addedFeature[i];
      this.source.removeFeature(f)
    }
  }

  start(){
    let isvisible=true;
    this.timer = setInterval(()=>{
      this.layer.setOpacity(isvisible?0:1)
      isvisible = !isvisible
    },500)
  }

  stop(){
    this.removeAllFeature()
    this.map.removeLayer(this.layer);
    clearInterval(this.timer)
  }

}

export class FeatureQuery{

  wfs; 
  featureRequest;
  filter; geometryName;  count;  bbox;

  constructor(
    public featurePrefix?: string,
    public featureTypes?:Array<string>
  ){
    this.wfs  = new WFS();
  }


  getWriteGetFeature(){

    let a:any =  {
      srsName: 'EPSG:3857',
      featureNS: featureNS,
      outputFormat: 'application/json',
      featurePrefix: this.featurePrefix,
      featureTypes: this.featureTypes,
      handle: "agfasdg"
    }

    if(this.filter)  a.filter = this.filter
    if(this.geometryName)  a.geometryName = this.geometryName
    if(this.count)  a.count = this.count
    if(this.bbox)  a.bbox = this.bbox

    return a;
  }

  send(successcallback:Function, failcallback:Function){
    
    if(!this.featurePrefix) {failcallback("FeaturePrefix need"); return}
    if(!this.featureTypes) {failcallback("FeatureTypes need"); return}

    this.featureRequest = this.wfs.writeGetFeature(this.getWriteGetFeature())


    fetch('http://192.168.1.14:6600/geoserver/wfs', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(this.featureRequest)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      var features = new GeoJSON().readFeatures(json);
      successcallback(features)
    }).catch((err)=>{
      failcallback(err)
    })
  }

}

export class EditFeature{
  
  wfs; request;
  constructor(
    public featurePrefix?:string,
    public featureType?:string,
    public srsName?:string
  ){
    this.wfs  = new WFS();
  }

  inserts(features,scallback, fcallback){
    this.request = this.wfs.writeTransaction(features,null,null, this.getOptions())
    this.send(scallback, fcallback);
  }
  updates(features,scallback, fcallback){
    this.request = this.wfs.writeTransaction(null, features, null, this.getOptions())
    this.send(scallback, fcallback);
  }
  deletes(features,scallback, fcallback){
    this.request = this.wfs.writeTransaction(null, null, features, this.getOptions())
    this.send(scallback, fcallback);
  }
  getOptions(){
    let a:any = {}

    if(this.featurePrefix) a.featurePrefix = this.featurePrefix;
    if(this.featureType) a.featureType = this.featureType;
    if(this.srsName) a.srsName = this.srsName;

    debugger
    return a
  }

  send(scallback, fcallback){
    debugger
    fetch('http://192.168.1.14:6600/geoserver/wfs', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(this.request)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      var features = new GeoJSON().readFeatures(json);
      scallback(features)
    }).catch((err)=>{
      fcallback(err)
    })
  }

}