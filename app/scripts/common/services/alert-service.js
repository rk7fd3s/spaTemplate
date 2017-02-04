define([
    'app'
], function (app) {
  'use strict';
  app.service('alertService', function($timeout){
    var uid = 0;
    var list = {};

    /*
      type : 'success', 'info', 'warning', 'danger'
      msg : show message to browser
      time : auto close time
     */
    function Alert(type, msg, time){
      return {
        type : type ? type : 'info',
        msg : msg ? msg : '',
        time: time ? time : 0
      };
    }

    this.getList = function(){
      return list;
    };

    this.addAlert = function(type, msg, time){
      var key = ''+ uid++;
      list[key] = new Alert(type, msg, time);

      if(list[key].time>0) {
        $timeout(function () {
          delete list[key];
        }, list[key].time);
      }

      console.log(list);
    };

    this.delAlert = function (key) {
      delete list[key];
      console.log(list);
    };

  });
});
