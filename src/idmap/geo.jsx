// this is src/idmap/geo.jsx
// here all the location extraction and path data generation takes place

var new_location_transformer = function(doc, page, locations) {
  //  float x = width * ((BPM_westlon - loc.lon) / (BPM_westlon - BPM_eastlon));
  // float y = ( height * ((BPM_northlat - loc.lat)/(BPM_northlat - BPM_southlat)));
  // This is still in an experimanteal state
  // should be merged into the extendscript.geo lib
  var w = doc.documentPreferences.pageWidth;
  var h = doc.documentPreferences.pageHeight;
  var latlng = {
    "lng": locations[0],
    "lat": locations[1]
  };
  //   boundingBox: {
  //   ul_lat: 90,
  //   ul_lon: -180,
  //   lr_lat: -90,
  //   lr_lon: 180
  // },
  var x = w * ((settings.boundingBox.ul_lon - latlng.lng) / (settings.boundingBox.ul_lon - settings.boundingBox.lr_lon));
  var y = (h * ((settings.boundingBox.ul_lat - latlng.lat) / (settings.boundingBox.ul_lat - settings.boundingBox.lr_lat)));
  if (x < 0) {
    x = 0;
  } else if (x > w) {
    x = w;
  }
  if (y < 0) {
    y = 0;
  } else if (y > h) {
    y = h;
  }
  return {
    "x": x,
    "y": y
  };

};

var location_transformer = function(doc, page, locations) {
  var latlng = {
    "lng": locations[0],
    "lat": locations[1]
  };
  var xy = null;
  if ((settings.ptype)
    .localeCompare('equirectangular') === 0) {
    xy = Geo.projections.ind.equirectangular.toIDPage(doc, latlng, page);
  } else if ((settings.ptype)
    .localeCompare('mercator') === 0) {
    xy = Geo.projections.ind.mercator.toIDPage(doc, latlng, page);
  } else if ((settings.ptype)
    .localeCompare('gallpeters') === 0) {
    xy = Geo.projections.ind.gallpeters.toIDPage(doc, latlng, page);
  } else if ((settings.ptype)
    .localeCompare('hammer') === 0) {
    xy = Geo.projections.ind.hammer.toIDPage(doc, latlng, page);
  } else if ((settings.ptype)
    .localeCompare('sinusoidal') === 0) {
    xy = Geo.projections.ind.sinusoidal.toIDPage(doc, latlng, page);
  } else if ((settings.ptype)
    .localeCompare('aitoff') === 0) {
    xy = Geo.projections.ind.aitoff.toIDPage(doc, latlng, page);
  } else {

    alert("Could not identify the selected projection type");
    return;
  } // end of projection type check
  // $.writeln(xy.x + " <--x || y--> " +xy.y);
  return xy;

};
var geo_to_id_generator = function(doc, page) {


  var geojson = idmap_countries; // this is not necessary but usefull to have in here.

  var paths = [];
  for (var i = 0; i < geojson.features.length; i++) {
    var country = geojson.features[i];
    var name = country.properties.name;
    var type = country.geometry.type;
    var coords = country.geometry.coordinates;
    // we need to check if we have polygons or mulitpolygon features
    if (DEBUG) {
      $.writeln("Country: " + name);
      $.writeln("Geo Json feature type: " + type);

    }

    // if (reg.test(type) === true) {
    if (type.localeCompare('MultiPolygon') === 0) {
      // Houston we have a Multipolygon
      for (var j = 0; j < coords.length; j++) {
        for (var k = 0; k < coords[j].length; k++) {
          // now loop all lat lon coordiantes
          var multipolygon = {country:name,path:[]};
          for (var l = 0; l < coords[j][k].length; l++) {

            var mp_xy = settings.boundingBox.zoomed === true ? new_location_transformer(doc, page, coords[j][k][l]) : location_transformer(doc, page, coords[j][k][l]);

            multipolygon.path.push([mp_xy.x, mp_xy.y]);
            if (DEBUG) {

              // $.writeln("Path:" + path + "\n\n"); // this takes a long time to execute
              // $.writeln("Path has " + path.length + " points");
            }
          } // end of l loop
          paths.push(multipolygon);
        } // end of k loop
      } // end of j loop
    } else {
      // nah. just a polygon
      var polygon = {country: name, path:[]};
      for (var m = 0; m < coords[0].length; m++) {
        var p_xy = settings.boundingBox.zoomed === true ? new_location_transformer(doc, page, coords[0][m]) : location_transformer(doc, page, coords[0][m]);
        // var p_xy =  new_location_transformer(doc, page, coords[0][m]);
        polygon.path.push([p_xy.x, p_xy.y]);
      } // end of m loop
      paths.push(polygon);
    } // end of else polygon
  } // end of i loop
  // if (DEBUG) $.writeln(paths);
  return paths;
};