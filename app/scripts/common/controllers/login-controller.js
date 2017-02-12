'use strict';

define([
  'app',
], function(app){
  'use strict';
  app.controller('loginController', function($scope, $state, $cookies, alertService, authService) {

    var infoLogin = {
      username: '',
      password: '',
      rm: false
    };

    try {
      var cLogin = JSON.parse($cookies.get('c_login'));
      angular.extend(infoLogin, cLogin);
    } catch(e) {
      // なにもしない
    }

    $scope.login = infoLogin;

    // ログインボタン押下イベント
    $scope.loginAction = function() {
      var login = $scope.login;

      authService.validate(login).then(
        function(valid_login) {
          authService.authenticate(valid_login).then(
            function(resModel) {
              if (valid_login.rm) {
                var cookieLogin = {
                  username: valid_login.username,
                  rm: valid_login.rm
                };
                // 30日後のdateオブジェクト
                var expire = new Date((new Date()).getTime() + 60 * 60 * 24 * 30 * 1000);
                $cookies.putObject('c_login', cookieLogin, {expires: expire});
              }
              $state.go('root.top');
            }
          );
        },
        function(error) {
          alertService.addAlert('warning', error.message, 5000);
        }
      );
    };
  });
});
