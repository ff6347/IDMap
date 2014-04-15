// this is src/idmap/geo.jsx
// here all the location extraction and path data generation takes place

var location_transformer = function(doc, page, locations){
            var latlng = {
              "lng": locations[0],
              "lat": locations[1]
            };
            var xy = null;
            if ((settings.projection_type)
              .localeCompare('equirectangular') === 0) {
              xy = Geo.projections.ind.equirectangular.toIDPage(doc, latlng, page);
            }// end of projection type check
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
      if(DEBUG){
    $.writeln("Country: " + name);
    $.writeln("Geo Json feature type: " + type);

      }

    // if (reg.test(type) === true) {
    if (type.localeCompare('MultiPolygon') === 0) {
      // Houston we have a Multipolygon
      for (var j = 0; j < coords.length; j++) {
        for (var k = 0; k < coords[j].length; k++) {
          // now loop all lat lon coordiantes
          var multipolygon_path = [];
          for (var l = 0; l < coords[j][k].length; l++) {
            var mp_xy = location_transformer(doc, page, coords[j][k][l]);
            multipolygon_path.push([mp_xy.x, mp_xy.y]);
            if(DEBUG){

              // $.writeln("Path:" + path + "\n\n"); // this takes a long time to execute
              // $.writeln("Path has " + path.length + " points");
            }
          }// end of l loop
        paths.push(multipolygon_path);
        } // end of k loop
      }// end of j loop
    } else {
      // nah. just a polygon
      var polygon_path = [];
      for(var m = 0; m < coords[0].length;m++){
        var p_xy = location_transformer(doc, page, coords[0][m]);
            polygon_path.push([p_xy.x, p_xy.y]);
      }// end of m loop
      paths.push(polygon_path);
    }// end of else polygon
  }// end of i loop
  if(DEBUG) $.writeln(paths);
  return paths;
};