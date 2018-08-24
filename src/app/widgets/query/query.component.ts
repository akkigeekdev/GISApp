import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient } from "@angular/common/http";
import { ResultService } from "../result-window/result-window.component";
import { HttpHeaders } from '@angular/common/http'
import swal from 'sweetalert';
import { LoaderService } from "../../UI/loader/loader.component";

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  
  map: any;
  constructor(
    private globals: Globals,
    private http: HttpClient,
    private resservice: ResultService,
    private loader: LoaderService
  ) {
    this.map = this.globals.map
  }
  
  // fills cmb box
  layers = []
  fields = []
  
  selectedLayer;
  selectedLayerName;
  selectedFieldName;
  
  operatorType;
  selectedOprator;
  
  enteredValue;

  ngOnInit() { }

  ngAfterViewInit() {
    let layers = this.map.getLayers().getArray();
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      let id = layer.get('id');
      if (id != undefined && id != 0) {
        this.layers.push({ label: layer.get('title'), value: id });
      }
    }
  }

  onLayerChange(e){
    
    // clear field
    this.fields = []
    this.selectedOprator = ""
    this.enteredValue = ""


    // get all fields related to the selected layer 
    this.selectedLayer = this.map.getLayers().getArray().filter(l => l.get('id') == e.value)[0];  
    this.selectedLayerName = this.selectedLayer.getSource().getParams().LAYERS

    // set the query url
    let queryURL = "http://192.168.1.14:6600/geoserver/wfs?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName=" + this.selectedLayerName;

    // get fields
    let fields = this.fields;
    this.http
      .get(queryURL)
      .subscribe( (res: any) => {
        if (res.featureTypes[0].properties.length > 0) {
          res.featureTypes[0].properties.forEach(function (attributes) {
            if (attributes.name != 'GEOM') fields.push({ label: attributes.name.toUpperCase(), value: attributes.name, type: attributes.localType  });
          });
          console.log(fields);
          
        }
      },
      (error) => { console.log(error) }
    )

  }

  onFieldChange(e){
    let selField = <any>this.fields.filter(f => f.value == this.selectedFieldName, this) || [{}]
    this.operatorType = selField[0].type;
  }
 
  SearchFeatures() {

    if(!this.selectedLayerName)  swal({ text: "Please Select Layer"}); 
    else if(!this.selectedFieldName) swal({ text: "Please Select Attributes"}); 
    else if(!this.selectedOprator) swal({ text: "Please Select Operator"});
    else if (!this.enteredValue) swal({ text: "Please Select Value"});
    else {
      let result = this.resservice, loader = this.loader;
      let typename = this.selectedLayerName;
      let title = this.selectedLayer.get("title");
      let queryURL = "http://192.168.1.14:6600/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&&outputFormat=application/json&typeName=" + typename;

      loader.show()
      
      this.http
        .get(queryURL,{ headers: new HttpHeaders({ 'Accept': 'application/xml' }), responseType: 'text' })
        .subscribe( (res: any) => {
          let fc = JSON.parse(res); // fc = featureCollection
          fc = this.getQueriredFC(fc);

          if(fc.features.length > 0){
            fc["layerName"] = title;
            result.showFeatureCollections([fc]);
          }
          else{
            swal({ text: "No feature found"})
          }

          this.loader.hide()
        }, (error) => { 
          loader.hide()
          console.log(error)
        }
      )
    }
  }

  getQueriredFC(fc){
    let features = fc.features;
    let operator = this.selectedOprator;
    let uservalue = this.enteredValue.toUpperCase();

    console.log(features, operator, uservalue);

    features = features.filter(f => {
      let prop_value = f.properties[this.selectedFieldName]
      
      if(prop_value){
        if(operator == "<" && !isNaN(prop_value) && !isNaN(uservalue)){
          return Number(prop_value) < Number(uservalue) 
        }
        else if(operator == ">" && !isNaN(prop_value) && !isNaN(uservalue)){
          return Number(prop_value) > Number(uservalue) 
        }
        else if(operator == "="){
          return uservalue == prop_value
        }
        else if(operator == "<="  && !isNaN(prop_value) && !isNaN(uservalue)){
          return prop_value <= uservalue 
        }
        else if(operator == ">="  && !isNaN(prop_value) && !isNaN(uservalue)){
          return prop_value >= uservalue 
        }
        else if(operator == "like"){
          let ans = new RegExp(uservalue,"g").exec(prop_value)
          if(ans) return f
        }
      }

    })

    fc.features = features;
    return fc;   
  }

  Clear() {
    this.enteredValue = "";
    this.selectedOprator = "";
    this.selectedFieldName = "";
    this.selectedLayerName ="";    
  }

}