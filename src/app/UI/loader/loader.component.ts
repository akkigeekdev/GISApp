import { Component, OnInit, Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  @Output() showLoader: EventEmitter<boolean> = new EventEmitter();
  @Output() hideLoader: EventEmitter<boolean> = new EventEmitter();

  show(){
    debugger;
    this.showLoader.emit()
  }
  hide(){
    this.hideLoader.emit()
  }

}


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderservice:LoaderService) { }

  loader;

  ngOnInit() {
    
    this.loaderservice.showLoader.subscribe(_ => {
      console.log(this.loader)
    })
    this.loaderservice.hideLoader.subscribe(_ => {
      console.log(this.loader)
    })
  }

  show(){
    console.log(this.loader)
  }
  
  hide(){
    console.log(this.loader)
  }
}
