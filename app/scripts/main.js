'use strict';

window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    baseUrl:'/scripts',

    paths:{
        'angular': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min','../libs/angular/angular.min'],
        'angular-animate': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min','../libs/angular-animate/angular-animate.min'],
        'angular-cookies': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-cookies.min','../libs/angular-cookies/angular-cookies.min'],
        'angular-resource': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-resource.min','../libs/angular-resource/angular-resource.min'],
        'angular-sanitize': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-sanitize.min','../libs/angular-sanitize/angular-sanitize.min'],
        'angular-touch': ['//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-touch.min','../libs/angular-touch/angular-touch.min'],
        'angular-loading-bar': '../libs/angular-loading-bar/loading-bar',
        'angular-translate': '../libs/angular-translate/angular-translate.min',
        'angular-translate-loader-static-files': '../libs/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'angular-translate-storage-cookie': '../libs/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
        'angular-translate-storage-local': '../libs/angular-translate-storage-local/angular-translate-storage-local.min',
        'angular-mocks': '../libs/angular-mocks/angular-mocks',
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min','../libs/jquery/jquery.min'],
        'bootstrap': ['//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min','../libs/bootstrap/js/bootstrap.min'],
        'ui.router': '../libs/angular-ui-router/angular-ui-router',
        'ui.bootstrap': '../libs/angular-bootstrap/ui-bootstrap',
        'ui.bootstrap.tpls': '../libs/angular-bootstrap/ui-bootstrap-tpls',
        'ngstorage': '../libs/ngstorage/ngStorage',
        'sb-admin-2': '../libs/startbootstrap-sb-admin-2/sb-admin-2',
        'metisMenu':'../libs/metisMenu/metisMenu'
    },
    shim:{
        'angular':{deps:['jquery'],exports:'angular'},
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-animate': ['angular'],
        'angular-touch': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular-translate'],
        'angular-translate-storage-cookie': ['angular-translate'],
        'angular-translate-storage-local': ['angular-translate-storage-cookie'],
        'angular-mocks': ['angular'],
        'bootstrap': ['angular'],
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular','bootstrap'],
        'ui.bootstrap.tpls': ['angular'],
        'angular-loading-bar': ['angular'],
        'app':['angular'],
        'ngstorage':['angular'],
        'sb-admin-2':['angular','bootstrap','metisMenu'],
        'metisMenu':['jquery']
    },
    packages: []
});

require([
    'angular',
    'app',
    'angular-animate',
    'angular-cookies',
    'angular-resource',
    'angular-sanitize',
    'angular-touch',
    'angular-loading-bar',
    'angular-translate',
    'angular-translate-loader-static-files',
    'angular-translate-storage-cookie',
    'angular-translate-storage-local',
    'angular-mocks',
    'jquery',
    'bootstrap',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'ngstorage',

    //////////app script START//////////
    'scripts',
    'metisMenu',
    'sb-admin-2',
    'templates'
    //////////app script END//////////

],function(angular, app){
    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });
});
