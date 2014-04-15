/**
 * [polygon_styling description]
 * @return {[type]} [description]
 */

var create_objectstyles = function(doc) {
  var objectstyle = doc.objectStyles.add();

  objectstyle.properties = {
    name: "basic",
    fillColor: doc.swatches.item(3),
    /* could also be doc.swatches[3] */
    fillTint: 50,
    strokeColor: doc.swatches.item(5),
    strokeTint: 70,
    strokeWeight: 0.5,

    // bottomLeftCornerOption: CornerOptions.FANCY_CORNER,
    transparencySettings: {
      blendingSettings: {
        opacity: 50,
        blendMode: BlendMode.COLOR
      }
    }
  };
};

var polygon_styling = function(doc, polygons) {
  for (var i = 0; i < polygons.length; i++) {
    var polygon = polygons[i];
    // polygon.properties = {
    //   fillColor: doc.swatches[3],
    //   fillTint: 50,
    //   strokeColor: doc.swatches[5],
    //   strokeTint: 70,
    //   strokeWeight: 1
    // };

    // ifyou like to use object styles use it like this:

    polygon.appliedObjectStyle = doc.objectStyles.item('basic');

    // could also be written like this
    // polygon.fillColor = doc.swatches[3];
    // polygon.fillTint = 50;
    // polygon.strokeColor = doc.swatches[5];
    // polygon.strokeTint = 70;
    // polygon.strokeWeight = 1;
  }
};