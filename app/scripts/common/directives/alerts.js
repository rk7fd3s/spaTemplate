'use strict';

define([
    'app'
], function (app) {
  app.directive('alerts', function(alertService){
    return {
      restrict : 'E',
      templateUrl : '/views/common/directives/alert.html',
      replace : true,
      link : function(scope){
        scope.alerts = alertService.getList();

        scope.close = function(key){
          alertService.delAlert(key);
        };
      }
    };
  });
});
