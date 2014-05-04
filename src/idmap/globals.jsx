// this is src/idmap/globals.jsx
var DEBUG = true; // just for debugging to the console
var settings = {
  new_document: true,
  new_layer: true,
  new_layer_name: 'map',
  /*
  select the projection type you want
  equirectangular = 0
  mercator = 1
  gallpeters = 2
  hammer = 3
  sinusoidal = 4
  aitoff = 5
   */
  projection_type:0,

  // check out http://dbsgeo.com/latlon/
  // to get lat lon coordinates
};

// this is the world bounding box
// settings.boundingBox = {
//   zoomed: false,
//   bounds:{
//   ul_lat: 90,
//   ul_lon: -180,
//   lr_lat: -90,
//   lr_lon: 180
//   }
// };

//  set a different bbox
// this is berlin potsdam bounding box
//
// settings.boundingBox = {
//    zoomed: true,
//    bounds:{
//   ul_lon: 12.9638671875, // the most left point
//   ul_lat: 52.70468296296834, // the most top point
//   lr_lon: 13.8153076171875 // the most right point
//   lr_lat: 52.338695481504814, // the most bottom point
//   }
// };
//
// europe zoomed
// settings.boundingBox = {
//    zoomed: true,
//    bounds:{
//   ul_lon: -27.476806640625, // the most left point
//   ul_lat: 60.965109923019, // the most top point
//   lr_lon: 49.515380859375, // the most right point
//   lr_lat: 43.12103377575541 // the most bottom point
//   }
// };

// tilemill export test
// UL LON -114.6094
// UL LAT 59.5343
// LR LON 56.25
// LR LAT 1.4061
//
// settings.boundingBox = {
//    zoomed: true,
//    bounds:{
//   ul_lon: -114.6094, // the most left point
//   ul_lat: 59.5343, // the most top point
//   lr_lon: 56.25, // the most right point
//   lr_lat: 1.4061 // the most bottom point
//   }
// };

// mercator zoom test
settings.boundingBox = {
   zoomed: true,
    bounds:{
  ul_lat: 90,
  ul_lon: -180,
  lr_lat: -90,
  lr_lon: 180
  }
};


// this is a part of Cuba
// settings.boundingBox = {
//    zoomed: true,
//    bounds:{
//   ul_lon: -85.87600708007812, // the most left point
//   ul_lat: 24.265745335010493, // the most top point
//   lr_lon:  -78.66897583007812, // the most right point
//   lr_lat:  19.76541117325592 // the most bottom point
//   }
// };

/*****************************************************
Below this line is advanced editing.
Only change things if you are sure what you are doing
******************************************************/


settings.projections  = [
      {
        name: 'equirectangular',
        value: 0,
        w: 360,
        h: 180
      }, {
        name: 'mercator',
        value: 1,
        w: 360,
        h: 360
      }, {
        name: 'gallpeters',
        value: 2,
        w: 360,
        h: 229
      }, {
        name: 'hammer',
        value: 3,
        w: 360,
        h: 180
      }, {
        name: 'sinusoidal',
        value: 4,
        w: 360,
        h: 180
      }, {
        name: 'aitoff',
        value: 5,
        w: 360,
        h: 180
      }
      ];

// calc the right projection
//
settings.gotTheType = false;
settings.ptype = "";
settings.docWidth = 0;
settings.docHeight = 0;

    for (var pndx = 0; pndx < settings.projections.length; pndx++) {
      if (settings.projection_type === settings.projections[pndx].value) {
        settings.ptype = settings.projections[pndx].name;
        settings.docWidth = settings.projections[pndx].w;
        settings.docHeight = settings.projections[pndx].h;
        settings.gotTheType = true;
        break;
      }
    }


if(DEBUG){
  $.writeln("Selected Projection is: " + settings.ptype);
  $.writeln("Doc will be : " + settings.docWidth + " || " + settings.docHeight);
}

if(settings.gotTheType === false){

var msg = "There was an error getting the right projection type. Did you use one of these?\n";

  for(var pt = 0; pt < settings.projections.length;pt++){
    var tmpstr = settings.projections[pt].toSource();
    tmpstr = tmpstr.replace(new RegExp(",","g"),"\t");
    msg+=tmpstr +"\n";
  }
  alert(msg);
  return;
}
// if the doc comes out with a width and height of 0 there was an error here
/*****************************************
END OF SETTINGS in src/idmap/globals.jsx
*****************************************/