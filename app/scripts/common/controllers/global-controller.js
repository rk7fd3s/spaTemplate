'use strict';

define(['app'], function(app){
  app.controller('globalController', function($scope, configCommon, configEnv) {
    $scope.configCommon = configCommon;
    $scope.configEnv = configEnv;
  });
});
