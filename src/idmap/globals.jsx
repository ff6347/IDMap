// this is src/idmap/globals.jsx
var DEBUG = false; // just for debugging to the console
var settings = {
  new_document: true,
  new_layer: true,
  new_layer_name: 'map',
  projection_type: 'equirectangular',
  // check out http://dbsgeo.com/latlon/
  // to get lat lon coordinates
  boundingBox: {
    ul_lat: 90,
    ul_lon: -180,
    lr_lat: -90,
    lr_lon: 180
  },
};