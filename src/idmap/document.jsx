// this src/idmap/document.jsx
// A simple fuction for creating a new doc with some basic settings
//// settings.boundingBox = {
//   zoomed: false,
//   bounds:{
//   ul_lat: 90,
//   ul_lon: -180,
//   lr_lat: -90,
//   lr_lon: 180
//   }
// };
var difference = function(a, b) {
  return Math.abs(a - b);
};

var doc_builder = function() {
  var doc = null;
  if (settings.boundingBox.zoomed) {
    // calc new doc width
    var ul_lon = settings.boundingBox.bounds.ul_lon;
    var ul_lat = settings.boundingBox.bounds.ul_lat;
    var lr_lon = settings.boundingBox.bounds.lr_lon;
    var lr_lat = settings.boundingBox.bounds.lr_lat;
    var ul_xy, lr_xy;

    if ((settings.ptype)
      .localeCompare('equirectangular') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");

      ul_xy = Geo.projections.equirectangular.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.equirectangular.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else if ((settings.ptype)
      .localeCompare('mercator') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");
      ul_xy = Geo.projections.mercator.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.mercator.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else if ((settings.ptype)
      .localeCompare('gallpeters') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");
      ul_xy = Geo.projections.gallpeters.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.gallpeters.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else if ((settings.ptype)
      .localeCompare('sinusoidal') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");
      ul_xy = Geo.projections.sinusoidal.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.sinusoidal.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else if ((settings.ptype)
      .localeCompare('aitoff') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");
      ul_xy = Geo.projections.aitoff.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.aitoff.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else if ((settings.ptype)
      .localeCompare('hammer') === 0) {
      if (DEBUG) $.writeln("Calculating doc size with " + settings.ptype + " projection");
      ul_xy = Geo.projections.hammer.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.hammer.project({
        lng: lr_lon,
        lat: lr_lat
      });
    } else {
      // fallback to equirectangular
      if (DEBUG) $.writeln("Calculating doc size with fallback projection");

      ul_xy = Geo.projections.equirectangular.project({
        lng: ul_lon,
        lat: ul_lat
      });
      lr_xy = Geo.projections.equirectangular.project({
        lng: lr_lon,
        lat: lr_lat
      });
    }
    var w = 360;
    var h = 180;
    if(settings.projection_type === 0){
     w = difference(ul_xy.x, lr_xy.x);
     h = (difference(ul_xy.y, lr_xy.y));

      }else if(settings.projection_type === 1){

     w = difference(ul_xy.x, lr_xy.x);
     h = settings.projections[1].h * (difference(ul_xy.y, lr_xy.y));
        }else if(settings.projection_type > 1){
     w = settings.projections[1].w * difference(ul_xy.x, lr_xy.x);
     h = settings.projections[1].h * (difference(ul_xy.y, lr_xy.y));

        }
    if (DEBUG) {
      $.writeln("zoomed width will be " + w);
      $.writeln("zoomed height will be " + h);
    }
    settings.docWidth = w;
    settings.docHeight = h;

  }
  if (settings.new_document) {
    doc = app.documents.add({
      documentPreferences: {
        pageWidth: settings.docWidth,
        pageHeight: settings.docHeight,
        facingPages: false
      }
    });
  } else {
    doc = app.activeDocument;
    if (app.documents.length === 0) {
      alert("Hm. You need to have a document or set the settings to new_document.\n Right now it seems like you set the settings.new_document to false but don't have any open document. How should i draw something for you? Onto a coster?");
    }
    return "no document available";
    // here should be a check if the pagesize fits our map
  }
  Geo.Utilities.ind.info.set(doc,
    settings.boundingBox.bounds,
    settings.ptype,
    settings.boundingBox.zoomed);
  return doc;
};