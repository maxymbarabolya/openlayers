import _ol_Graticule_ from '../src/ol/Graticule.js';
import _ol_Map_ from '../src/ol/Map.js';
import _ol_View_ from '../src/ol/View.js';
import _ol_layer_Tile_ from '../src/ol/layer/Tile.js';
import _ol_proj_ from '../src/ol/proj.js';
import _ol_source_OSM_ from '../src/ol/source/OSM.js';
import _ol_style_Stroke_ from '../src/ol/style/Stroke.js';


var map = new _ol_Map_({
  layers: [
    new _ol_layer_Tile_({
      source: new _ol_source_OSM_({
        wrapX: false
      })
    })
  ],
  target: 'map',
  view: new _ol_View_({
    center: _ol_proj_.fromLonLat([4.8, 47.75]),
    extent: _ol_proj_.get('EPSG:3857').getExtent(),
    zoom: 5
  })
});

// Create the graticule component
var graticule = new _ol_Graticule_({
  // the style to use for the lines, optional.
  strokeStyle: new _ol_style_Stroke_({
    color: 'rgba(255,120,0,0.9)',
    width: 2,
    lineDash: [0.5, 4]
  }),
  showLabels: true
});

graticule.setMap(map);
