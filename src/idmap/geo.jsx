// this is src/idmap/geo.jsx
// here all the location extraction and path data generation takes place

var geo_to_id_generator = function(doc, page, settings) {
var transformer = Geo.projections.ind.transform;
var bounds = settings.boundingBox.bounds;
var ptype = settings.ptype;
var zoomed = settings.boundingBox.zoomed;


  var geojson = idmap_countries; // this is not necessary but usefull to have in here.

  var paths = [];
  for (var i = 0; i < geojson.features.length; i++) {
    var country = geojson.features[i];
    var name = country.properties.name;
    var type = country.geometry.type;
    var coords = country.geometry.coordinates;
    // we need to check if we have polygons or mulitpolygon features
    if (DEBUG) {
      // $.writeln("Country: " + name);
      // $.writeln("Geo Json feature type: " + type);

    }

    // if (reg.test(type) === true) {
    if (type.localeCompare('MultiPolygon') === 0) {
      // Houston we have a Multipolygon
      for (var j = 0; j < coords.length; j++) {
        for (var k = 0; k < coords[j].length; k++) {
          // now loop all lat lon coordiantes
          var multipolygon = {country:name,path:[]};
          for (var l = 0; l < coords[j][k].length; l++) {
//Geo.projections.ind.transform = function(doc, page, locations, zommed, boundingBox, projectionType) {
// transformer(doc, page, coords[j][k][l],settings.boundingBox.zoomed,settings.boundingBox.bounds ,settings.ptype)
            // var mp_xy = settings.boundingBox.zoomed === true ? new_location_transformer(doc, page, coords[j][k][l]) : location_transformer(doc, page, coords[j][k][l]);

            var mp_xy = transformer(doc, page, coords[j][k][l], zoomed,bounds ,ptype);

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
        // var p_xy = settings.boundingBox.zoomed === true ? new_location_transformer(doc, page, coords[0][m]) : location_transformer(doc, page, coords[0][m]);
        var p_xy = transformer(doc, page, coords[0][m],zoomed,bounds ,ptype);
        polygon.path.push([p_xy.x, p_xy.y]);
      } // end of m loop
      paths.push(polygon);
    } // end of else polygon
  } // end of i loop
  // if (DEBUG) $.writeln(paths);
  return paths;
};