// this is src/idmap/polygon.jsx

/**
 * Draws polygons/shapes
 * @param  {the page to draw onto} page = Page
 * @param  {the path to draw} path an array of coordiantes on the page [[x,y],[x,y],[x,y],...]
 * @return {Polygon}
 */
var polygon_drawer = function(page, path, layer, name){
  // this would be the way in extendscript only
  var poly = page.polygons.add({itemLayer:layer});
  poly.paths[0].entirePath = path;
  poly.label = name;
  return poly; // for styling
};