import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  showFeatureCollections(featureCollections){

    if( featureCollections && !Array.isArray(featureCollections)){
      featureCollections = [featureCollections]
    }
    
    this.change.emit(featureCollections);
  }

}
