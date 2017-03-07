'use strict';

define(['app'], function(app) {
  app.service('alertService', function($timeout) {
    var uid = 0;
    var list = {};

    /*
      type : 'success', 'info', 'warning', 'danger'
      msg : show message to browser
      time : auto close time
     */
    function Alert(type, msg, time) {
      return {
        type: type ? type : 'info',
        msg: msg ? msg : '',
        time: time ? time : 0
      };
    }

    this.getList = function() {
      return list;
    };

    // アラートを追加
    this.addAlert = function(type, msg, time) {
      var key = '' + uid++;
      if (angular.isString(msg) && msg !== '') {
        list[key] = new Alert(type, msg, time);

        if (list[key].time > 0) {
          $timeout(function() {
            delete list[key];
          }, list[key].time);
        }
      }
    };

    // 指定のアラートを削除
    this.delAlert = function(key) {
      delete list[key];
    };

    // 現在設定されているアラートをすべて削除
    this.delAllAlert = function() {
      angular.forEach(list, function(alert, key) {
        delete list[key];
      });
    };

  });
});
