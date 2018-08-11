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
  MatDividerModule,
  MatChipsModule,
  MatDialogModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { WidgetDirective } from './widget.directive';
import { BookmarkComponent } from './widgets/bookmark/bookmark.component'


@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    MeasureComponent,
    WidgetDirective,
    BookmarkComponent
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
    MatDividerModule,
    MatChipsModule,
    MatDialogModule
  ],
  entryComponents: [  
    LayersComponent,
    MeasureComponent,
    BookmarkComponent
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
