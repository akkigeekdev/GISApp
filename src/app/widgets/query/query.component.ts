import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient } from "@angular/common/http";
import { ResultService } from "../result-window/result-window.component";
import { HttpHeaders } from '@angular/common/http'
import swal from 'sweetalert';
import { LoaderService } from "../../UI/loader/loader.component";
import { FeatureQuery } from "../../globals";
import { equalTo, between, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo, like  } from "ol/format/filter";

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
debugger;
    if(!this.selectedLayerName)  swal({ text: "Please Select Layer"}); 
    else if(!this.selectedFieldName) swal({ text: "Please Select Attributes"}); 
    else if(!this.selectedOprator) swal({ text: "Please Select Operator"});
    else if (!this.enteredValue) swal({ text: "Please Select Value"});
    else {
      let query = new FeatureQuery()
      query.featurePrefix = 'PFDB';
      query.featureTypes = [this.selectedLayerName.split(":")[1]];
     
      try {
        if(this.selectedOprator == "<") query.filter = lessThan(this.selectedFieldName, Number(this.enteredValue))
        else if(this.selectedOprator == ">") query.filter = greaterThan(this.selectedFieldName, Number(this.enteredValue))
        else if(this.selectedOprator == "=") query.filter = equalTo(this.selectedFieldName, this.enteredValue, false)
        else if(this.selectedOprator == "<=" ) query.filter = lessThanOrEqualTo(this.selectedFieldName, Number(this.enteredValue))
        else if(this.selectedOprator == ">=" ) query.filter = greaterThanOrEqualTo(this.selectedFieldName, Number(this.enteredValue))
        else if(this.selectedOprator == "like") query.filter = like(this.selectedFieldName, this.enteredValue, undefined, undefined,undefined,false)

        this.loader.show()

        query.send((features)=>{
          
          if(features.length > 0){
            this.resservice.showFeatureCollections(features);
          }
          else{
            swal({ text: "No feature found"})
          }
          this.loader.hide()

        }, (err) => {
          console.log(err);
          swal({ text: "Something went wrong."})
          this.loader.hide()
        })
      } catch (error) {
        swal({ text: "Something went wrong."})
        console.log(error);
        this.loader.hide()
      }


    }
  }

  Clear() {
    this.enteredValue = "";
    this.selectedOprator = "";
    this.selectedFieldName = "";
    this.selectedLayerName ="";    
  }

}