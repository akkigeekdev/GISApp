import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  id = Math.random().toString()
  ischecked = false

  @Input() mode:string;
  @Output() toggled: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.ischecked = (this.mode === "ON")
  }

  changed(e){
    this.toggled.emit( this.ischecked?"ON":"OFF" )
  }


}
