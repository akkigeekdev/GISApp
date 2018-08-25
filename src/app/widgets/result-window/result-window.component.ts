import { Component, OnInit, Injectable, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

export interface resultTemp{
  layerName: string,
  attributes: object
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  showFeatureCollections(featureCollections){

    if(featureCollections[0] && featureCollections[0].type && featureCollections[0].type == "FeatureCollection"){
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
      const layername = fcs[i].layerName;

      for (let j = 0; j < fcs[i].features.length; j++) {
        const feature = fcs[i].features[j];
        const prop = feature.properties;

        let keys = Object.keys(prop);
        let attributes = []

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          attributes.push(
            {column: key, value: prop[key]}
          )
        }

        this.results.push({
          layerName: layername,
          attributes: attributes
        })

      } 
    }
    
    this.showresults()
  }

  showresults(){
    if(this.results.length == 0 ) {}
    this.show = true;
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



