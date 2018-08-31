import { Component, OnInit } from '@angular/core';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength } from 'ol/sphere';
// import View from 'ol/View';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { Globals } from '../../globals'
// import swal from 'sweetalert';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {

  type = "Polygon";

  draw
  // tooltips
  helpTooltip/* overlay */; helpTooltipElement;
  measureTooltip/* overlay */; measureTooltipElement;

  SelectedMesureType;
  drawComplete = false;
  totalDistance;
  sketch;
  listener;
  continuePolygonMsg = 'Click to continue drawing the polygon'
  continueLineMsg = 'Click to continue drawing the line'


  // VECTORLAYER FOR DRAWING
  drawingLayer;

  map: any;
  constructor(
    private global: Globals
  ) { this.map = this.global.map }


  //add every meaure here to remove at the end
  measures = [];

  ngOnInit() { }

  ngAfterContentInit() {
  }
  
  startDrawing(){
    
    this.addInteraction()
    this.map.on('pointermove', this.pointerMoveHandler.bind(this));
    this.map.getViewport().addEventListener('mouseout',()=>{
      this.helpTooltipElement.classList.add('hidden');
    });
  }

  stopDrawing(){
    this.map.removeInteraction(this.draw)
    this.map.removeEventListener('pointermove')
    this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement)
    this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    this.map.removeLayer(this.drawingLayer);
    this.measures.forEach(_ => this.map.removeOverlay(_));
    this.drawingLayer = null;
    this.SelectedMesureType = null;
    this.drawComplete = false;
    this.totalDistance = null;
  }

  pointerMoveHandler(evt){
    
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
  }

  onTypeChange(e) {
    this.map.removeInteraction(this.draw);
    this.addInteraction();
  }

  addInteraction() {
    this.draw = this.getDrawInteraction()
    this.draw.on('drawstart', this.drawstart.bind(this))
    this.draw.on('drawend', this.drawend.bind(this))
    this.map.addInteraction(this.draw)
    this.createHelpTooltip()
    this.createMeasureTooltip()
  }

  getDrawInteraction() {
    
    if(!this.drawingLayer){
      this.drawingLayer = new VectorLayer({
        source: new VectorSource(),
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
      this.map.addLayer(this.drawingLayer)
    }

    return new Draw({
      source: this.drawingLayer.getSource(),
      type: this.type,
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

  }

  drawstart(e) {
    
    // set sketch
    this.sketch = e.feature;
    var tooltipCoord = e.coordinate;

    this.listener = this.sketch.getGeometry().on('change',(evt) => {
      var geom = evt.target;
      var output;
      if (geom instanceof Polygon) {
        output = this.formatArea(geom);
        this.SelectedMesureType = "Area"

        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        this.SelectedMesureType = "Length"
        output = this.formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      this.measureTooltipElement.innerHTML = output;
      this.totalDistance = output;
      this.drawComplete = true;
      this.measureTooltip.setPosition(tooltipCoord);
    });
  }

  drawend() { 
    
    this.measureTooltipElement.className = 'tooltip tooltip-static';
    this.measureTooltip.setOffset([0, -7]);
    this.sketch = null;
    this.measureTooltipElement = null;
    this.createMeasureTooltip();
    unByKey(this.listener);
  }

  createHelpTooltip() {
    
    // if (this.helpTooltipElement) {
    //   debugger;
    //   this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    // }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.helpTooltip);
  }

  createMeasureTooltip() {
    
    // if (this.measureTooltipElement) {
    //   debugger;
    //   this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    // }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'tooltip tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(this.measureTooltip);
    this.measures.push(this.measureTooltip)
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
  }

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
  }

}