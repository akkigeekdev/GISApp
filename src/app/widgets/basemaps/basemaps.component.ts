import { Component, OnInit } from '@angular/core';
import { Globals } from "../../globals";
import BingMaps from 'ol/source/BingMaps';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-basemaps',
  templateUrl: './basemaps.component.html',
  styleUrls: ['./basemaps.component.scss']
})
export class BasemapsComponent implements OnInit {

  map:any;
  constructor(private global:Globals) { this.map = this.global.map;}

  osm = {
    img: "osm.png",
    source: new OSM(),
    name:"OSM",
    selected: false
  };
  bingAerial = {
    img: "aerial.jpg",
    source: new BingMaps({
      key: 'AjN0UtayJCMrJz9YEVutFuV1AFiDkNt9kHFTtw7gC4expbJGflke5DkefuXns7Hd',
      imagerySet: 'Aerial'
    }),
    name:"Aerial",
    selected: true
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

  ngAfterContentInit() {
    // this.setBaseMap(1)
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
