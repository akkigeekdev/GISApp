import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {

  constructor() { }

  layers = [
    "Farm land",
    "Home land",
    "Work land"
  ]

  ngOnInit() {
  }

}
