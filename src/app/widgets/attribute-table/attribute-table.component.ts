import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.scss']
})
export class AttributeTableComponent implements OnInit {

  @ViewChild('handle') handle:ElementRef
  @ViewChild('awindow') awindow:ElementRef
  @ViewChild('control') control:ElementRef
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  isOpen = false
  attrwindowHeight = 350;

  constructor() { }

  ngOnInit(){
    this.dataSource.sort = this.sort;
  }
  
  ngAfterContentInit() {
    // this.toggleOpen()
    this.resizeHandle()
  }

  toggleOpen(){
    
    if(this.isOpen){
      this.awindow.nativeElement.style.height = "0px";
      this.control.nativeElement.style.bottom = "10px";
    }
    else{
      this.awindow.nativeElement.style.height = this.attrwindowHeight + "px";
      this.control.nativeElement.style.bottom = (this.attrwindowHeight+10) + "px";
    }

    this.resizeContents(undefined)
    this.isOpen = !this.isOpen;
  }

  resizeContents(finalheight){ //patch
    setTimeout(() => {
      let contents = Array.from(document.querySelectorAll(".attr-content"));
      contents.forEach((element:any) => {
        element.style.height = ((finalheight || this.attrwindowHeight )- 61) + "px"
      });
    }, 1000);
  }

  resizeHandle(){

    let handle = this.handle.nativeElement, 
        awindow = this.awindow.nativeElement,
        control = this.control.nativeElement,
        finalheight = this.attrwindowHeight,
        resizeContents = this.resizeContents.bind(this);

    let presentheight,clickedposition;

    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
  
      presentheight = Number(awindow.style.height.replace("px",""))
      
      clickedposition = e.clientY

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      
      let movediff = clickedposition - e.clientY
      finalheight = presentheight+movediff
      
      if( finalheight >= 50 && finalheight <= 600 ){ 
        awindow.style.height = finalheight+"px" 
        control.style.bottom = (finalheight+10)+"px"
      }
      resizeContents(finalheight)

    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

  }

}


