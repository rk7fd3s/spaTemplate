'use strict';

define(['app'], function(app) {
  app.service('messageService', function(configCommon) {

    // メッセージコードと置換する文字列を引数を渡して、メッセージを取得
    this.getMessage = function(code) {
      const args = Array.prototype.slice.call(arguments, 1);

      // メッセージ設定取得
      const messageCondig = configCommon.MESSAGE;

      if (typeof args === 'undefined' || args == null) {
        return '';
      }
      if (args.length == 1 && typeof(args[0]) === 'object') {
        args = args[0];
      }

      if (code in messageCondig) {
        // 対応するメッセージコードの設定があれば、その文字列を取得
        const message = messageCondig[code];

        // $1, $2, ... を第２引数以降の値に置き換えて返却
        return message.replace(/\$(\d+)/g, function(match, i, index, orgin) {
          if (i - 1 in args) {
            return args[i - 1];
          }
          return match;
        });
      }

      return '';
    };

  });
});
