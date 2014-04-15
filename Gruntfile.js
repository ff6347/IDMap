/*global module:false*/
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),

    /**
     * copy the main script into temp and give it package name and version
     */
    copy: {
      script: {
        src: "src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx",
        dest: "dist/<%= pkg.name %>.<%= pkg.version %>.jsx",
      },
      'geo-json': {
        src: "src/lib/world.geo.json/countries.geo.json",

        dest: "src/tmp/countries.geo.min.json",
      }

    },

    /**
     * wrap into anonymous function
     */
    wrap: {
      'geo-json': {
        src: ['src/tmp/countries.geo.min.json'],
        dest: 'src/tmp/countries.geo.min.wrap.js',
        options: {
          wrapper: ['var idmap_countries = ', ';\n']
        },
      },
      // script: {
      //   src: ['src/tmp/<%= pkg.name %>.copy.concat.<%= pkg.version %>.jsx'],
      //   dest: 'dist/<%= pkg.name %>.build.<%= pkg.version %>.jsx',
      //   options: {
      //     wrapper: ['(function(thisObj) {', '})(this);\n']
      //   },
      // }
    },
    /**
     * concat all the pieces into whan file ready for wrapping
     * @type {Object}
     */
    concat: {
      dist: {
        options: {
          stripBanners: false,
          banner: '\n/*! <%= pkg.name %>.jsx - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
          nonull: true,
          separator: '\n',
        },

        src: [
          "src/idmap/license.jsx",
          "src/idmap/globals.jsx",
          "src/lib/extendscript.prototypes/dist/extendscript.prototypes.0.0.1.jsx",
          "src/lib/extendscript.geo/dist/extendscript.geo.id.jsx",
          "src/lib/extendscript.csv/dist/extendscript.csv.jsx",
          "src/tmp/countries.geo.min.wrap.js",
          "src/idmap/document.jsx",
          "src/idmap/polygon.jsx",
          "src/idmap/styling.jsx",
          "src/idmap/geo.jsx",
          "src/idmap/main.jsx"
        ],

        dest: "src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx",
      }
    },

    watch: {
      files: ['src/idmap/*.jsx', 'src/idmap/*.js', "src/lib/extendscript.geo/src/*", "src/lib/extendscript.csv/src/*"],
      tasks: ['copy:geo-json', 'wrap:geo-json', 'concat:dist', 'copy:script']
    }

  });
  // These plugins provide necessary tasks.
  // Default task.
  //
  // // This is required if you use any options.
  grunt.task.run('notify_hooks');

  grunt.registerTask('build-dist', ['copy:geo-json', 'wrap:geo-json', 'concat:dist', 'copy:script']);
  // Default task.
  grunt.registerTask('default', ['watch']);
};