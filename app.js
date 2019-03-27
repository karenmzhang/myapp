//var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

var snapshotRouter = require('./routes/snapshot');
var userRouter = require('./routes/user');
var submitRouter = require('./routes/submit');
var authRouter = require('./routes/authenticate');
var testRouter = require('./routes/runTests');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(express.json());

//app.use((req, res, next) => {
// res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
//    next();
//})
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

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
app.use('/api/submit', submitRouter);
app.use('/api/user', userRouter);
app.use('/api/snapshot', snapshotRouter);
app.use('/api/auth', authRouter.router);
app.use('/api/runTests', testRouter);
app.get('*', (req, res) => {
    let url = path.join(__dirname, 'client/build', 'index.html');
    if (!url.startsWith('/app/')) // we're on local windows
	url = url.substring(1);
    res.sendFile(url);
});

app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname +'/client/build/index.html'));
    res.sendStatus(404);
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
