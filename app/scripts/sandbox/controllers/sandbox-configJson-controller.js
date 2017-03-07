'use strict';

define([
  'app',
], function(app){
  'use strict';
  app.controller('sandboxConfigJsonCtrl', function($scope, configEnv, configCommon, messageService) {
    $scope.sandbox.subTitle = 'configJson';

    $scope.configEnv = configEnv;
    $scope.configCommon = configCommon;
    
    // messageServiceを使ったメッセージ文言の使用例
    $scope.message = {
      m9000: messageService.getMessage('9000', 'login'),
      m9001: messageService.getMessage('9001', "the world's best efforts", "become the world's best")
    };

  });
});
