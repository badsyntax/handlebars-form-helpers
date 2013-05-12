module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
          'src/**/*.js'
        ],
        dest: 'dist/handlebars_helpers.js'
      }
    },
    jshint: {
      files: [
        '*.js',
        'src/**/*.js',
        'spec/**/*.js'
      ],
      options: {
        globals: {
          console: true,
          document: true
        }
      }
    },
    jasmine: {
      helpers: {
        src: [
          'components/handlebars.js/handlebars.js',
          'src/Helpers.js'
        ],
        options: {
          specs: 'spec/**/*.Spec.js'
        }
      }
    }
  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Custom tasks
  grunt.registerTask('test', ['jshint', 'jasmine']);

  // Default tasks
  grunt.registerTask('default', [
    'test',
    'uglify'
  ]);
};