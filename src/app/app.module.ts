import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { LayersComponent } from './widgets/layers/layers.component';
import { BookmarkComponent } from './widgets/bookmark/bookmark.component';
import { BasemapsComponent } from './widgets/basemaps/basemaps.component';

// services
import { Globals } from './globals';
import { WidgetService } from './widget.service';
import { WidgetDirective } from './widget.directive';

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
  MatDialogModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    WidgetDirective,
    BookmarkComponent,
    BasemapsComponent
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
    BookmarkComponent,
    BasemapsComponent
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
