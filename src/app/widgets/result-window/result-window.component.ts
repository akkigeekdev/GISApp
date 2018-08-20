import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

export interface resultTemp{
  layerName: string,
  attributes: object,
  showing: boolean
}

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
    debugger;
    this.change.emit(featureCollections);
  }
}



@Component({
  selector: 'app-result-window',
  templateUrl: './result-window.component.html',
  styleUrls: ['./result-window.component.scss']
})
export class ResultWindowComponent implements OnInit {

  constructor(private resservice: ResultService) { }
  
  show = false;

  hasPrevious = false;
  hasNext = false;

  results:resultTemp[] = [];

  ngOnInit() {
    this.resservice.change.subscribe(fcs=> {
      this.execute(fcs)
    })
  }

  execute(fcs){

    for (let i = 0; i < fcs.length; i++) {
      const layername = fcs[i].layerName;

      for (let j = 0; j < fcs[i].features.length; j++) {
        const feature = fcs[i].features[j];
        const prop = feature.properties;

        this.results.push({
          layerName: layername,
          attributes: prop,
          showing: (i==0)
        })
      }      
    }

    console.log(this.results);

    this.showresults()
  }


  showresults(){

  }

 
  closeWindow(e){
    e.preventDefault();
    this.show = false;
  }
  
}



