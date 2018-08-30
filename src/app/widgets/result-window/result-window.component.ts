import { Component, OnInit, Injectable, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { EditFeature } from "../../globals";

export interface resultTemp{
  layerName: string,
  attributes: Array<object>,
  isSwitch?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  @Output() change: EventEmitter<any> = new EventEmitter();

  showFeatureCollections(featureCollections){

    if(Array.isArray(featureCollections)){
      this.change.emit(featureCollections);
    }
    
  }
}



@Component({
  selector: 'app-result-window',
  templateUrl: './result-window.component.html',
  styleUrls: ['./result-window.component.scss']
})
export class ResultWindowComponent implements OnInit {

  constructor(private resservice: ResultService) { }
  
  show = false;
  
  showingIndex = 0;
  showingAttributes = [];

  results:resultTemp[] = [];

  @ViewChild('resultNode') resultNode:ElementRef
  @ViewChild('resultTitleNode') resultTitleNode:ElementRef

  ngOnInit() {
    this.resservice.change.subscribe(fcs=> {
      this.results = [];
      this.execute(fcs)
    })
  }

  ngAfterContentInit() { 
    dragElement(this.resultNode.nativeElement, this.resultTitleNode.nativeElement)
  }

  execute(fcs){

    for (let i = 0; i < fcs.length; i++) {

      const layername = fcs[i].getId().split(".")[0].replace(/\_/g," ").replace(" DATA","");
      const feature = fcs[i]
      const prop = feature.getProperties()

      let attributes = []
      feature.getKeys().forEach(k => {

        if(layername == "VALVE" && k == "DEVICE_STATUS"){
          attributes.push( {column: k, value: prop[k], isSwitch:true, feature} )
        }
        else if(layername == "SOIL SENSOR" && k == "DEVICE_STATUS"){
          attributes.push( {column: k, value: prop[k], isSwitch:true,feature} )
        }
        else{
          if(k!="geometry"){attributes.push( {column: k, value: prop[k]} )}
        }
        
      });

      this.results.push({
        layerName: layername,
        attributes: attributes
      })

    }

    this.showresults()

  }

  showresults(){
    if(this.results.length == 0 ) { this.show = false; return}
    this.show = true;
  }

  switchStatusChanged(feature, prop, value){
    // call loader and update feature
    console.log(feature, prop, value)
    feature.set(prop, value)

    let edit = new EditFeature("PFDB",feature.getId().split(".")[0])
    edit.updates([feature], (res)=>{console.log(res)}, (err)=>{console.log(err)})

  }

  showPrevious(){
    this.showingIndex -= 1
  }
  
  showNext(){
    this.showingIndex += 1
  }
 
  closeWindow(e){
    e.preventDefault();
    this.show = false;
    this.showingIndex = 0;
    this.results = []
  }
  
}




function dragElement(boxelelmnt, elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    elmnt.style.cursor = "move"

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    boxelelmnt.style.top = (boxelelmnt.offsetTop - pos2) + "px";
    boxelelmnt.style.left = (boxelelmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = "default"
  }
}



/*
var formatWFS = new ol.format.WFS();
var formatGML = new ol.format.GML({
featureNS: 'http://geoserver.org/bftchamber',
featureType: 'bft',
srsName: 'EPSG:27700'
});
var transactWFS = function(p,f) {
switch(p) {
case 'insert':
    node = formatWFS.writeTransaction([f],null,null,formatGML);
    break;
case 'update':
    node = formatWFS.writeTransaction(null,[f],null,formatGML);
    break;
case 'delete':
    node = formatWFS.writeTransaction(null,null,[f],formatGML);
    break;
}
s = new XMLSerializer();
str = s.serializeToString(node);
$.ajax('http://localhost:8080/geoserver/wfs',{
    type: 'POST',
    dataType: 'xml',
    processData: false,
    contentType: 'text/xml',
    data: str
    }).done();
}
*/