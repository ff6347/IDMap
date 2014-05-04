/*************************************************
This is the main function. all
the execution of all other functions happen in here
// This is src/idmap/main.jsx
*************************************************/

var draw = function() {
  /**
   * see file src/idmap/document.jsx
   */
  var doc = doc_builder(); // create a basic doc
  var canvas = doc.pages[0]; // select the first page
  /**
   * see file src/idmap/geo.jsx
   * @type {[type]}
   */
  var paths = geo_to_id_generator(doc, canvas, settings); // transform geo coordinates to ID coordinates
  var layer = null;
if(settings.new_layer){
  layer = doc.layers.add({
    name: settings.new_layer_name
  }); // add a layer
}else{
  layer = doc.activeLayer; // use the current one
}
if(layer === null){
 alert("no active or new layer to draw on.");
 return "no layer";
}
  var polygons = []; // for all the polygons
  // loop the paths we have
  for (var i = 0; i < paths.length; i++) {
    /**
     * see file src/idmap/polygon.jsx
     */
    var poly = polygon_drawer(canvas, paths[i].path, layer,paths[i].country);
    polygons.push(poly); // push them to the array
  }
  /**
   * see file src/idmap/styling.jsx
   */
  create_objectstyles(doc); // create some object styles
  polygon_styling(doc, polygons); // style them
  return 0;
};

draw();// now run that thang!
return 'done';