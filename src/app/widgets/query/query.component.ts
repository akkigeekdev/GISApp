import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals'
import { HttpClient } from "@angular/common/http";
export interface select {
  value: any;
  label: any;
}


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  constructor(
    private globals :Globals,
    private http: HttpClient
  ) { 
    this.map = this.globals.map
  }
  map:any;
  layers:select[] = [ ]
  fields:select[] = [ ]

  ngOnInit() {
  }
  ngAfterViewInit() {
    let layers = this.map.getLayers().getArray();
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      let id = layer.get('id');
      if(id!= undefined && id!= 0 ){
        this.layers.push( {label:layer.get('title'),value:id} );
      }
    }
  }
  onLayerChange(e):void{
    this.fields = [];
    let fields = this.fields;
    let layers = this.map.getLayers().getArray().filter(function(layer){
      return layer.get('id') == e.value;
    });
   
     let featureUrl = "http://192.168.0.104:6600/geoserver/wfs?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName="+ layers[0].getSource().getParams().LAYERS ;
     this.http.get(featureUrl).subscribe(
      (res:any)=>{
        let response = res;
        if(response.featureTypes[0].properties.length >0 )
        {
          response.featureTypes[0].properties.forEach(function(attributes){
           if(attributes.name != 'geom'){
            fields.push({
              label : attributes.name.toUpperCase(),
              value : attributes.name
            });
          }
           
          });
          
        }
       },
      (error)=>{ console.log(error)  }
    )
  }

}
