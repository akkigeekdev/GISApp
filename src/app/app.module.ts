import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MapComponent } from './map/map.component';
import { LayersComponent } from './widgets/layers/layers.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MeasureComponent } from './widgets/measure/measure.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayersComponent,
    MeasureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
