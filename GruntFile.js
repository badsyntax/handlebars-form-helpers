module.exports = function(grunt) {

  var banner = '/**\n' +
    ' * handlebars.form-helpers.js - V<%= pkg.version %> - build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %>\n' +
    ' * https://github.com/badsyntax/handlebars-form-helpers\n' +
    ' * Copyright (c) 2013 Richard Willis; Licensed MIT\n' +
    ' */\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: ['src/**/*.js'],
        dest: 'dist/handlebars.form-helpers.min.js'
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
      browserGlobal: {
        src: ['src/handlebars.form-helpers.js'],
        options: {
          specs: 'spec/**/*.spec.js',
          vendor: ['components/handlebars.js/dist/handlebars.js']
        }
      },
      browserAMD: {
        src: ['src/handlebars.form-helpers.js'],
        options: {
          specs: 'spec/**/*.spec.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: '',
              paths: {
                handlebars: 'components/handlebars.js/dist/handlebars'
              },
              shim: {
                handlebars: {
                  exports: 'Handlebars'
                }
              }
            }
          }
        }
      }
    },
    jasmine_node: {
      specNameMatcher: 'spec',
      projectRoot: 'spec/'
    }
  });

  // Load the tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Register custom tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['lint', 'jasmine', 'jasmine_node']);
  grunt.registerTask('build', ['test', 'uglify']);
  grunt.registerTask('default', ['build']);
};