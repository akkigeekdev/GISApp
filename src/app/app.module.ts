import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { BookmarkComponent } from './widgets/bookmark/bookmark.component';
import { BasemapsComponent } from './widgets/basemaps/basemaps.component';
import { LayersComponent } from './widgets/layers/layers.component';
import { PrintComponent } from './widgets/print/print.component';
import { QueryComponent } from './widgets/query/query.component';
import { ResultWindowComponent } from './widgets/result-window/result-window.component';

// services
import { Globals } from './globals';
import { WidgetService } from './widget.service';
import { WidgetDirective } from './widget.directive';
import { HttpClientModule } from "@angular/common/http";

// Material components
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
  MatDialogModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ResultWindowComponent } from './widgets/result-window/result-window.component';





@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    WidgetDirective,
    BookmarkComponent,
    BasemapsComponent,
    QueryComponent,
    PrintComponent,
    ResultWindowComponent
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
    MatDialogModule,
    MatSelectModule,
    MatInputModule,

    HttpClientModule
  ],
  entryComponents: [  
    BookmarkComponent,
    BasemapsComponent,
    LayersComponent,
    PrintComponent,
    QueryComponent
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
