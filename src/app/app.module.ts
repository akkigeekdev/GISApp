import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng4-charts/ng4-charts';
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
import { AttributeTableComponent } from './widgets/attribute-table/attribute-table.component';
import { ValveManagerComponent } from './widgets/valve-manager/valve-manager.component';
// services
import { Globals } from './globals';
import { WidgetService } from './services/widget-loader/widget.service';
import { WidgetDirective } from './services/widget-loader/widget.directive';
import { HttpClientModule} from "@angular/common/http";
import { ReportComponent } from './widgets/report/report.component';
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
  MatInputModule,
  MatTooltipModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,MatSelectModule
} from '@angular/material';
import { PlotManagerComponent } from './widgets/plot-manager/plot-manager.component';


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
    ToggleComponent,
    AttributeTableComponent,
    ReportComponent,
    ValveManagerComponent,
    PlotManagerComponent
    
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
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatSlideToggleModule,
    ChartsModule
  ],
  entryComponents: [  
    BookmarkComponent,
    BasemapsComponent,
    HeatmapComponent,
    LayersComponent,
    MeasureComponent,
    PrintComponent,
    QueryComponent,
    ReportComponent,
    ValveManagerComponent
  ],
  providers: [Globals, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
