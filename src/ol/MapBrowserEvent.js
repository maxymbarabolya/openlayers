/**
 * @module ol/MapBrowserEvent
 */
import _ol_ from './index.js';
import _ol_MapEvent_ from './MapEvent.js';

/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link ol.Map} for which events trigger a map browser event.
 *
 * @constructor
 * @extends {ol.MapEvent}
 * @implements {oli.MapBrowserEvent}
 * @param {string} type Event type.
 * @param {ol.PluggableMap} map Map.
 * @param {Event} browserEvent Browser event.
 * @param {boolean=} opt_dragging Is the map currently being dragged?
 * @param {?olx.FrameState=} opt_frameState Frame state.
 */
var _ol_MapBrowserEvent_ = function(type, map, browserEvent, opt_dragging,
    opt_frameState) {

  _ol_MapEvent_.call(this, type, map, opt_frameState);

  /**
   * The original browser event.
   * @const
   * @type {Event}
   * @api
   */
  this.originalEvent = browserEvent;

  /**
   * The map pixel relative to the viewport corresponding to the original browser event.
   * @type {ol.Pixel}
   * @api
   */
  this.pixel = map.getEventPixel(browserEvent);

  /**
   * The coordinate in view projection corresponding to the original browser event.
   * @type {ol.Coordinate}
   * @api
   */
  this.coordinate = map.getCoordinateFromPixel(this.pixel);

  /**
   * Indicates if the map is currently being dragged. Only set for
   * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
   *
   * @type {boolean}
   * @api
   */
  this.dragging = opt_dragging !== undefined ? opt_dragging : false;

};

_ol_.inherits(_ol_MapBrowserEvent_, _ol_MapEvent_);


/**
 * Prevents the default browser action.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault
 * @override
 * @api
 */
_ol_MapBrowserEvent_.prototype.preventDefault = function() {
  _ol_MapEvent_.prototype.preventDefault.call(this);
  this.originalEvent.preventDefault();
};


/**
 * Prevents further propagation of the current event.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation
 * @override
 * @api
 */
_ol_MapBrowserEvent_.prototype.stopPropagation = function() {
  _ol_MapEvent_.prototype.stopPropagation.call(this);
  this.originalEvent.stopPropagation();
};
export default _ol_MapBrowserEvent_;
