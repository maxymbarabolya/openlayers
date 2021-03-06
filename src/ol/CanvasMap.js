/**
 * @module ol/CanvasMap
 */
import _ol_ from './index.js';
import _ol_PluggableMap_ from './PluggableMap.js';
import _ol_PluginType_ from './PluginType.js';
import _ol_control_ from './control.js';
import _ol_interaction_ from './interaction.js';
import _ol_obj_ from './obj.js';
import _ol_plugins_ from './plugins.js';
import _ol_renderer_canvas_ImageLayer_ from './renderer/canvas/ImageLayer.js';
import _ol_renderer_canvas_Map_ from './renderer/canvas/Map.js';
import _ol_renderer_canvas_TileLayer_ from './renderer/canvas/TileLayer.js';
import _ol_renderer_canvas_VectorLayer_ from './renderer/canvas/VectorLayer.js';
import _ol_renderer_canvas_VectorTileLayer_ from './renderer/canvas/VectorTileLayer.js';


_ol_plugins_.register(_ol_PluginType_.MAP_RENDERER, _ol_renderer_canvas_Map_);
_ol_plugins_.registerMultiple(_ol_PluginType_.LAYER_RENDERER, [
  _ol_renderer_canvas_ImageLayer_,
  _ol_renderer_canvas_TileLayer_,
  _ol_renderer_canvas_VectorLayer_,
  _ol_renderer_canvas_VectorTileLayer_
]);


/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     var map = new ol.CanvasMap({
 *       view: new ol.View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new ol.layer.Tile({
 *           source: new ol.source.OSM()
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * The above snippet creates a map using a {@link ol.layer.Tile} to display
 * {@link ol.source.OSM} OSM data and render it to a DOM element with the
 * id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link ol.Overlay} for the difference). The map itself is placed in
 * a further element within the viewport.
 *
 * Layers are stored as a `ol.Collection` in layerGroups. A top-level group is
 * provided by the library. This is what is accessed by `getLayerGroup` and
 * `setLayerGroup`. Layers entered in the options are added to this group, and
 * `addLayer` and `removeLayer` change the layer collection in the group.
 * `getLayers` is a convenience function for `getLayerGroup().getLayers()`.
 * Note that `ol.layer.Group` is a subclass of `ol.layer.Base`, so layers
 * entered in the options or added with `addLayer` can be groups, which can
 * contain further groups, and so on.
 *
 * @constructor
 * @extends {ol.PluggableMap}
 * @param {olx.MapOptions} options Map options.
 * @fires ol.MapBrowserEvent
 * @fires ol.MapEvent
 * @fires ol.render.Event#postcompose
 * @fires ol.render.Event#precompose
 * @api
 */
var _ol_CanvasMap_ = function(options) {
  options = _ol_obj_.assign({}, options);
  delete options.renderer;
  if (!options.controls) {
    options.controls = _ol_control_.defaults();
  }
  if (!options.interactions) {
    options.interactions = _ol_interaction_.defaults();
  }

  _ol_PluggableMap_.call(this, options);
};

_ol_.inherits(_ol_CanvasMap_, _ol_PluggableMap_);
export default _ol_CanvasMap_;
