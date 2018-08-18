import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from "../../result.service";

export interface resultTemp{
  layerName: string,
  attributes: object
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
      this.show = true; 
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
          attributes: prop
        })
      }      
    }

    console.log(this.results);
    
  }

 
  closeWindow(e){
    e.preventDefault();
    this.show = false;
  }
  
}
