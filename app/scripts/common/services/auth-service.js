'use strict';

define(['app'], function(app) {
  app.service('authService', function($q, authApiService) {

    // ログインフォームの入力チェック
    this.validate = function(login) {
      var delay = $q.defer();

      if (login === null || typeof login === 'undefined') {
        delay.reject({
          code: '9000',
          args: ['login']
        });
      } else if (login.username === null || typeof login.username === 'undefined' || login.username === '') {
        delay.reject({
          code: '9001',
          args: ['username', 'login']
        });
      } else if (login.password === null || typeof login.password === 'undefined' || login.password === '') {
        delay.reject({
          code: '9001',
          args: ['password', 'login']
        });
      } else {
        delay.resolve(login);
      }

      return delay.promise;
    };

    // ログイン
    this.authenticate = function(valid_login) {
      // angularとapiのmodel差異をココで埋める
      var reqModel = {
        un: valid_login.username,
        pw: valid_login.password,
        rm: (valid_login.rm) ? 1 : 0
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
  });
});
