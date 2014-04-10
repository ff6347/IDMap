
/*! IDMaps.jsx - v0.0.1 - 2014-04-10 */

/*! extendscript.geo.jsx - v0.0.1 - 2014-03-30 */
/*!
 * This is Geo.js
  * A collection of functions for calculating geo locations.
 * As used in AEMap.jsx and Locations.jsx
 * These functions are heavily based on mbostocks protoviz.
 * Why protoviz and not D3? because extracting some projection types from D3
 * is much more complex then using protoviz
 * https://github.com/mbostock/protovis
 *
 * License
 * Copyright (c) 2014 Fabian "fabiantheblind" Morón Zirfas
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify
 * copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALNGS IN THE SOFTWARE.
 *
 * see also http://www.opensource.org/licenses/mit-license.php
 */
Geo = function () {};
// END OF Geo.js

Geo.Utilities = {
};

Geo.Utilities.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

Geo.Utilities.map = function (value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};
Geo.projections = {
  /** The identity or "none" projection. */
  equirectangular: {

    project: function (latlng) {
      return {
        x: latlng.lng,
        y: latlng.lat
      };
    },
    invert: function (xy) {
      return {
        lng: xy.x,
        lat: xy.y
      };
    }
  },
  /** @see http://en.wikipedia.org/wiki/Mercator_projection */
  mercator: {

    project: function (latlng) {

      return {
        x: latlng.lng,
        y: latlng.lat > 85 ? 1 : latlng.lat < -85 ? -1 : Math.log(Math.tan(Math.PI / 4 + Geo.Utilities.radians(latlng.lat) / 2)) / Math.PI
      };
    },
    // invert: function (xy) {
    //   return {
    //     lng: xy.x * 180,
    //     lat: Geo.Utilities.degrees(2 * Math.atan(Math.exp(xy.y * Math.PI)) - Math.PI / 2)
    //   };
    // }
  },

  // /** @see http://en.wikipedia.org/wiki/Gall-Peters_projection */
  gallpeters: {

    project: function (latlng) {
      return {
        x: latlng.lng / 180,
        y: Math.sin(Geo.Utilities.radians(latlng.lat))
      };
    },

    // invert: function (xy) {
    //   return {
    //     lng: xy.x * 180,
    //     lat: Geo.Utilities.degrees(Math.asin(xy.y))
    //   };
    // }
  },

  // /** @see http://en.wikipedia.org/wiki/Sinusoidal_projection */
  sinusoidal: {

    project: function (latlng) {
      return {
        x: Geo.Utilities.radians(latlng.lng) * Math.cos(Geo.Utilities.radians(latlng.lat)) / Math.PI,
        y: latlng.lat / 90
      };
    },
    // invert: function (xy) {
    //   return {
    //     lng: Geo.Utilities.degrees((xy.x * Math.PI) / Math.cos(xy.y * Math.PI / 2)),
    //     lat: xy.y * 90
    //   };
    // }
  },

  // /** @see http://en.wikipedia.org/wiki/Aitoff_projection */
  aitoff: {

    project: function (latlng) {
      var l = Geo.Utilities.radians(latlng.lng),
        f = Geo.Utilities.radians(latlng.lat),
        a = Math.acos(Math.cos(f) * Math.cos(l / 2));
      return {
        x: 2 * (a ? (Math.cos(f) * Math.sin(l / 2) * a / Math.sin(a)) : 0) / Math.PI,
        y: 2 * (a ? (Math.sin(f) * a / Math.sin(a)) : 0) / Math.PI
      };
    },
    // invert: function (xy) {
    //   var x = xy.x * Math.PI / 2,
    //     y = xy.y * Math.PI / 2;
    //   return {
    //     lng: Geo.Utilities.degrees(x / Math.cos(y)),
    //     lat: Geo.Utilities.degrees(y)
    //   };
    // }
  },

  // eckert1: {
  //   project: function (latlng) {

  //     var alpha = Math.sqrt(8 / (3 * Math.PI));
  //     return {

  //       x: alpha * latlng.lat * (1 - Math.abs(latlng.lng) / Math.PI),
  //       y: alpha * latlng.lng
  //     };

  //   }
  // },

  // /** @see http://en.wikipedia.org/wiki/Hammer_projection */
  hammer: {

    project: function (latlng) {
      var l = Geo.Utilities.radians(latlng.lng),
        f = Geo.Utilities.radians(latlng.lat),
        c = Math.sqrt(1 + Math.cos(f) * Math.cos(l / 2));
      return {
        x: 2 * Math.SQRT2 * Math.cos(f) * Math.sin(l / 2) / c / 3,
        y: Math.SQRT2 * Math.sin(f) / c / 1.5
      };
    },
    // invert: function (xy) {
    //   var x = xy.x * 3,
    //     y = xy.y * 1.5,
    //     z = Math.sqrt(1 - x * x / 16 - y * y / 4);
    //   return {
    //     lng: Geo.Utilities.degrees(2 * Math.atan2(z * x, 2 * (2 * z * z - 1))),
    //     lat: Geo.Utilities.degrees(Math.asin(z * y))
    //   };
    // }
  },

};

// END OF Projections.js
Geo.projections.ind = function(){};
Geo.projections.ind.equirectangular = {
    toIDPage: function (latlng, page) {
    }
  };
  /** @see http://en.wikipedia.org/wiki/Mercator_projection */
  Geo.projections.ind.mercator = {
    toIDPage: function (latlng, page) {


    }
  };

  // /** @see http://en.wikipedia.org/wiki/Gall-Peters_projection */
  Geo.projections.ind.gallpeters = {
    toIDPage: function (latlng, page) {

    }

  };

  // /** @see http://en.wikipedia.org/wiki/Sinusoidal_projection */
    Geo.projections.ind.sinusoidal= {
      toIDPage: function (latlng, page) {


      }

  };

  // /** @see http://en.wikipedia.org/wiki/Aitoff_projection */
    Geo.projections.ind.aitoff= {

      toIDPage: function (latlng, page) {

      },
  };


  // /** @see http://en.wikipedia.org/wiki/Hammer_projection */
    Geo.projections.ind.hammer= {

    toIDPage: function (latlng, page) {
    }

  };

// END OF AfterEffects.js

/*! extendscript.csv.jsx - v0.0.1 - 2014-04-06 */
/*!
 * This is CSV.jsx
 * A collection of functions for reading CSV.
 * As used in Locations.jsx
 *
 * License
 * Copyright (c) 2014 Fabian "fabiantheblind" Morón Zirfas
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify
 * copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALNGS IN THE SOFTWARE.
 *
 * see also http://www.opensource.org/licenses/mit-license.php
 */
CSV = function() {};
// END OF CSV.js

/**
 * This is a string prototype function
 * found here http://www.greywyvern.com/?post=258
 * @param  {String} sep is the separator we use only ,
 * @return {Array}     returns an Array of strings
 */
// String.prototype.splitCSV = function(sep) {
//   for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
//     if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) === '"') {
//       if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) === '"') {
//         foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
//       } else if (x) {
//         foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
//       } else foo = foo.shift().split(sep).concat(foo);
//     } else foo[x].replace(/""/g, '"');
//   } return foo;
// };


// Dont use prototypes?
// for the time beeing YES
// Makes problems with other scripts
// or we need to use a unique prefix! like ftb_splitCSV
CSV.Utilities = {};

CSV.Utilities.split_csv = function(sep, the_string) {

  for (var foo = the_string.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) === '"') {
      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) === '"') {
        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
      } else if (x) {
        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
      } else foo = foo.shift().split(sep).concat(foo);
    } else foo[x].replace(/""/g, '"');
  }
  return foo;
};



/**
 * this reads in a file
 * line by line
 * @return {Array of String}
 */

CSV.reader = {
  read_in_txt: function() {

    var textFile = File.openDialog("Select a text file to import.", "*.*", false);
    var textLines = [];
    if (textFile !== null) {
      textFile.open('r', undefined, undefined);
      while (!textFile.eof) {
        textLines[textLines.length] = textFile.readln();
      }
      textFile.close();
    }
    if (textLines.length < 1) {
      alert("ERROR Reading file");
      return null;
    } else {
      return textLines;
    }
  },

  /**
   * gets lines of strings and creates the data we need from
   * CSV Header and content
   * @param  {Array of String} textLines are , or \t separated values
   * @return {Object}
   */
  textlines_to_data: function(textLines, separator) {

    var data = {};
    data.fields = [];
    data.keys = [];

    for (var i = 0; i < textLines.length; i++) {

      var line_arr = CSV.Utilities.split_csv(separator, textLines[i]);
      if (i === 0) {
        for (var j = 0; j < line_arr.length; j++) {
          data.keys[j] = line_arr[j];
        }

      } else {
        var obj_str = "";
        for (var k = 0; k < line_arr.length; k++) {
          if (k !== line_arr.length - 1) {
            obj_str += 'field_' + k + ':"' + line_arr[k] + '",';
          } else {
            obj_str += 'field_' + k + ':"' + line_arr[k] + '"';
          }
        }
        // var parsedData = JSON.parse("{"+ obj_str+"}");
        data.fields.push(eval("({" + obj_str + "})"));

      }
    }
    return data;
  }


};
// This is main.jsx