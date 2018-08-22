import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient } from "@angular/common/http";
<<<<<<< HEAD
import { DialogWindowService } from "../../dialog-window.service";
=======
import { DialogWindowService } from "../dialog/dialog.component";
>>>>>>> d019fe8f48295ec14eb30258609359cb000d4a1a

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
    private globals: Globals,
    private http: HttpClient,
    private dialogWindowService: DialogWindowService
  ) {
    this.map = this.globals.map
  }
  map: any;
  layers: select[] = []
  fields: select[] = []
  finalQuery = "";
  queryValue = "";
  selectedOprator = "";
  selectedField = "";
  selectedLayer;
  ngOnInit() {
  }
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
    this.fields = [];
    this.finalQuery = "";
    this.selectedOprator = "";

    let fields = this.fields;
    let layers = this.map.getLayers().getArray().filter(function (layer) {
      return layer.get('id') == e.value;
    });
    this.selectedLayer = layers[0];
    let featureUrl = "http://192.168.1.14:6600/geoserver/wfs?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName=" + layers[0].getSource().getParams().LAYERS;
    this.http.get(featureUrl).subscribe(
      (res: any) => {
        let response = res;
        if (response.featureTypes[0].properties.length > 0) {
          response.featureTypes[0].properties.forEach(function (attributes) {
            if (attributes.name != 'geom') {
              fields.push({
                label: attributes.name.toUpperCase(),
                value: attributes.name
              });
            }

          });

        }
      },
      (error) => { console.log(error) }
    )
  }
  onQueryChange() {
    if (this.queryValue.replace(/\s/g, '') != "") {
      if (this.selectedOprator === 'LIKE') {
        this.finalQuery = this.selectedField + " " + this.selectedOprator + " " + "'%" + this.queryValue + "%'"
      } else {
        this.finalQuery = this.selectedField + " " + this.selectedOprator + " '" + this.queryValue+"'";
      }
    } else {
      this.finalQuery = "";
    }
  }

  SearchFeatures() {
    if(!this.selectedLayer) {
      this.dialogWindowService.showErrorDialog("Please Select Layer"); return;
    }
    if (!this.selectedField)
    {
      this.dialogWindowService.showErrorDialog("Please Select Attributes"); return;
    }
    if (!this.selectedOprator) 
    {
      this.dialogWindowService.showErrorDialog("Please Select Operator"); return;
    }
    if (!this.queryValue) 
    {
      this.dialogWindowService.showErrorDialog("Please Enter Value"); return;
    }
    let bbox = this.selectedLayer.get('boundingBox');
    
    let featureUrl = `http://192.168.1.14:6600/geoserver/PFDB/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image:png&TRANSPARENT=true&QUERY_LAYERS=${this.selectedLayer.getSource().getParams().LAYERS}&LAYERS=${this.selectedLayer.getSource().getParams().LAYERS}&INFO_FORMAT=application/json&FEATURE_COUNT=50S&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX=${bbox}`;
      console.log(featureUrl);
    this.http.get(featureUrl).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => { console.log(error) }
    )
  }
  Clear()
    {
      this.finalQuery = "";
      this.queryValue = "";
      this.selectedOprator = "";
      this.selectedField= "";
      this.selectedLayer="";
    
    }

}
