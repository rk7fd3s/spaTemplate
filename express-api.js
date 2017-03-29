var express = require('express');
var app = express();
const BASE_PATH = '/api/';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const resHash = {
  success: {
    code: 1000,
    resultSet: {}
  },
  error: {
    code: 4000,
    resultSet: {}
  }
};
app.disable('etag');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(BASE_PATH + 'users', function(req, res) {
  res.send([{
    user: 'john',
    fave_genre: 'science fiction',
    last_book_purchased: 'the light of other days'
  }, {
    user: 'genevieve',
    fave_genre: 'fantasy',
    last_book_purchased: 'game of thrones: a dance with dragons'
  }, {
    user: 'zach',
    fave_genre: 'non-fiction',
    last_book_purchased: 'freakonomics'
  }]);
});
app.post(BASE_PATH + 'authorize', function(req, res) {
  const request = req.body;

  if ((typeof request.un !== 'string' || request.un === '') ||
    (typeof request.pw !== 'string' || request.pw === '') ||
    (!(request.rm + '').match(/^[0|1]$/))
  ) {
    // 型違いや空文字エラー
    let error = resHash.error;
    error.code = 4403;
    error.message = 'Forbidden';

    res.status(403).send(error);
  } else if (request.un === 'Admin' && request.pw === 'admin') {
    // // 1日期限でcookieの登録
    // $cookies.put('XSRF-TOKEN', success.resultSet.token, {
    //   expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
    // });

    // Remember MeがOnであれば、30日間usernameを保持
    if (request.rm === 1) {
      res.cookie('username', request.un, {maxAge: 360000 * 24 * 30});
    }

    // セッションID発行
    res.cookie('NSESSIONID', 'x6GCX3aq9hIT8gjhvO96ObYj0W5HBVTsj64eqCuVc5X');

    let success = resHash.success;
    success.resultSet = {
      roll: 'admin',
      token: 'ADMIN_LOGIN_TOKEN'
    };

    res.send(success);
  } else if (request.un === 'User' && request.pw === 'user') {
    // 1日期限でcookieの登録
    // $cookies.put('XSRF-TOKEN', success.resultSet.token, {
    //   expires: new Date((new Date()).getTime() + 60 * 60 * 24 * 1 * 1000)
    // });

    // Remember MeがOnであれば、30日間usernameを保持
    if (request.rm === 1) {
      res.cookie('username', request.un, {maxAge: 360000 * 24 * 30});
    }

    // セッションID発行
    res.cookie('NSESSIONID', 'x6GCX3aq9hIT8gjhvO96ObYj0W5HBVTsj64eqCuVc5X');

    let success = resHash.success;
    success.resultSet = {
      roll: 'operator',
      token: 'USER_LOGIN_TOKEN'
    };

    res.send(success);
  } else if (request.un === '400') {
    let error = resHash.error;
    error.code = '4400';
    error.message = 'Bad Request';
    res.status(400).send(error);
  } else {
    let error = resHash.error;
    error.code = '4500';
    error.message = 'Internal Server Error';
    res.status(500).send(error);
  }
});
module.exports = app;
