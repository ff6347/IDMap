// This is main.jsx

  var testpath = [
    [10, 10],
    [20, 20],
    [100, 20],
    [20, 5]
  ];
var draw = function () {
  var doc = doc_builder();
  var canvas = doc.pages[0];
  var paths = geo_to_id_generator(doc, canvas);
  for(var i = 0; i < paths.length;i++){
    polygon_drawer(canvas, paths[i]);
  }
  return 'done';
};

draw();

