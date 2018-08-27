import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient } from "@angular/common/http";
import { ResultService } from "../result-window/result-window.component";
import { HttpHeaders } from '@angular/common/http'
import swal from 'sweetalert';
import { LoaderService } from "../../UI/loader/loader.component";
import { Heatmap as HeatmapLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

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
  onLayerChange(e) {
    this.fields = []


    // get all fields related to the selected layer 
    this.selectedLayer = this.map.getLayers().getArray().filter(l => l.get('id') == e.value)[0];
    this.selectedLayerName = this.selectedLayer.getSource().getParams().LAYERS

    // set the query url
    let queryURL = "http://192.168.1.14:6600/geoserver/wfs?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName=" + this.selectedLayerName;

    // get fields
    let fields = this.fields;
    this.http
      .get(queryURL)
      .subscribe((res: any) => {
        if (res.featureTypes[0].properties.length > 0) {
          res.featureTypes[0].properties.forEach(function (attributes) {

            if (attributes.name != 'GEOM') {
              if (attributes.localType === 'number' || attributes.localType === 'int') {
                fields.push({ label: attributes.name.toUpperCase(), value: attributes.name, type: attributes.localType });
              }
            }
          });
          //  console.log(fields);

        }

      },
        (error) => { console.log(error) }
      )

  }
  onFieldChange(e) {
    let selField = <any>this.fields.filter(f => f.value == this.selectedFieldName, this) || [{}]
    //console.log(selField);
  }

  GenerateHeatMap() {
    this.map.getLayers().forEach(layer => {
      if (layer instanceof HeatmapLayer) {
        this.map.removeLayer(layer);
      }
    });
    let selectedField = this.selectedFieldName

    let GeoJSONURL = "http://192.168.1.14:6600/geoserver/PFDB/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+this.selectedLayerName+"&outputFormat=application/json";

    var vector = new HeatmapLayer({
      source: new VectorSource({
        url: GeoJSONURL,
        format: new GeoJSON({
          extractStyles: false
          })
      }),
      gradient: [ '#99ff33','#ff99cc','#cc0066','#3366ff','#cc0000'],
      blur : 60,
      radius : 30
    });

    //console.log(vector);
  
    vector.getSource().on('addfeature', function (event) {
      let feature_val = event.feature.get(selectedField);
     console.log(feature_val);
    });
    console.log(vector.getSource().getUrl());

    this.map.addLayer(vector);
  }

  Clear() {
    this.map.getLayers().forEach(layer => {
      if (layer instanceof HeatmapLayer) {
        this.map.removeLayer(layer);
      }
    });
  }

}
