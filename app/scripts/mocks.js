"use strict";

define(["app"], function(app) {
  app.run(function($httpBackend, $cookies, $timeout) {
    // /mockで始まるアクセス以外をスルー
    $httpBackend.whenGET(/^(?!\/mock)/).passThrough();

    const success = {
      code: 1000,
      resultSet: {}
    };

    const error = {
      code: 4000,
      resultSet: {}
    };

    // ログイン要求
    $httpBackend.whenPOST('/mock/login').respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      const request = JSON.parse(data);

      if ((!angular.isString(request.un) || request.un === '') ||
        (!angular.isString(request.pw) || request.pw === '') ||
        (!(request.rm + '').match(/^[0|1]$/))
      ) {
        error.code = 4403;
        error.message = 'Forbidden';
        return [403, error, {}];
      }

      var response = [];
      if (request.un === 'Admin' && request.pw === 'admin') {
        // 1日期限でcookieの登録
        $cookies.put('XSRF-TOKEN', success.resultSet.token, {
          expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
        });

        success.resultSet = {
          roll: 'admin',
          token: 'ADMIN_LOGIN_TOKEN'
        };

        response = [200, success, {}];
      } else if (request.un === 'User' && request.pw === 'user') {
        // 1日期限でcookieの登録
        $cookies.put('XSRF-TOKEN', success.resultSet.token, {
          expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
        });

        success.resultSet = {
          roll: 'operator',
          token: 'USER_LOGIN_TOKEN'
        };

        response = [200, success, {}];
      } else if (request.un === '400') {
        error.code = '4400';
        error.message = 'Bad Request';
        response = [400, error, {}];
      } else {
        error.code = '4500';
        error.message = 'Internal Server Error';
        response = [500, error, {}];
      }

      return response;
    });
  });
});
