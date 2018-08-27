import { Injectable } from '@angular/core';
import { WidgetItem } from './widget-item';
import { BookmarkComponent } from "../../widgets/bookmark/bookmark.component";
import { BasemapsComponent } from "../../widgets/basemaps/basemaps.component";
import { HeatmapComponent } from "../../widgets/heatmap/heatmap.component";
import { LayersComponent } from '../../widgets/layers/layers.component'
import { MeasureComponent } from "../../widgets/measure/measure.component";
import { PrintComponent } from "../../widgets/print/print.component";
import { QueryComponent } from "../../widgets/query/query.component";

@Injectable()
export class WidgetService {
  getWidgets(){
    return [
      new WidgetItem(BasemapsComponent),
      new WidgetItem(BookmarkComponent),
      new WidgetItem(HeatmapComponent),
      new WidgetItem(LayersComponent),
      new WidgetItem(MeasureComponent),
      new WidgetItem(PrintComponent),
      new WidgetItem(QueryComponent),
    ]
  }
}
