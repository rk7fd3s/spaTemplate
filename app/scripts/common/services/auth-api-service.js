'use strict';

define(['app'], function(app) {
  app.service('authApiService', function($resource, $q, ConstatnsConfig, VariableConfig) {

    var resources = {
      authenticate: $resource(VariableConfig.path.auth.login, {}, ConstatnsConfig.API_REQUEST_ACTION)
    };

    // 一覧画面を取得
    this.authenticate = function(requestModel) {
      var deferred = $q.defer();

      resources.authenticate.defaultPost(requestModel, function(resModel) {
        deferred.resolve(resModel);
      }, function(error, status) {
        deferred.reject(error.message);
      });

      return deferred.promise;
    };
  });
});
