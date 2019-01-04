//var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var submitRouter = require('./routes/submit');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

/*app.post('/side', (req, res, next) => {
	res.send(req.body.key1 + ' post to sidepage\n')
        next()
   },
   (req, res) => {
	console.log(req.method + ' request to sidepage\n')
   })

app.all('/side', (req, res) => {
      res.send(req.method + ' request to sidepage\n')
   })*/

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/submit', submitRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname +'client/build/index.html'));
});

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
