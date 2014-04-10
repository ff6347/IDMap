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
        src: "src/idmaps/main.jsx",
        dest: "src/tmp/<%= pkg.name %>.copy.<%= pkg.version %>.jsx",
      }

    },

    /**
     * wrap into anonymous function
     */
    // wrap: {
    //   script: {
    //     src: ['src/tmp/<%= pkg.name %>.copy.concat.<%= pkg.version %>.jsx'],
    //     dest: 'dist/<%= pkg.name %>.build.<%= pkg.version %>.jsx',
    //     options: {
    //       wrapper: ['(function(thisObj) {', '})(this);\n']
    //     },
    //   }
    // },
    /**
     * concat all the pieces into whan file ready for wrapping
     * @type {Object}
     */
    concat: {
      dist: {
        options: {
          stripBanners: true,
          banner: '\n/*! <%= pkg.name %>.jsx - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
          nonull: true,
          separator: '\n',
        },

        src: [
          "src/lib/extendscript.geo/dist/extendscript.geo.id.jsx",
          "src/lib/extendscript.csv/dist/extendscript.csv.jsx",
          "src/tmp/<%= pkg.name %>.copy.<%= pkg.version %>.jsx"
        ],

        dest: "src/tmp/<%= pkg.name %>.copy.concat.<%= pkg.version %>.jsx",
      }
    },

    watch: {
      files: ['src/idmaps/*.jsx', 'src/idmaps/*.js', "src/lib/extendscript.geo/src/*", "src/lib/extendscript.csv/src/*"],
      tasks: ['copy:script', 'concat:dist', 'wrap:script']
    }

  });
  // These plugins provide necessary tasks.
  // Default task.
  //
  // // This is required if you use any options.
  grunt.task.run('notify_hooks');

  grunt.registerTask('build-dist', ['copy:script', 'concat:dist']);
  // Default task.
  grunt.registerTask('default', ['watch']);
};