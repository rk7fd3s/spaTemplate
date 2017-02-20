'use strict';

define([
  'app',
], function(app){
  'use strict';
  app.controller('sandboxConfigJsonCtrl', function($scope, configEnv, configCommon) {
    $scope.sandbox.subTitle = 'configJson';

    console.log(configEnv);
    console.log(configCommon);
    $scope.configEnv = configEnv;
    $scope.configCommon = configCommon;
  });
});
