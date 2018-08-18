<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from "../../result.service";

export interface resultTemp{
  layerName: string,
  attributes: object
}
>>>>>>> 97f1491e6ec87310afdcc82b465551c2a936e925

@Component({
  selector: 'app-result-window',
  templateUrl: './result-window.component.html',
  styleUrls: ['./result-window.component.scss']
})
export class ResultWindowComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
  }

=======
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
  
>>>>>>> 97f1491e6ec87310afdcc82b465551c2a936e925
}
