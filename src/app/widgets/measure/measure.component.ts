import { Component, OnInit } from '@angular/core';
import {unByKey} from 'ol/Observable';
import Overlay from 'ol/Overlay';
import {getArea, getLength} from 'ol/sphere';
import View from 'ol/View';
import {LineString, Polygon} from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { Globals } from '../../globals'
import swal from 'sweetalert';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {
  map: any;
  source = new VectorSource();
   vector = new VectorLayer({
    source: this.source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  });
  selectType;
  sketch;
  draw;
  helpTooltipElement;
  helpTooltip;
  measureTooltipElement;
  measureTooltip;
  continuePolygonMsg = 'Click to continue drawing the polygon';
  continueLineMsg = 'Click to continue drawing the line';

  constructor(private globals: Globals) {
    this.map = this.globals.map
   }

  ngOnInit() {
  }
  ngAfterViewInit() {
 
  }
  StartDrawing(){
    this.map.on('pointermove', this.pointerMoveHandler);

    this.map.getViewport().addEventListener('mouseout', function() {
      this.helpTooltipElement.classList.add('hidden');
      });
  }
   addInteraction() {
    var type = (this.selectType.value == 'area' ? 'Polygon' : 'LineString');
    this.draw = new Draw({
      source: this.source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });

    this.map.addInteraction(this.draw);
    this.createMeasureTooltip();
    this.createHelpTooltip();

    var listener;
    this.draw.on('drawstart',
      (evt) => {
        // set sketch
        this.sketch = evt.feature;

        /** @type {module:ol/coordinate~Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = this.sketch.getGeometry().on('change', (evt)=> {
          var geom = evt.target;
          var output;
          console.log(this);
          if (geom instanceof Polygon) {
            
            output = this.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            console.log(this.formatLength(geom));
            output = this.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          this.measureTooltipElement.innerHTML = output;
          this.measureTooltip.setPosition(tooltipCoord);
        });
      });

      this.draw.on('drawend',
      function() {
        this.measureTooltipElement.className = 'tooltip tooltip-static';
        this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
        unByKey(listener);
      });
  }

  onTypeChange()
  {
    this.map.removeInteraction(this.draw);
    this.addInteraction();
  }

  createHelpTooltip() {
    debugger;
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'tooltip hidden';
    let helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(helpTooltip);
  }

  createMeasureTooltip() {
    debugger;
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'tooltip tooltip-measure';
    let measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(measureTooltip);
  }

  formatLength(line) {
    var length = getLength(line);
    var output;
    if (length > 100) {
      output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km';
    } else {
      output = (Math.round(length * 100) / 100) +
          ' ' + 'm';
    }
    return output;
  };
   formatArea(polygon) {
    var area = getArea(polygon);
    var output;
    if (area > 10000) {
      output = (Math.round(area / 1000000 * 100) / 100) +
          ' ' + 'km<sup>2</sup>';
    } else {
      output = (Math.round(area * 100) / 100) +
          ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  pointerMoveHandler(evt) {
    debugger;
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    var helpMsg = 'Click to start drawing';

    if (this.sketch) {
      var geom = (this.sketch.getGeometry());
      if (geom instanceof Polygon) {
        helpMsg = this.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = this.continueLineMsg;
      }
    }

    this.helpTooltipElement.innerHTML = helpMsg;
    this.helpTooltip.setPosition(evt.coordinate);

    this.helpTooltipElement.classList.remove('hidden');
  };

  
}