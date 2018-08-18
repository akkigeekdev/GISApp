import { Component, OnInit } from '@angular/core';
import { Globals } from "../../globals";
import * as jsPDF from 'jspdf'
import {unByKey} from 'ol/Observable.js';
import { resetApplicationState } from '../../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  map:any;
  _this = this;

  constructor(
    private globals: Globals
  ) {
    this.map = globals.map;
  }

  pageSize= [
    {value:"a0", label: "A0 (slow)"},
    {value:"a1", label: "A1"},
    {value:"a2", label: "A2"},
    {value:"a3", label: "A3"},
    {value:"a4", label: "A4"},
    {value:"a5", label: "A5 (fast)"}
  ]

  resolution = [
    {value:72, label: "72 dpi (fast)"},
    {value:150, label: "150 dpi"},
    {value:300, label: "300 dpi (slow)"}
  ]

  dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
  };

  
  selectedFormat:any = "a4";
  selectedRes:number = 72;

  ngOnInit() {
  }

  exportPDF(evt){

    let dim = this.dims[this.selectedFormat];
    let width = Math.round(dim[0] * this.selectedRes / 25.4);
    let height = Math.round(dim[1] * this.selectedRes / 25.4);
    let size = (this.map.getSize());
    let extent = this.map.getView().calculateExtent(size);

    let source = this.map.getLayers().getArray()[0].getSource();
    let format = this.selectedFormat, map = this.map;

    let watch = {
      canvas: null,
      timer: null,
      setTimeForExport: function(){
        if(this.timer) clearTimeout(this.timer);
        this.timer = null;
        let canvas = this.canvas;

        this.timer = setTimeout(() => {
          let data = canvas.toDataURL('image/jpeg');
          let pdf = new jsPDF('landscape', undefined, format);
          pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
          pdf.save('map.pdf');
          map.setSize(size);
          map.getView().fit(extent, {size: size});
          map.renderSync();
        }, 3000);
      }
    }

    let keys;
    this.map.once('postcompose', function(event) {
      watch.canvas = event.context.canvas;
      keys = [
        source.on('tileloadend', watch.setTimeForExport),
        source.on('tileloaderror', watch.setTimeForExport)
      ];      
    });



    let printSize = [width, height];
    this.map.setSize(printSize);
    this.map.getView().fit(extent, {size: printSize});
    this.map.renderSync();
  
    // let loading = 0;
    // let loaded = 0;

    // let tileLoadStart = function() {
    //   loading += 1;
    // }

    // let timer;
    // let keys = [];

    // let map = this.map;
    // let format = this.selectedFormat;

    
    // function tileLoadEndFactory(canvas) {
    //   return function () {
    //     loaded+= 1;
    //   if (timer) {
    //     clearTimeout(timer);
    //     timer = null;
    //   }
    //   if (loading === loaded) { debugger;
    //     timer = window.setTimeout(function () {
    //       loading = 0;
    //       loaded = 0;
    //       let data = canvas.toDataURL('image/jpeg');
    //       let pdf = new jsPDF('landscape', undefined, format);
    //       pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
    //       pdf.save('map.pdf');
    //       keys.forEach(unByKey);
    //       keys = [];
    //       map.setSize(size);
    //       map.getView().fit(extent, {size: size});
    //       map.renderSync();
    //     }, 500);
    //   }
    //   };
    // }
    
    // this.map.once('postcompose', function(event) {

    //   let canvas = event.context.canvas;
    //   let tileLoadEnd = tileLoadEndFactory(canvas);
    //   keys = [
    //     source.on('tileloadstart', tileLoadStart),
    //     source.on('tileloadend', tileLoadEnd),
    //     source.on('tileloaderror', tileLoadEnd)
    //   ];
    //   // tileLoadEnd();
    //   tileLoadEnd()
    // });

    // let printSize = [width, height];
    // this.map.setSize(printSize);
    // this.map.getView().fit(extent, {size: printSize});
    // // loaded = -1;
    // this.map.renderSync();

  }

 
  exportPDFasfgasdf(){
    this.globals.getVisibleLayers()
  }
  
}

