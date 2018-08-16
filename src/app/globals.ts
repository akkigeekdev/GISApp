import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  map: any;
  getVisibleLayers():any{
    return this.map.getLayers().getArray().filter(l=> l.getVisible())
  }
}