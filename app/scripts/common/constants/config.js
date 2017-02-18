/**
 * 共通で使用する定数定義。
 *
 * 完全な定数はConstatnsConfigに
 * 環境などで異なる半定数はに
 */

define([
    'app'
], function(app){
  'use strict';
  app.constant('ConstatnsConfig', {
    'SITE_NAME': '- SPA template -',                    // サイト名
    'APP_VERSION' : '0.0.0',                            // バージョン
    'ENV_NAME': ['product', 'stage', 'dev', 'local'],   // 環境名

    'HOST_NAME' : {
      local: 'local.example.com',
      dev: 'dev.example.com',
      stage: 'stage.example.com',
      product: 'product.example.com',
    },

    'API_BASE_URL': {
      // local: '/api',
      local: '/mock',
      dev: 'dev.example.com:9000/api',
      stage: 'stage.example.com:8080/api',
      product: 'product.example.com:8080/api',
    },

    'API_REQUEST_ACTION': {
      defaultGet: {method: 'GET', timeout: 10000},
      defaultPost: {method: 'POST', timeout: 10000},
      defaultJsonp: {method: 'JSONP', timeout: 10000, params: {callback: 'JSON_CALLBACK'}}
    },

  }).service('VariableConfig', function($location, ConstatnsConfig){
    // 現在の環境名を返却
    function getEnvName() {
      const hostNm = $location.host();
      var envName = 'local';

      // 各環境を判別し、ConstatnsConfig.ENV_NAMEで定義した環境名をreturnさせる
      angular.forEach([0,1,2,3], function(i) {
        const val = ConstatnsConfig.ENV_NAME[i];
        if (hostNm.indexOf(ConstatnsConfig.HOST_NAME[val]) == 0) {
          envName = val;
        }
      });

      return envName;
    }

    const envName = getEnvName();
    const apiBaseUrl = (ConstatnsConfig.API_BASE_URL[envName].indexOf('/') == 0) ? ConstatnsConfig.API_BASE_URL[envName] : '//' + ConstatnsConfig.API_BASE_URL[envName];

    return {
      envName,
      path: {
        auth: {
          login: apiBaseUrl + '/login'
        }
      }
    }
  });
});
