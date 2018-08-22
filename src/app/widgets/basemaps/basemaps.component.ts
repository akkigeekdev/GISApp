import { Component, OnInit } from '@angular/core';
import { Globals } from "../../globals";
import BingMaps from 'ol/source/BingMaps.js';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-basemaps',
  templateUrl: './basemaps.component.html',
  styleUrls: ['./basemaps.component.scss']
})
export class BasemapsComponent implements OnInit {

  map:any;
  constructor(private global:Globals) { this.map = this.global.map;}

<<<<<<< HEAD
=======

>>>>>>> d019fe8f48295ec14eb30258609359cb000d4a1a
  osm = {
    img: "osm.png",
    source: new OSM(),
    name:"OSM",
    selected: true
  };
  bingAerial = {
    img: "aerial.jpg",
    source: new BingMaps({
      key: 'AjN0UtayJCMrJz9YEVutFuV1AFiDkNt9kHFTtw7gC4expbJGflke5DkefuXns7Hd',
      imagerySet: 'Aerial'
    }),
    name:"Aerial",
    selected: false
  };
  bingRoad = {
    img: "road.jpg",
    source: new BingMaps({
      key: 'AjN0UtayJCMrJz9YEVutFuV1AFiDkNt9kHFTtw7gC4expbJGflke5DkefuXns7Hd',
      imagerySet: 'Road'
    }),
    name:"Road",
    selected: false
  };

  baselayers = [this.osm, this.bingAerial, this.bingRoad]


  ngOnInit() {
  }


  setBaseMap(index){
    // unselect all
    for (let i = 0; i < this.baselayers.length; i++) {
      this.baselayers[i].selected = false;
    }

    // add class to selected
    this.baselayers[index].selected = true;

    //set layer
    this.map.getLayers().getArray()[0].setSource(this.baselayers[index].source);
    this.map.render();
  }

}
