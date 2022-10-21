var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var loginsucessRouter = require('./routes/login_sucess');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');
var adminNovedadesRouter = require('./routes/admin/novedades');
var hyperscanningRouter = require('./routes/hyperscanning/session_hyperscan');
var metodologiaRouter = require('./routes/metodologia');
var testsRouter = require('./routes/tests');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '33308100+Ge',
  resave: false,
  saveUninitialized: true

}));

secured = async (req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario){
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login_sucess', loginsucessRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
app.use('/admin/novedades', secured, adminNovedadesRouter);
app.use('/hyperscanning/session_hyperscan', hyperscanningRouter);
app.use('/metodologia', metodologiaRouter);
app.use('/tests', testsRouter);


//select
pool.query('select * from usuarios').then(function(resultados) {
 //console.log(resultados);
});

//insert
//var obj = {
//  nombre:'Diana',
//  apellidos: 'Liz',
//  mail: 'diana.lizv@gmail.com',
//  celular: '+56995394227',
//  organizacion: 'Principal',
//  password:123456789
//}

//pool.query('insert into usuarios set ?', [obj]).then(function (resultados) {
//  console.log(resultados);
//});

//update
//var id = 4;
// var obj ={
// mail: 'dvargas@momentumconsultores.cl',
// organizacion: 'Externa'
//  }

// pool.query('update usuarios set ? where id=?' , [obj, id]).then(function(resultados) {
//  console.log(resultados);
//});

//borrar
// var id = 1;
//pool.query('delete from usuarios where id=?', [id]).then(function(resultados) {
//  console.log(resultados);
//});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
