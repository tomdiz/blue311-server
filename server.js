var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cc = require('config-multipaas');
var config = cc();

var routes = require('./routes/index');
var comments = require('./routes/comments');
var profiles = require('./routes/profiles');
var maplocations = require('./routes/maplocations');

var database_location = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/blue311App';

var mongoose = require('mongoose');
mongoose.connect(database_location, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('Connect to DB: %s', database_location);
        console.log('connection successful');
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', routes);
app.use('/v1/comments', comments);
app.use('/v1/profiles', profiles);
app.use('/v1/maplocations', maplocations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// catch uncaught exceptions
process.on('uncaughtException', function (err) {
  if ('stack' in err) {
    console.log(err.stack);
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 502);
        console.log(err.stack);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 501);
    console.log(err.stack);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT'))
});


module.exports = app;
