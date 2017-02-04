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

    }

    $scope.login = infoLogin;

    console.log($scope.login);

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
                console.log(cookieLogin);
                $cookies.putObject('c_login', cookieLogin);
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
