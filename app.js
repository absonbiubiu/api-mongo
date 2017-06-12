var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  autoRoutes = require('express-auto-routes'),
  config = require("./libs/config"),
  Cors = require('./middlewares/cors'),
  Logger = require('./middlewares/logger'),
  UserSession = require('./middlewares/userSession'),
  mongoose = require('./libs/mongoose');

var app = express();
app.use(Cors);
app.use(Logger);
app.use(UserSession);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  entended: false
}));
app.use(cookieParser());

//routes
var routes = autoRoutes(app);
routes(path.join(__dirname, './routes'));

//404
app.use(function (req, res, next) {
  res.status(404);
  next({
    code: 404,
    msg: 'Page not found'
  });
});

//errorHandler
app.use(function (err, req, res, next) {
  console.error(err);

  if (err.status) res.status(err.status);

  res.json({
    code: err.code || 1,
    msg: err.msg || err
  });
});

app.listen(config.get('port'), function () {
  console.log('[INFO] EXPRESS RESTful API listening at localhost:%s', config.get('port'));
});