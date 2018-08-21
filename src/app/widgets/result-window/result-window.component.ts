import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

export interface resultTemp{
  layerName: string,
  attributes: object
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  showFeatureCollections(featureCollections){

    if(featureCollections[0] && featureCollections[0].type && featureCollections[0].type == "FeatureCollection"){
      this.change.emit(featureCollections);
    }
    
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
  
  showingIndex = 0;
  showingAttributes = [];

  results:resultTemp[] = [];

  ngOnInit() {
    this.resservice.change.subscribe(fcs=> {
      this.execute(fcs)
    })
  }

  execute(fcs){

    console.log(fcs);
    
    for (let i = 0; i < fcs.length; i++) {
      const layername = fcs[i].layerName;

      for (let j = 0; j < fcs[i].features.length; j++) {
        const feature = fcs[i].features[j];
        const prop = feature.properties;

        let keys = Object.keys(prop);
        let attributes = []

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          attributes.push(
            {column: key, value: prop[key]}
          )
        }

        this.results.push({
          layerName: layername,
          attributes: attributes
        })

      } 
    }

    console.log(this.results);
    
    this.showresults()
  }

  showresults(){
    if(this.results.length == 0 ) {}
    this.show = true;
  }

  showPrevious(){
    this.showingIndex -= 1
  }
  
  showNext(){
    this.showingIndex += 1
  }
 
  closeWindow(e){
    e.preventDefault();
    this.show = false;
    this.showingIndex = 0;
    this.results = []
  }
  
}



