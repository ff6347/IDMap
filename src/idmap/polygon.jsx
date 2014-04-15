// this is src/idmap/polygon.jsx

/**
 * Draws polygons/shapes
 * @param  {the page to draw onto} page = Page
 * @param  {the path to draw} path an array of coordiantes on the page [[x,y],[x,y],[x,y],...]
 * @return {nothing for now}
 */
var polygon_drawer = function(page, path){
  // this would be the way in extendscript only
  var poly = page.polygons.add();
  poly.paths[0].entirePath = path;


};