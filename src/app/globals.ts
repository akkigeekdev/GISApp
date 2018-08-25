import { Injectable } from '@angular/core';
import TileWMS from 'ol/source/tilewms'
@Injectable()
export class Globals {
  map: any;
  
  getVisibleLayers():any{
   
    return this.map.getLayers().getArray().filter(l=> 

      l.getVisible() 
    )
  }

  getFeatureCollections(){
    
  }
}