// this is src/idmap/geo.jsx
// here all the location extraction and path data generation takes place

var geo_generator = function(doc, page) {

  var geojson = idmap_countries; // this is not necessary but usefull to have in here.

  var paths = [];
  for (var i = 0; i < geojson.features.length; i++) {
    var country = GEOJson.features[i];
    var name = country.properties.name;
    var type = country.geometry.type;
    var coords = country.geometry.coordinates;
    // we need t ochekc if we have polygons or mulitpolygon features
    var pattern = "MultiPolygon";
    var reg = new RegExp(pattern, "g");
    if (reg.test(type) === true) {
      // Houston we have a Multipolygon
      for (var j = 0; j < coords.length; j++) {
        for (var k = 0; k < coords[j].length; k++) {
          var path = [];
          // now loop all lat lon coordiantes
          for (var l = 0; l < coords[j][k].length; l++) {
            var locations = coords[j][k][l];
            var latlng = {
              "lng": locations[0],
              "lat": locations[1]
            };
            var xy = null;
            if ((settings.projection_type)
              .localeCompare('equirectangular') === 0) {
              xy = Geo.projections.ind.equirectangular.toAESpace(doc, latlng, page);


            }

          }
        }
      }
    } else {
      // nah just a polygon
    }
  }
};