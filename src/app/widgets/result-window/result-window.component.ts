import { Component, OnInit, Injectable, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { EditFeature } from "../../globals";
import Chart from 'chart.js';
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
  @Output() showReport: EventEmitter<any> = new EventEmitter();

  showFeatureCollections(featureCollections){

    if(Array.isArray(featureCollections)){
      this.change.emit(featureCollections);
    }
  }

  showReportData(reportData){
    this.showReport.emit(reportData);
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
  showTable = false;
  showGraph =false;
  showingIndex = 0;
  showingAttributes = [];
  reportType;
  results:resultTemp[] = [];
  reportResult = ["dgasf","asghas"]; 
  reporthead = ["adgasg","asdgsdfg"];
  x_axis; y_axis;
  myChart;
  tableData;

  @ViewChild('resultNode') resultNode:ElementRef
  @ViewChild('resultTitleNode') resultTitleNode:ElementRef

  ngOnInit() {
    this.resservice.change.subscribe(fcs=> {
      this.results = [];
      this.execute(fcs)
    });

    this.resservice.showReport.subscribe(data=>{
      this.reportResult = [];
      this.reportType ="";
      this.showReportData(data);
    })
  }

  ngAfterContentInit() { 
    dragElement(this.resultNode.nativeElement, this.resultTitleNode.nativeElement)
  }

  showReportData(data){
    this.reportResult = data.response;
    this.reportType = data.reportType;
    this.reporthead = Object.keys(this.reportResult[0]);
    this.showTable = true;
    this.showGraph =false;
    this.show = false;
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
    this.showTable = false;
    this.showGraph =false;
  }

  switchStatusChanged(feature, prop, value){
  
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
    this.showTable = false;
    this.showGraph =false;
    this.reportResult =[];
    try{
      this.myChart.destroy();
      }catch{
  
      }
  }

  GenerateGraph(){
    try{
    this.myChart.destroy();
    }catch{

    }
    this.showTable = false;
    this.showGraph =true;
    this.show =false;
    let label_data = this.reportResult.map(res=> res[this.x_axis]);
    let value_data = this.reportResult.map(res=> res[this.y_axis])
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: label_data.sort(),
          datasets: [{
              label: this.y_axis,
              data: value_data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  }

  Back(){
    try{
      this.myChart.destroy();
      }catch{
  
      }
      this.show = false;
      this.showTable = true;
      this.showGraph =false;
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

