import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  drawerOpenStatus:boolean = true;

  toggleDrawer():void{
    this.drawerOpenStatus = !this.drawerOpenStatus;
  }

}
