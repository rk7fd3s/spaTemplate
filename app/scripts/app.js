'use strict';

define([
  'angular'
], function(angular) {

  var app = angular.module('app', [
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMockE2E',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'angular-loading-bar',
    'pascalprecht.translate',
  ]);

  app.config(function($stateProvider) {
    $stateProvider.state('root', {
      url: '',
      templateUrl: '/views/common/frame/frame.html'
    }).state('root.top', {
      url: '/',
      // controller: function(alertService) {angular.element('.jumbotron').on('click', function(e){console.log(e);alertService.addAlert('danger', 'some msgs.', 0);});},
      templateUrl: '/views/common/top.html'
    });

    // ログイン周り
    $stateProvider.state('login', {
      url: '/login',
      controller: 'loginController',
      templateUrl: '/views/common/login.html'
    }).state('logout', {
      url: '/logout',
      controller: function($state) {
        $state.go('login')
      }
    });

    // ユーザ情報周り
    $stateProvider.state('root.user', {
      abstract: true,
      url: '/user',
      templateUrl: '/views/common/main.html'
    }).state('root.user.profile', {
      url: '/profile',
      templateUrl: '/views/user/profile.html'
    });

    // ブランクページ
    $stateProvider.state('root.blank', {
      url: '/blank',
      templateUrl: '/views/common/blank.html'
    });

    // サンドボックス
    $stateProvider.state('root.sandbox', {
      abstract: true,
      url: '/sandbox',
      controller: 'sandboxCtrl as sandbox',
      templateUrl: '/views/sandbox/main.html'
    }).state('root.sandbox.ngModel', {
      url: '/ngModel',
      templateUrl: '/views/sandbox/ngModel.html'
    }).state('root.sandbox.ngRepeat', {
      url: '/ngRepeat',
      controller: 'sandboxNgRepeatCtrl',
      templateUrl: '/views/sandbox/ngRepeat.html'
    });

    // 階層メニューのサンプル
    $stateProvider.state('root.menu', {
      abstract: true,
      url: '/menu',
      templateUrl: '/views/common/empty.html'
    }).state('root.menu.sub1', {
      url: '/sub1',
      template: '<h1>sub1</h1>'
    }).state('root.menu.sub2', {
      abstract: true,
      url: '/sub2',
      templateUrl: '/views/common/empty.html'
    }).state('root.menu.sub2.sub1', {
      url: '/sub1',
      template: '<h1>sub2_sub1</h1>'
    }).state('root.menu.sub2.sub2', {
      url: '/sub2',
      template: '<h1>sub2_sub2</h1>'
    }).state('root.menu.sub2.sub3', {
      url: '/sub3',
      template: '<h1>sub2_sub3</h1>'
    }).state('root.menu.sub3', {
      url: '/sub3',
      template: '<h1>sub3</h1>'
    });

    $stateProvider.state('404client', {
      url: '*path',
      templateUrl: '/views/common/404.html'
    });

  }).config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }).config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    // $urlRouterProvider.otherwise('/');
  });

  return app;
});
