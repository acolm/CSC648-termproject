var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use((req, res, next) => {
    console.info('\x1b[42m\x1b[30m Request URL : ' + req.url + '\x1b[0m');
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    res.status(500);
    console.log(err);
    res.sendFile('error.html', {root: "public/html" });
})

module.exports = app;
