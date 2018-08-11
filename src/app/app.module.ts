import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { LayersComponent } from './widgets/layers/layers.component';
import { MeasureComponent } from './widgets/measure/measure.component';

// services
import { Globals } from './globals';
import { WidgetService } from './widget.service'


import { 
  MatSidenavModule, 
  MatExpansionModule, 
  MatCheckboxModule,
  MatFormFieldModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { WidgetDirective } from './widget.directive'


@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    MeasureComponent,
    WidgetDirective
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
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  entryComponents: [  
    LayersComponent,
    MeasureComponent 
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
