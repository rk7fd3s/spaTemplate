'use strict';

define(['app'], function(app) {
  app.controller('loginController', function($scope, $state, $cookies, alertService, authService, messageService) {

    const infoLogin = {
      username: '',
      password: '',
      rm: false
    };

    try {
      const cLogin = JSON.parse($cookies.get('c_login'));
      angular.extend(infoLogin, cLogin);
    } catch (e) {
      // なにもしない
    }

    $scope.login = infoLogin;

    // ログインボタン押下イベント
    $scope.loginAction = function() {
      const login = $scope.login;

      authService.validate(login).then(
        // 入力チェックOK
        function(valid_login) {
          authService.authenticate(valid_login).then(
            // 認証OK
            function(resModel) {
              // cookie保存
              if (valid_login.rm) {
                const cookieLogin = {
                  username: valid_login.username,
                  rm: valid_login.rm
                };
                // 30日期限でcookieの登録
                $cookies.putObject('c_login', cookieLogin, {
                  expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 30 * 1000)
                });
              }

              // topへ遷移
              $state.go('root.top');
            },
            function(errorModel) {
              const error = errorModel.data;
              alertService.addAlert('danger', messageService.getMessage(error.code, error.args) || error.message, 10000);
            }
          );
        },
        // 入力チェックNG
        function(error) {
          alertService.addAlert('warning', messageService.getMessage(error.code, error.args) || error.message, 5000);
        }
      );
    };
  });
});
