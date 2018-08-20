import { Injectable,EventEmitter,Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {

  constructor() { }
  @Output() showError: EventEmitter<boolean> = new EventEmitter();

  showErrorDialog(error){
   this.showError.emit(error);
  }
  
}
