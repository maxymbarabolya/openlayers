import _ol_Feature_ from '../../../../src/ol/Feature.js';
import _ol_geom_LineString_ from '../../../../src/ol/geom/LineString.js';
import _ol_geom_MultiLineString_ from '../../../../src/ol/geom/MultiLineString.js';
import _ol_geom_MultiPolygon_ from '../../../../src/ol/geom/MultiPolygon.js';
import _ol_geom_Point_ from '../../../../src/ol/geom/Point.js';
import _ol_geom_Polygon_ from '../../../../src/ol/geom/Polygon.js';
import _ol_Map_ from '../../../../src/ol/Map.js';
import _ol_View_ from '../../../../src/ol/View.js';
import _ol_layer_Vector_ from '../../../../src/ol/layer/Vector.js';
import _ol_source_Vector_ from '../../../../src/ol/source/Vector.js';
import _ol_style_Text_ from '../../../../src/ol/style/Text.js';
import _ol_style_Fill_ from '../../../../src/ol/style/Fill.js';
import _ol_style_Style_ from '../../../../src/ol/style/Style.js';
import _ol_style_Stroke_ from '../../../../src/ol/style/Stroke.js';

describe('ol.rendering.style.Text', function() {

  var map, vectorSource;

  function createMap(renderer, opt_pixelRatio) {
    var pixelRatio = opt_pixelRatio || 1;
    vectorSource = new _ol_source_Vector_();
    var vectorLayer = new _ol_layer_Vector_({
      source: vectorSource
    });

    map = new _ol_Map_({
      pixelRatio: pixelRatio,
      target: createMapDiv(200 / pixelRatio, 200 / pixelRatio),
      renderer: renderer,
      layers: [vectorLayer],
      view: new _ol_View_({
        projection: 'EPSG:4326',
        center: [0, 0],
        resolution: 1
      })
    });
  }

  afterEach(function() {
    if (map) {
      disposeMap(map);
      map = null;
    }
  });

  describe('#render', function() {

    function createFeatures(opt_scale) {
      var scale = opt_scale || 1;
      var feature;
      feature = new _ol_Feature_({
        geometry: new _ol_geom_Point_([-20, 18])
      });
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          scale: scale,
          text: 'hello',
          font: '10px sans-serif'
        })
      }));
      vectorSource.addFeature(feature);

      feature = new _ol_Feature_({
        geometry: new _ol_geom_Point_([-10, 0])
      });
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          scale: scale,
          text: 'hello',
          fill: new _ol_style_Fill_({
            color: 'red',
            font: '12px sans-serif'
          }),
          stroke: new _ol_style_Stroke_({
            color: '#000',
            width: 3
          })
        })
      }));
      vectorSource.addFeature(feature);

      feature = new _ol_Feature_({
        geometry: new _ol_geom_Point_([20, 10])
      });
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          scale: scale,
          rotateWithView: true,
          text: 'hello',
          font: '10px sans-serif',
          stroke: new _ol_style_Stroke_({
            color: [10, 10, 10, 0.5]
          })
        })
      }));
      vectorSource.addFeature(feature);
    }

    var nicePath = [
      20, 33, 40, 31, 60, 30, 80, 31, 100, 33, 120, 37, 140, 39, 160, 40,
      180, 39, 200, 37, 220, 33, 240, 31, 260, 30, 280, 31, 300, 33
    ];
    var uglyPath = [163, 22, 159, 30, 150, 30, 143, 24, 151, 17];
    var polygon = [151, 17, 163, 22, 159, 30, 150, 30, 143, 24, 151, 17];

    function createLineString(coords, textAlign, maxAngle, strokeColor, strokeWidth, scale) {
      var geom = new _ol_geom_LineString_();
      geom.setFlatCoordinates('XY', coords);
      var style = new _ol_style_Style_({
        stroke: new _ol_style_Stroke_({
          color: 'red'
        }),
        text: new _ol_style_Text_({
          text: 'Hello world',
          font: 'bold 14px sans-serif',
          scale: scale || 1,
          textAlign: textAlign,
          maxAngle: maxAngle,
          placement: 'line',
          stroke: new _ol_style_Stroke_({
            color: strokeColor || 'white',
            width: strokeWidth
          })
        })
      });
      var feature = new _ol_Feature_(geom);
      feature.setStyle(style);
      vectorSource.addFeature(feature);

      geom = geom.clone();
      geom.translate(0, 5);
      feature = new _ol_Feature_(geom);
      style = style.clone();
      style.getText().setTextBaseline('top');
      feature.setStyle(style);
      vectorSource.addFeature(feature);

      geom = geom.clone();
      geom.translate(0, -10);
      feature = new _ol_Feature_(geom);
      style = style.clone();
      style.getText().setTextBaseline('bottom');
      feature.setStyle(style);
      vectorSource.addFeature(feature);

      map.getView().fit(vectorSource.getExtent());
    }

    it('tests the canvas renderer without rotation', function(done) {
      createMap('canvas');
      createFeatures();
      expectResemble(map, 'rendering/ol/style/expected/text-canvas.png', IMAGE_TOLERANCE, done);
    });

    it('tests the canvas renderer with rotation', function(done) {
      createMap('canvas');
      createFeatures();
      map.getView().setRotation(Math.PI / 7);
      expectResemble(map, 'rendering/ol/style/expected/text-rotated-canvas.png', IMAGE_TOLERANCE, done);
    });

    it('renders correct stroke with pixelRatio != 1', function(done) {
      createMap('canvas', 2);
      createFeatures();
      expectResemble(map, 'rendering/ol/style/expected/text-canvas-hidpi.png', 2.9, done);
    });

    it('renders text correctly with scale != 1', function(done) {
      createMap('canvas');
      createFeatures(3);
      expectResemble(map, 'rendering/ol/style/expected/text-canvas-scale.png', 6, done);
    });

    it('renders multiline text with alignment options', function(done) {
      createMap('canvas');
      var feature;
      feature = new _ol_Feature_(new _ol_geom_Point_([25, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nleft',
          font: 'bold 14px sans-serif',
          textAlign: 'left'
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([-25, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nright',
          font: 'bold 14px sans-serif',
          textAlign: 'right'
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([0, 25]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nbottom',
          font: 'bold 14px sans-serif',
          textBaseline: 'bottom'
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([0, -25]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'top\nHello world',
          font: 'bold 14px sans-serif',
          textBaseline: 'top'
        })
      }));
      vectorSource.addFeature(feature);
      expectResemble(map, 'rendering/ol/style/expected/text-align-offset-canvas.png', 6, done);
    });

    it('renders multiline text with positioning options', function(done) {
      createMap('canvas');
      var feature;
      feature = new _ol_Feature_(new _ol_geom_Point_([0, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nleft',
          font: 'bold 14px sans-serif',
          textAlign: 'left',
          offsetX: 25
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([0, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nright',
          font: 'bold 14px sans-serif',
          textAlign: 'right',
          offsetX: -25
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([0, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world\nbottom',
          font: 'bold 14px sans-serif',
          textBaseline: 'bottom',
          offsetY: -25
        })
      }));
      vectorSource.addFeature(feature);
      feature = new _ol_Feature_(new _ol_geom_Point_([0, 0]));
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'top\nHello world',
          font: 'bold 14px sans-serif',
          textBaseline: 'top',
          offsetY: 25
        })
      }));
      vectorSource.addFeature(feature);
      expectResemble(map, 'rendering/ol/style/expected/text-align-offset-canvas.png', 6, done);
    });

    it('renders text along a MultiLineString', function(done) {
      createMap('canvas');
      var line = new _ol_geom_LineString_();
      line.setFlatCoordinates('XY', nicePath);
      var geom = new _ol_geom_MultiLineString_(null);
      geom.appendLineString(line);
      line = line.clone();
      line.translate(0, 50);
      geom.appendLineString(line);
      line = line.clone();
      line.translate(0, -100);
      geom.appendLineString(line);
      var feature = new _ol_Feature_(geom);
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world',
          placement: 'line',
          font: 'bold 30px sans-serif'
        })
      }));
      vectorSource.addFeature(feature);
      map.getView().fit(vectorSource.getExtent());
      expectResemble(map, 'rendering/ol/style/expected/text-multilinestring.png', 7, done);
    });

    it('renders text along a Polygon', function(done) {
      createMap('canvas');
      var geom = new _ol_geom_Polygon_(null);
      geom.setFlatCoordinates('XY', polygon, [polygon.length]);
      var feature = new _ol_Feature_(geom);
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world',
          font: 'bold 24px sans-serif',
          placement: 'line',
          overflow: true
        })
      }));
      vectorSource.addFeature(feature);
      map.getView().fit(vectorSource.getExtent());
      expectResemble(map, 'rendering/ol/style/expected/text-polygon.png', IMAGE_TOLERANCE, done);
    });

    it('renders text along a MultiPolygon', function(done) {
      createMap('canvas');
      var geom = new _ol_geom_Polygon_(null);
      geom.setFlatCoordinates('XY', polygon, [polygon.length]);
      var multiPolygon = new _ol_geom_MultiPolygon_(null);
      multiPolygon.appendPolygon(geom);
      geom = geom.clone();
      geom.translate(0, 30);
      multiPolygon.appendPolygon(geom);
      geom = geom.clone();
      geom.translate(0, -60);
      multiPolygon.appendPolygon(geom);
      var feature = new _ol_Feature_(multiPolygon);
      feature.setStyle(new _ol_style_Style_({
        text: new _ol_style_Text_({
          text: 'Hello world',
          font: 'bold 24px sans-serif',
          placement: 'line',
          overflow: true
        })
      }));
      vectorSource.addFeature(feature);
      map.getView().fit(vectorSource.getExtent());
      expectResemble(map, 'rendering/ol/style/expected/text-multipolygon.png', 4.4, done);
    });

    it('renders text background', function(done) {
      createMap('canvas');
      createFeatures();
      var features = vectorSource.getFeatures();
      features[0].getStyle().getText().setBackgroundFill(new _ol_style_Fill_({
        color: 'red'
      }));
      features[1].getStyle().getText().setBackgroundFill(new _ol_style_Fill_({
        color: 'red'
      }));
      features[1].getStyle().getText().setBackgroundStroke(new _ol_style_Stroke_({
        color: 'blue',
        width: 3
      }));
      features[2].getStyle().getText().setBackgroundFill(new _ol_style_Fill_({
        color: 'red'
      }));
      features[2].getStyle().getText().setBackgroundStroke(new _ol_style_Stroke_({
        color: 'blue',
        width: 3
      }));
      features[2].getStyle().getText().setPadding([5, 10, 15, 0]);
      map.getView().fit(vectorSource.getExtent());
      expectResemble(map, 'rendering/ol/style/expected/text-background.png', IMAGE_TOLERANCE, done);
    });

    describe('Text along an ugly upside down path, keep text upright', function() {

      it('renders text along a linestring with auto-align', function(done) {
        createMap('canvas');
        createLineString(uglyPath);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-auto.png', 3.6, done);
      });

      it('renders text along a linestring with `textAlign: \'center\'`', function(done) {
        createMap('canvas');
        createLineString(uglyPath, 'center');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-center.png', 3.6, done);
      });

      it('omits text along a linestring with `textAlign: \'left\'` when > maxAngle', function(done) {
        createMap('canvas');
        createLineString(uglyPath, 'left');
        vectorSource.getFeatures()[0].getStyle().getText().setTextAlign('left');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-omit.png', IMAGE_TOLERANCE, done);
      });

      it('omits text along a linestring with `textAlign: \'right\'` when > maxAngle', function(done) {
        createMap('canvas');
        createLineString(uglyPath, 'right');
        vectorSource.getFeatures()[0].getStyle().getText().setTextAlign('left');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-omit.png', IMAGE_TOLERANCE, done);
      });

      it('renders text along a linestring with `textAlign: \'left\'` and no angle limit', function(done) {
        createMap('canvas');
        createLineString(uglyPath, 'left', Infinity);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-left.png', 3.5, done);
      });

    });

    describe('Text along a nice path', function() {

      it('renders text along a linestring', function(done) {
        createMap('canvas');
        createLineString(nicePath);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-nice.png', 2.8, done);
      });

      it('uses correct font with different styles', function(done) {
        createMap('canvas');
        createLineString(nicePath);
        map.getView().setResolution(0.25);
        vectorSource.getFeatures()[0].getStyle().getText().setFont('18px monospace');
        vectorSource.getFeatures()[1].getStyle().getText().setFont('italic 38px serif');
        vectorSource.getFeatures()[1].getStyle().getText().setTextBaseline('middle');
        vectorSource.getFeatures()[2].getStyle().getText().setTextBaseline('middle');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-nice-multi-font.png', 7.54, done);
      });

      it('renders text along a linestring with scale != 1', function(done) {
        createMap('canvas');
        createLineString(nicePath, undefined, undefined, undefined, undefined, 2);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-nice-scale.png', 8, done);
      });

      it('aligns text along a linestring correctly with `textBaseline` option', function(done) {
        createMap('canvas');
        createLineString(nicePath, undefined, undefined, 'cyan', 3);
        map.getView().setResolution(0.25);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-nice-baseline.png', 6.2, done);
      });

      it('renders text along a linestring with `textAlign: \'left\'`', function(done) {
        createMap('canvas');
        createLineString(nicePath, 'left');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-left-nice.png', 2.8, done);
      });

      it('renders text along a rotated linestring', function(done) {
        createMap('canvas');
        map.getView().setRotation(Math.PI);
        createLineString(nicePath);
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-nice-rotated.png', 4.5, done);
      });

      it('renders text along a rotated linestring with `textAlign: \'left\'`', function(done) {
        createMap('canvas');
        map.getView().setRotation(Math.PI);
        createLineString(nicePath, 'left');
        expectResemble(map, 'rendering/ol/style/expected/text-linestring-left-nice-rotated.png', 4.5, done);
      });

    });

    where('WebGL').it('tests the webgl renderer without rotation', function(done) {
      createMap('webgl');
      createFeatures();
      expectResemble(map, 'rendering/ol/style/expected/text-webgl.png', 1.8, done);
    });

    where('WebGL').it('tests the webgl renderer with rotation', function(done) {
      createMap('webgl');
      createFeatures();
      map.getView().setRotation(Math.PI / 7);
      expectResemble(map, 'rendering/ol/style/expected/text-rotated-webgl.png', 1.8, done);
    });

  });
});
