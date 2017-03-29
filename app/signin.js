'use strict';

const app = angular.module('app', ['ngResource', 'ngCookies', 'ngMessages']);

/**
 * ログインAPIを投げて、認証を行うサービス
*/
app.service('authApiService', ['$resource', '$q', function($resource, $q) {

  var resources = {
    authenticate: $resource('/api/authorize', {}, {check : {method: 'POST', timeout: 10000}})
  };

  this.authenticate = function(requestModel) {
    var deferred = $q.defer();

    resources.authenticate.check(requestModel, function(resModel) {
      deferred.resolve(resModel);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };
}]);


app.service('authService', ['$q', 'authApiService', function($q, authApiService) {
  // ログインフォームの入力チェック
  this.validate = function(signin) {
    var delay = $q.defer();

    if (signin === null || typeof signin === 'undefined') {
      delay.reject({
        code: '9000',
        args: ['signin']
      });
    } else if (signin.username === null || typeof signin.username === 'undefined' || signin.username === '') {
      delay.reject({
        code: '9001',
        args: ['username', 'signin']
      });
    } else if (signin.password === null || typeof signin.password === 'undefined' || signin.password === '') {
      delay.reject({
        code: '9001',
        args: ['password', 'signin']
      });
    } else {
      delay.resolve(signin);
    }

    return delay.promise;
  };

  // ログイン
  this.authenticate = function(valid_signin) {
    // angularとapiのmodel差異をココで埋める
    var reqModel = {
      un: valid_signin.username,
      pw: valid_signin.password,
      rm: (valid_signin.rm) ? 1 : 0
    };

    // APIサービスに処理引渡
    return authApiService.authenticate(reqModel).then(
      function(resModel) {
        return resModel;
      },
      function(error) {
        return $q.reject(error);
      }
    );
  };
}]);

app.controller('signinController', ['$scope', '$cookies', 'authService', function($scope, $cookies, authService) {
  const infoSignin = {
    username: '',
    password: '',
    rm: false
  };

  try {
    // cookieに値があればそれを使用
    const cSignin = JSON.parse($cookies.get('c_signin'));
    angular.extend(infoSignin, cSignin);
  } catch (e) {
    // なにもしない
  }

  $scope.signin = infoSignin;


  $scope.showMessage = function(frmSignIn) {
    if (frmSignIn.$pristine && !frmSignIn.$submitted) {
      // submit前の値変更無したはすべてfalseを返す
      return false;
    }

    // どこかにエラー
    if (frmSignIn.$invalid) {
      if (frmSignIn.un.$touched && frmSignIn.un.$invalid) {
        return true;
      }
      if (frmSignIn.pw.$touched && frmSignIn.pw.$invalid) {
        return true;
      }
    }
    return false;
  };

  // ログインボタン押下イベント
  $scope.SigninAction = function() {
    const signin = $scope.signin;

    authService.validate(signin).then(
      // 入力チェックOK
      function(valid_signin) {
        authService.authenticate(valid_signin).then(
          // 認証OK
          function(resModel) {
            // cookie保存
            if (valid_signin.rm) {
              const cookieSignin = {
                username: valid_signin.username,
                rm: valid_signin.rm
              };
              // 30日期限でcookieの登録
              $cookies.putObject('c_signin', cookieSignin, {
                expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 30 * 1000)
              });
            }

            // topへ遷移
            location.href = '/';
          },
          function(errorModel) {
            const error = errorModel.data;
            console.log(error);
            // alertService.addAlert('danger', messageService.getMessage(error.code, error.args) || error.message, 10000);
          }
        );
      },
      // 入力チェックNG
      function(error) {
        console.log(error);
        // alertService.addAlert('warning', messageService.getMessage(error.code, error.args) || error.message, 5000);
      }
    );
  };
}]);
