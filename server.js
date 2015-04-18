var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs'),
    db          = require('./bin/db.js')

var config      = cc(),
    app         = restify.createServer()

//var comments = require('./routes/comments');
//var maplocations = require('./routes/maplocations');

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())
//app.use('/v1/comments', comments);
//app.use('/v1/maplocations', maplocations);

// Routes
app.get('/parks/within', db.selectBox);
app.get('/parks', db.selectAll);
//app.get('/v1/map_locations', db.selectRadius);

app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: './static/'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT'))
});
