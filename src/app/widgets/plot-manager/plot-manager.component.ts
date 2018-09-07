import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-plot-manager',
  templateUrl: './plot-manager.component.html',
  styleUrls: ['./plot-manager.component.scss']
})
export class PlotManagerComponent implements OnInit {
  show = false;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  closeWindow(){
    this.show  = !this.show;
  }

  openWindow(){
    if(!this.show) this.show = true;
  }

}
