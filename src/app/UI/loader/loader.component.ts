import { Component, OnInit, Injectable, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  @Output() showLoader: EventEmitter<boolean> = new EventEmitter();
  @Output() hideLoader: EventEmitter<boolean> = new EventEmitter();

  show(){
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

  @ViewChild('loader') loader:ElementRef;

  ngOnInit() {
    this.loaderservice.showLoader.subscribe(_ => {
      this.loader.nativeElement.style.display = "block"
    })
    this.loaderservice.hideLoader.subscribe(_ => {
      this.loader.nativeElement.style.display = "none"
    })
  }

  ngAfterContentInit() {

  }

}
