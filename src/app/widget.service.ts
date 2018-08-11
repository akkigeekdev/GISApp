import { Injectable } from '@angular/core';
import { LayersComponent } from './widgets/layers/layers.component'
import { MeasureComponent } from './widgets/measure/measure.component'
import { WidgetItem } from './widget-item';
import { BookmarkComponent } from "./widgets/bookmark/bookmark.component";

@Injectable()
export class WidgetService {
  getWidgets(){
    return [
      new WidgetItem(LayersComponent),
      new WidgetItem(BookmarkComponent),
      new WidgetItem(MeasureComponent)
    ]
  }
}
