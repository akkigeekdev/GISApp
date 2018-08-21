import { Component, OnInit } from '@angular/core';
import { Injectable,EventEmitter,Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {

  constructor() { }
  @Output() showError: EventEmitter<boolean> = new EventEmitter();

  showErrorDialog(error){
    debugger;
   this.showError.emit(error);
  }
  
}



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogWindowService: DialogWindowService) { }
  show = false;
  errorMessage = '';
  ngOnInit() {
    this.dialogWindowService.showError.subscribe(message=> {
      this.show = true; 
      this.execute(message);
    })

  }

  execute(message)
  {
    this.errorMessage = message;
  }

  closeWindow(e){
    e.preventDefault();
    this.show = false;
  }

}