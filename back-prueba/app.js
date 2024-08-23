var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var corsOptions = {
  origin: 'https://pruebafullstack.pages.dev',
  optionsSuccessStatus: 200 
}

const peliculas = require("./controller/peliculas");
const comentarios = require("./controller/comentarios");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/peliculas', cors(corsOptions), (req, res, next)=>{
  peliculas.findAll(req, res);
});
app.get('/comentarios', cors(corsOptions), (req, res, next)=>{
  comentarios.findByMovie(req, res);
});
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
