"use strict";

define(["app"], function(app) {
  app.run(function($httpBackend, $cookies, $timeout) {
    // /mockで始まるアクセス以外をスルー
    $httpBackend.whenGET(/^(?!\/mock)/).passThrough();

    const success = {
      code: 1000,
      message: 'Login success',
      resultSet: {}
    };

    const error = {
      code: 4000,
      message: 'Bad Request.',
      resultSet: {}
    };

    // ログイン要求
    $httpBackend.whenPOST('/mock/login').respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      const request = JSON.parse(data);

      if ((!angular.isString(request.un) || request.un === '') ||
        (!angular.isString(request.pw) || request.pw === '') ||
        (!angular.isNumber(request.rm) || request.rm > 1 || request.rm < 0)
      ) {
        return [400, error, {}];
      }

      var response = [];
      if (request.un === 'Admin' && request.pw === 'admin') {
        success.resultSet.token = 'ADMIN_LOGIN_TOKEN';

        // 1日期限でcookieの登録
        $cookies.put('XSRF-TOKEN', success.resultSet.token, {
          expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
        });

        success.resultSet = {
          roll: 'admin'
        };

        response = [200, success, {}];
      } else if (request.un === 'User' && request.pw === 'user') {
        success.resultSet.token = 'USER_LOGIN_TOKEN';

        // 1日期限でcookieの登録
        $cookies.put('XSRF-TOKEN', success.resultSet.token, {
          expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
        });

        success.resultSet = {
          roll: 'operator'
        };

        response = [200, success, {}];
      } else {
        error.message = 'Internal Server Error'
        response = [500, error, {}];
      }

        return response;
      // $timeout(function() {
      //   return response;
      // }, 1000);
    });
  });
});
