'use strict';

module.exports = function (grunt) {

  //grunt task 実行時間表示
  require('time-grunt')(grunt);

  //plugin自動読み込み
  require('jit-grunt')(grunt,{
    bower:'grunt-bower-task',
    ngtemplates: 'grunt-angular-templates',
    configureProxies:'grunt-connect-proxy',
    ngconstant: 'grunt-ng-constant',
  });

  var serveStatic = require('serve-static');
  var autoPrefixer = require('autoprefixer');
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  var modRewrite = require('connect-modrewrite');

grunt.initConfig({
    //変更されるfileを監視し必要なタスクを実行
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install'],
      },
      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      stylus: {
        files: ['app/styles/**/*.{css,styl}'],
        tasks: ['stylemin'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      configJson: {
        files: ['config/**/*.json'],
        tasks: ['ngconstant:local'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        files: [
          'app/views/**/*.html',
          'app/*.html',
          'app/images/*.{png,jpg,jpeg,gif,webp,svg}',
          'app/fonts/**/*.*',
          // '.tmp/styles/*.css'
        ],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    ngconstant: {
      options: {
        name: 'app',
        dest: '.tmp/scripts/configJson.js',
        template: require('fs')
            .readFileSync(grunt.template.process('config')+'/templates_jsons.js')
            .toString()
      },
      local: {
        constants: {
          configEnv: grunt.file.readJSON('config/local.json'),
          configCommon: grunt.file.readJSON('config/common.json')
        }
      },
      dev: {
        constants: {
          configEnv: grunt.file.readJSON('config/dev.json'),
          configCommon: grunt.file.readJSON('config/common.json')
        }
      },
      stage: {
        constants: {
          configEnv: grunt.file.readJSON('config/stage.json'),
          configCommon: grunt.file.readJSON('config/common.json')
        }
      },
      product: {
        constants: {
          configEnv: grunt.file.readJSON('config/product.json'),
          configCommon: grunt.file.readJSON('config/common.json')
        }
      }
    },

    //web serverを立ち上げる
    connect: {
      options: {
        port: 9000,
        hostname: '*',
        livereload: 35729
      },
      proxies: [
        {
          context: '/api',
          host: 'localhost',
          port: '8080',
          https: false,
          xforward: false,
          headers: {
          }
        }
      ],
      livereload: {
        options: {
          // debug: true,
          open: false,
          middleware: function (connect) {
            return [
              proxySnippet,
              modRewrite([
                '^[^\\.]*$ /index.html [L]'
              ]),
              serveStatic('.tmp'),
              connect().use('/libs',serveStatic('./libs')),
              serveStatic('app')
            ];
          }
        }
      },
      dist: {
        options: {
          open: false,
          middleware: function (connect) {
            return [
              proxySnippet,
              modRewrite([
                '^[^\\.]*$ /index.html [L]'
              ]),
              serveStatic('dist')
            ];
          }
        }
      }
    },

    //jsの文法をチェックしヒント出力
    jshint: {
      options: {
        jshintrc: 'test/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          // 'Gruntfile.js',
          'app/*/scripts/**/*.js',
          'app/common.js'
        ]
      }
    },

    //grunt タスク実行時 作られたfileの削除
    clean: {
      sass_cache:{
        src: ['.sass-cache']
      },
      bower: {
        src: ['libs']
      },
      server: {
        src: ['.tmp']
      },
      dist: {
        files: [{
          dot: true,
          src: ['.tmp','dist']
        }]
      },
    },

    //bower_componentsからlibを作成(bower_components->./libs)
    bower: {
      install:{
        options: {
          targetDir: './libs',
          cleanTargetDir: true,
          layout: 'byComponent'
        }
      }
    },

    stylus: {
      compile: {
        files : [{
            expand : true,
            cwd : 'app/styles',
            src : ['**/*.styl', '*.styl'],
            dest : '.tmp/styles',
            ext : '.css'
        }],
      }
    },

    //sassをcssにconvert（src->.tmp）
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        assetCacheBuster: false,
        relativeAssets: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      all: {

      }
    },

    //cssバージョン合わせ（.tmp->.tmp）
    postcss: {
      options: {
        processors: [
          autoPrefixer({browsers: ['last 2 version']})
        ]
      },
      all: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    //cssのminify（.tmp->.tmp）
    //必要CSS全てを結合
    cssmin: {
      all: {
        files: {
          '.tmp/styles/style.css': [
            'app/styles/sb-admin/*.css',
            '.tmp/styles/**/*.css',
            '.tmp/styles/style.css'
          ]
        }
      },
    },

    //imageのminify（src->dist）
    imagemin:{
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/images'
        }]
      }
    },

    //imageのminify（src->dist）
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.svg',
          dest: 'dist/images'
        }]
      }
    },

    //htmlのminify（src->dist）
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: [
            '*.html'
          ],
          dest: 'dist'
        }]
      }
    },

    //viewsをjs化してtemplatesに結合
    ngtemplates:{
      template:{
        cwd: 'app',
        src: 'views/**/*.html',
        dest: '.tmp/scripts/templates.js',
        options:{
          prefix: '/',
          module: 'app',
          htmlmin: '<%= htmlmin.dist.options %>',
          bootstrap: function(module, script){
            return require('fs')
                .readFileSync(grunt.template.process('app')+'/scripts/templates.js')
                .toString()
                .replace(/\/\*grunt ngtemplates.*\*\//, '\n'+script.replace("'use strict';\n",""));
          }
        }
      }
    },

    //angularjsのminify問題に対応する。
    //.service('HogeService', function($scope)→.service('HogeService', ["$scope", function($scope)
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'scripts/**/*.js',
          dest: '.tmp'
        }]
      }
    },

    //jsonのminify（src->.tmp）
    minjson: {
      compile: {
        files: {
          '.tmp/i18n/locale-en.json' : 'app/i18n/locale-en.json',
          '.tmp/i18n/locale-ja.json' : 'app/i18n/locale-ja.json',
          '.tmp/i18n/locale-kr.json' : 'app/i18n/locale-kr.json'
        }
      }
    },

    //ファイルをコピー(src->dist, .tmp->dist)
    copy: {
      //static fileをコピー(src -> dist)
      static: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          src: ['robots.txt'],
          dest: 'dist'
        }]
      },
      //結合されたCSSをコピー(.tmp -> dist)
      style: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['styles/*.css'],
          dest: 'dist'
        }]
      },
      //libs結合されたCSSをコピー(./libs -> dist)
      script:{
        files: [{
          expand: true,
          cwd: '.',
          src: 'libs/**/*',
          dest: 'dist'
        }]
      },
      //minifyされたjsonをコピー(.tmp -> dist)
      json:{
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['i18n/*.json'],
          dest: 'dist'
        }]
      }
    },

    //jsを結合＆minify (.tmp->dist)
    requirejs:{
      app:{
        options: {
          baseUrl: ".tmp/scripts",
          name: 'app',
          include: [ 'main.js' ],
          paths: {
            'angular': 'empty:',
            'angular-animate':'empty:',
            'angular-cookies': 'empty:',
            'angular-resource': 'empty:',
            'angular-sanitize': 'empty:',
            'angular-touch': 'empty:',
            'ngstorage': 'empty:',
            'libs': 'empty:',
            'jquery': 'empty:',
            'angular-loading-bar': 'empty:',
            'bootstrap': 'empty:',
            'ui.router': 'empty:',
            'ui.bootstrap': 'empty:',
            'ui.bootstrap.tpls': 'empty:',
            'metisMenu': 'empty:',
            'sb-admin-2': 'empty:',
            'angular-translate': 'empty:',
            'angular-translate-loader-static-files': 'empty:',
            'angular-translate-storage-cookie': 'empty:',
            'angular-translate-storage-local': 'empty:',
            'angular-mocks': 'empty:'
          },
          optimize: 'uglify',
          out:'dist/scripts/main.js'
        }
      }
    },

    //asset fileを revision
    filerev: {
      dist: {
        src: [
          'dist/scripts/*.js',
          'dist/styles/*.css',
          'dist/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          'dist/fonts/**/*'
        ]
      }
    },

    //revision結果を各fileに反映
    filerev_replace: {
      options: {
        assets_root: 'dist'
      },
      compiled_assets: {
        src: [
          'dist/script/*.js',
          'dist/styles/**/*.css',
          'dist/*.html'
        ]
      }
    },

    //並列でタスクを実行
    //絡み合いが無いタスクを同時に実行
    //主にminfyを行う
    concurrent: {
      server: [
        'stylemin'
      ],
      dist: [
        'stylemin',
        'imagemin',
        'svgmin',
        'htmlmin',
        'scriptmin',
        'minjson'
      ]
    }
  });

  //css タスク
  grunt.registerTask('stylemin', [
    'stylus',
    'postcss',
    'cssmin',
    'copy:style'
  ]);

  //script タスク
  grunt.registerTask('scriptmin', [
    'ngAnnotate',
    'ngtemplates',
    'copy:script',
    'requirejs',
  ]);

  /////////////////// 以下 実行 タスク ///////////////////
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build','configureProxies', 'connect:dist:keepalive']);
    }
    var env = target || 'local';
    grunt.log.writeln('Set enviroment ' + env);
    grunt.task.run([
      'clean:server',
      'ngconstant:' + env,
      'bower:install',
      'concurrent:server',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('build', 'Compile', function (target) {
    var env = target || 'product';

    grunt.task.run([
      'clean:dist',
      'ngconstant:' + env,
      'bower:install',
      'concurrent:dist',
      'copy:static',
      'copy:json',//filerevが困難
      'filerev',
      'filerev_replace'
    ]);

  });

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
