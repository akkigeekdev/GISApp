import { Injectable } from '@angular/core';
import Feature from 'ol/Feature.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import {Stroke, Style} from 'ol/style.js';
import Circle from 'ol/geom/Circle';

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
    feature.geometry.coordinates.pop()
    let point = new Circle(feature.geometry.coordinates,0)
    point.transform('EPSG:4326', 'EPSG:3857')
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