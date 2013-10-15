/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-clean');


  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: ['grunt.js', 'src/js/hawksworx.js']
    },
    clean: {
      js: "_site/js/",
      css: "_site/css/"
    },
    concat: {
      css: {
        src: ['src/css/*.css'],
        dest: '_site/css/styles.css'
      }
    },
    min: {
      dist: {
        src: ['src/js/hawksworx.js'],
        dest: '_site/js/hawksworx.min.js'
      },
      dev: {
        src: ['src/js/hawksworx.js'],
        dest: '_site/js/hawksworx.min.js'
      }
    },
    watch: {
      jekyll: {
        files: ['src'],
        tasks: ['jekyll:dev']
      }
    },
    jekyll: {
      dev: {
        src: 'src',
        dest: '_site',
        url: 'localhost',
        permalink: '/blog/:title',
        production: false,
        pygments: true,
        tag_dir: '/blog/tag'
      },
      prod: {
        src: 'src',
        dest: '_site',
        url: 'hawksworx.com',
        permalink: '/blog/:title',
        production: false,
        pygments: true,
        tag_dir: '/blog/tag'
      }
    },
    server: {
        port: 8000,
        base: '_site'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  grunt.registerTask('default', 'jekyll:dev');
  grunt.registerTask('prod', 'jekyll:prod concat min');
  grunt.registerTask('dev', 'jekyll:dev concat min:dev serve');
  grunt.registerTask('serve', 'server watch');


  // build : build a production version of the site ready to deploy
  // serve : build and then serve the site


};
