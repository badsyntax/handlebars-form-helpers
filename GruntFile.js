module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/**/*.js'],
        dest: 'dist/handlebars_helpers.min.js'
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
          console: false,
          document: false
        }
      }
    },
    jasmine: {
      src: ['src/Helpers.js'],
      options: {
        specs: 'spec/**/*.Spec.js',
        vendor: ['components/handlebars.js/dist/handlebars.js']
      }
    }
  });

  // Load the tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Register custom tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['lint', 'jasmine']);
  grunt.registerTask('build', ['test', 'uglify']);
  grunt.registerTask('default', ['build']);
};