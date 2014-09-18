module.exports = function(grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-concat',
    'grunt-contrib-jasmine',
    'grunt-contrib-watch',
    'grunt-contrib-uglify',
  ];

 var config = {};

  // *********************************************
  // jshint
  config.jshint = {};
  config.jshint.all = ['src/**/*.js'];

  // *********************************************
  // jasmine
  config.jasmine = {};
  config.jasmine.pivotal = {
    src: [
        'src/core/x.js',
        'src/core/coreMethods/*.js',
        'src/core/parsers/*.js',
        'src/core/*.js',
        'src/methods/*.js'
    ],
    options: {
      specs: 'tests/**/*Test.js'
    }
  }


  // *********************************************
  // concat
  config.concat = {
    dist: {
      src: [
        'src/core/x.js',
        'src/core/coreMethods/*.js',
        'src/core/parsers/*.js',
        'src/core/Utils.js',
        'src/core/utils/*.js',
        'src/core/*.js',
        'src/methods/*.js'
      ],
      dest: 'dist/x.js'
    }
  }


  // *********************************************
  // uglify
  config.uglify = {};
  config.uglify.all = {
    files: {
      'dist/x.min.js': [ 'dist/x.js' ]
    },
    options: {
      preserveComments: false,
      sourceMap: 'dist/x.min.map',
      sourceMappingURL: 'x.min.map',
      report: 'min',
      beautify: {
        ascii_only: true
      },
      compress: {
        hoist_funs: false,
        loops: false,
        unused: false
      }
    }
  }


  // *********************************************
  // watch
  config.watch = {};
  config.watch.scripts = {
    files: ['src/**/*.js','src/*.js'],
    tasks: ['jshint','concat','uglify'],
    options: {
      spawn: false,
    }
  }

  grunt.initConfig(config);

  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('hint', ['jshint']);

  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('default', ['jshint', 'concat','watch', 'uglify']);

};