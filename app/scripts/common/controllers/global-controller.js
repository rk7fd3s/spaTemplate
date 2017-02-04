'use strict';

define([
  'app',
], function(app){
  'use strict';
  app.controller('globalController', function($scope, ConstatnsConfig, VariableConfig) {
    $scope.ConstatnsConfig = ConstatnsConfig;
    $scope.VariableConfig = VariableConfig;
  });
});
