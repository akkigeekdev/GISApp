import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FeatureQuery } from "../../globals";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-valve-manager',
  templateUrl: './valve-manager.component.html',
  styleUrls: ['./valve-manager.component.scss']
})
export class ValveManagerComponent implements OnInit {


  map: any;
  valves = [];

  constructor(
    private globals: Globals,
    private http: HttpClient,
  ) {
    this.map = this.globals.map
  }

  ngOnInit() {
    let query = new FeatureQuery()
    query.featurePrefix = 'PFDB';
    query.featureTypes = ["VALVE"];
    query.send((features) => {
      features.forEach(valvefeature => {
        this.valves.push({ name: valvefeature.get('VALVE_ID'), plot: valvefeature.get('PLOT_ID'), selected: valvefeature.get('DEVICE_STATUS') === "ON" ? true : false });
      });

      this.valves.sort(function (a, b) { return (a.plot > b.plot) ? 1 : ((b.plot > a.plot) ? -1 : 0); });

    }, (err) => {
      console.log(err);

    })
  }

  ngAfterViewInit() {

  }

  toggle_valve(e) {
    let valve_id = e.source.id;
    let status = e.checked ? "ON":"OFF";

    this.http.get("http://192.168.1.11:7700/Service.svc/ToggleValve?valveID="+valve_id+"&status="+status+"").subscribe(res=>{
    console.log(res);
    }, err=>{
     swal("Somthing Went Wrong");
    });

  }

}
