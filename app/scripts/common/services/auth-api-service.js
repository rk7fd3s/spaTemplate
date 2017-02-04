'use strict';

define(['app'], function(app) {
  app.service('authApiService', function($resource, $q, ConstatnsConfig, VariableConfig) {

    var resources = {
      authenticate: $resource(VariableConfig.path.auth.login, {}, ConstatnsConfig.API_REQUEST_ACTION)
    };

    // 一覧画面を取得
    this.authenticate = function(requestModel) {
      var deferred = $q.defer();

      // TODO 仮
      if (requestModel.un === 'admin') {
        deferred.resolve({
          code: '0000',
          status: 'success',
          userInfo: {
            xxx: 'xxxx'
          }
        });
      } else if (requestModel.un === 'user') {
        deferred.resolve({
          code: '0000',
          status: 'success',
          userInfo: {
            xxx: 'xxxx'
          }
        });
      } else {
        deferred.reject();
      }

      // resources.authenticate.defaultPost(requestModel,function (resModel){
      //   deferred.resolve(resModel) ;
      // }, function (error, status){
      //   console.error(error, status);
      //   deferred.reject(error.message);
      // });

      return deferred.promise;
    };
  });
});
