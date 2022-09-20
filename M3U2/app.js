var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // routes/index.js
var hyperscanningRouter = require('./routes/hyperscanning'); // routes/hyperscanning.js
var neurofeedbackRouter = require('./routes/neurofeedback') // routes/neurofeedback.js
var loginRouter = require('./routes/login') // routes/login.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hyperscanning', hyperscanningRouter);
app.use('/neurofeedback', neurofeedbackRouter);
app.use('/login', loginRouter);

app.get('/prueba',function(req,res){
  res.send('Hola soy la pagina de Prueba')
})

app.get('/nosotros',function(req,res){
  res.send('Hola soy la pagina de Nosotros')
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
