'use strict';

module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
  config: {
      // Configurable paths
      app: 'app',
      dist: 'dist/app'
  },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      //files: ['dist']
	  dist: {
	      files: [{
	          dot: true,
	          src: [
	              '.tmp',
	              '<%= config.dist %>/*',
	              '!<%= config.dist %>/.git*'
	          ]
	      }]
	  }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      /*dist: {
        src: ['bower_components/requirejs/require.js', '<%= concat.dist.dest %>'],
        dest: 'dist/require.js'
      }*/
      dist: {}
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      /*dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/require.min.js'
      }*/
      dist: {}
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      app: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['app/**/*.js']
      },
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    requirejs: {
      /*compile: {
        options: {
          name: 'config',
          mainConfigFile: 'app/js/config.js',
          out: '<%= concat.dist.dest %>',
          optimize: 'none'
        }
      },*/
      dist: {
	      options: {
	          baseUrl        : '<%= config.app %>/scripts/',
	          name           : 'main',
	          mainConfigFile : '<%= config.app %>/scripts/config.js',
	          out            : '.tmp/concat/scripts/config.js'
	      }
      }
    },
    connect: {
      development: {
        options: {
          keepalive: true,
        }
      },
      production: {
        options: {
          keepalive: true,
          port: 8000,
          middleware: function(connect, options) {
            return [
              // rewrite requirejs to the compiled version
              function(req, res, next) {
                if (req.url === '/bower_components/requirejs/require.js') {
                  req.url = '/dist/require.min.js';
                }
                next();
              },
              connect.static(options.base)

            ];
          }
        }
      }
    },
    bower: {
      target: {
        rjsConfig: 'app/scripts/config.js'
      }
    },
    useminPrepare: {
        options: {
            dest: '<%= config.dist %>'
        },
        html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        options: {
            assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
        },
        html: ['<%= config.dist %>/{,*/}*.html'],
        css: ['<%= config.dist %>/styles/{,*/}*.css']
    },
    copy: {
        dist: {
            files: [
                {
	                expand: true,
	                dot: true,
	                cwd: '<%= config.app %>',
	                dest: '<%= config.dist %>',
	                src: [
	                    '*.{ico,png,txt}',

	                    'images/{,*/}*.png',
	                    '{,*/}*.html',
	                    'styles/{,*/}*.*'
	                ]
	            },
	            {
	                expand: true,
	                dot: true,
	                cwd: '<%= config.app %>/..',
	                dest: '<%= config.dist %>',
	                src: [
	                    'config.xml'
	                ]
	            }
            ]
        },
        styles: {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>/styles',
            dest: '.tmp/styles/',
            src: '{,*/}*.css'
        }
    }
  });

  // These plugins provide necessary tasks.
 // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-usemin');

  // Default task.
  //grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'requirejs', 'concat', 'uglify', 'usemin']);
  grunt.registerTask('default', ['clean:dist', 'jshint', 'qunit', 'useminPrepare', 'concat', 'requirejs:dist', 'uglify', 'copy:dist', 'usemin']);
  grunt.registerTask('preview', ['connect:development']);
  grunt.registerTask('preview-live', ['default', 'connect:production']);
};
