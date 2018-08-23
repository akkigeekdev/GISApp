import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient } from "@angular/common/http";
import { ResultService } from "../result-window/result-window.component";
import { HttpHeaders } from '@angular/common/http'
import swal from 'sweetalert';

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
    private resservice: ResultService
  ) {
    this.map = this.globals.map
  }
  
  // fills cmb box
  layers = []
  fields = []
  
  selectedLayerName = ""
  selectedFieldName = ""
  selectedOprator = ""
  enteredValue = ""

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

  onLayerChange(e): void {
    
    // clear field
    this.fields = []
    this.selectedOprator = ""
    this.enteredValue = ""


    // get all fields related to the selected layer 
    let selectedLayer = this.map.getLayers().getArray().filter(l => l.get('id') == e.value)[0];  
    this.selectedLayerName = selectedLayer.getSource().getParams().LAYERS

    // set the query url
    let queryURL = "http://192.168.1.14:6600/geoserver/wfs?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName=" + this.selectedLayerName;

    // get fields
    let fields = this.fields;
    this.http
      .get(queryURL)
      .subscribe( (res: any) => {
        if (res.featureTypes[0].properties.length > 0) {
          res.featureTypes[0].properties.forEach(function (attributes) {
            if (attributes.name != 'GEOM') fields.push({ label: attributes.name.toUpperCase(), value: attributes.name });
          });
        }
      },
      (error) => { console.log(error) }
    )

  }
 
  SearchFeatures() {

    if(!this.selectedLayerName)  swal({ text: "Please Select Layer"}); 
    else if(!this.selectedFieldName) swal({ text: "Please Select Attributes"}); 
    else if(!this.selectedOprator) swal({ text: "Please Select Operator"});
    else if (!this.enteredValue) swal({ text: "Please Select Value"});
    else {
      let result = this.resservice;
      let typename = this.selectedLayerName;
      let queryURL = "http://192.168.1.14:6600/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&&outputFormat=application/json&typeName=" + typename;

      this.http
        .get(queryURL,{ headers: new HttpHeaders({ 'Accept': 'application/xml' }), responseType: 'text' })
        .subscribe( (res: any) => {
          let fc = JSON.parse(res); // fc = featureCollection
          fc["layerName"] = typename.split(":")[1];
          result.showFeatureCollections([fc]);
        }, (error) => { 
          console.log(error)
        }
      )
    }
  }

  Clear() {
    this.enteredValue = "";
    this.selectedOprator = "";
    this.selectedFieldName = "";
    this.selectedLayerName ="";    
  }

}