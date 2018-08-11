import { Injectable } from '@angular/core';
import { LayersComponent } from './widgets/layers/layers.component'
import { MeasureComponent } from './widgets/measure/measure.component'
import { WidgetItem } from './widget-item'

@Injectable()
export class WidgetService {
  getWidgets(){
    return [
      new WidgetItem(LayersComponent),
      new WidgetItem(MeasureComponent)
    ]
  }
}
