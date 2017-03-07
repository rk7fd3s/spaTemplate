'use strict';

define(['app'], function(app) {
  app.service('authApiService', function($resource, $q, configCommon, configEnv) {

    var resources = {
      authenticate: $resource(configEnv.API_BASE_URL + configCommon.API_SETTING.PATH.AUTH.LOGIN, {}, configCommon.API_SETTING.REQUEST_ACTION)
    };

    // 一覧画面を取得
    this.authenticate = function(requestModel) {
      var deferred = $q.defer();

      resources.authenticate.defaultPost(requestModel, function(resModel) {
        deferred.resolve(resModel);
      }, function(error, status) {
        deferred.reject(error);
      });

      return deferred.promise;
    };
  });
});
