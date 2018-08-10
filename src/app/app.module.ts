import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { LayersComponent } from './widgets/layers/layers.component';
import { MeasureComponent } from './widgets/measure/measure.component';

import { 
  MatSidenavModule, 
  MatExpansionModule, 
  MatCheckboxModule,
  MatFormFieldModule,
  MatMenuModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'


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
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
