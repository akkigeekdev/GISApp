import { Component, OnInit } from '@angular/core'
import {Globals} from '../../globals'

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  constructor(private globals :Globals) { this.map = this.globals.map}

  map:any;
  layers = [ ];
  checkboxall = true;

  ngOnInit(){ }
  
  ngAfterViewInit() {
    let layers = this.map.getLayers().getArray();
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      let id = layer.get('id');
      if(id){
        this.layers.push( {name:layer.get('title'), id: id, selected:true} )
      }
    }
  }

  chkselectAll_changed():void{
    this.layers.forEach(a=> {a.selected = this.checkboxall});
    this.map.getLayers().getArray().forEach(l=> { 
      if(l.get('id')){
        l.setVisible(this.checkboxall) 
      }
    })
  }

  chkLayer_changed(e):void{
    this.checkboxall = this.layers.every(a=> a.selected == true);
    this.map.getLayers().getArray().forEach(l=> { 
      if(l.get('title')== e.source.name){
        l.setVisible( this.layers.find(a=> a.name == e.source.name).selected ) 
      }
    })
  }
}
