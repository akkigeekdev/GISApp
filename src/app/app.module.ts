import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { BookmarkComponent } from './widgets/bookmark/bookmark.component';
import { BasemapsComponent } from './widgets/basemaps/basemaps.component';
import { HeatmapComponent } from './widgets/heatmap/heatmap.component';
import { LayersComponent } from './widgets/layers/layers.component';
import { PrintComponent } from './widgets/print/print.component';
import { QueryComponent } from './widgets/query/query.component';
import { ResultWindowComponent } from './widgets/result-window/result-window.component';
import { ToggleComponent } from './UI/toggle/toggle.component';
import { LoaderComponent } from './UI/loader/loader.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { MeasureComponent } from './widgets/measure/measure.component';


// services
import { Globals } from './globals';
import { WidgetService } from './services/widget-loader/widget.service';
import { WidgetDirective } from './services/widget-loader/widget.directive';
import { HttpClientModule} from "@angular/common/http";

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
  MatInputModule,
  MatTooltipModule
} from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    WidgetDirective,
    BookmarkComponent,
    BasemapsComponent,
    QueryComponent,
    PrintComponent,
    ResultWindowComponent,
    LoaderComponent,
    HeatmapComponent,
    WeatherComponent,
    MeasureComponent,
    ToggleComponent
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
    MatTooltipModule,
    HttpClientModule
  ],
  entryComponents: [  
    BookmarkComponent,
    BasemapsComponent,
    HeatmapComponent,
    LayersComponent,
    MeasureComponent,
    PrintComponent,
    QueryComponent
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
