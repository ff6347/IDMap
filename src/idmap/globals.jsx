// this is src/idmap/globals.jsx
var DEBUG = false; // just for debugging to the console
var settings = {
  new_document: true,
  new_layer: true,
  new_layer_name: 'map',
  projection_type: 'equirectangular',
  // check out http://dbsgeo.com/latlon/
  // to get lat lon coordinates
};

// this is the world bounding box
settings.boundingBox = {
  ul_lat: 90,
  ul_lon: -180,
  lr_lat: -90,
  lr_lon: 180
};

//  set a different bbox
// this is berlin potsdam bounding box
//
// settings.boundingBox = {
//   ul_lon: 12.9638671875, // the most left point
//   ul_lat: 52.70468296296834, // the most top point
//   lr_lat: 52.338695481504814, // the most bottom point
//   lr_lon: 13.8153076171875, // the most right point
// };


/*****************************************
END OF SETTINGS in src/idmap/globals.jsx
*****************************************/