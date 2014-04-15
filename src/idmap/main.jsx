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
  polygon_drawer(canvas, testpath);
};

draw();