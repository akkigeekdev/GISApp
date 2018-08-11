import Tile from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import LayerGroup from 'ol/layer/group';

export class Utils{
    
    map : any;
    setMap(map){
        this.map = map;
    }

    addLayers(layer){
        if(!this.isMapInitialized){ alert("Map not initialized") }
    }

    addLayerGroup(id, title, source){

    }


    isMapInitialized(){
        return typeof this.map == 'object'
    }

}