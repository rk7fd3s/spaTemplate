'use strict';

define(['app'], function(app) {
  app.service('authService', function($q, authApiService) {

    // ログインフォームの入力チェック
    this.validate = function(login) {
      var delay = $q.defer();

      if (login == null || typeof login === 'undefined') {
        delay.reject({
          code: '9000',
          message: 'not enagh data to login'
        });
      } else if (login.username == null || typeof login.username === 'undefined' || login.username === '') {
        delay.reject({
          code: '9001',
          message: 'need username to login'
        });
      } else if (login.password == null || typeof login.password === 'undefined' || login.password === '') {
        delay.reject({
          code: '9002',
          message: 'need password to login'
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
