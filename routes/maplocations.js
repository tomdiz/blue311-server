var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Maplocation = require('../models/Maplocation.js');

/* GET /maplocations. */
router.get('/', function(req, res, next) {
  Maplocation.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

/* POST /maplocations */
router.post('/', function(req, res, next) {
  Maplocation.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /maplocations/within */
router.get('/within', function(req, res, next) {
  //clean these variables:
  var query = req.query;
  var lat = Number(query.lat),
      lon = Number(query.radius),
      radius = Number(query.lon);
  var limit = (typeof(query.limit) !== "undefined") ? query.limit : 40;
  if(!(Number(query.lat) 
    && Number(query.lon) 
    && Number(query.radius) 
    && Number(limit)))
  {
    res.send(500, {http_status:400,error_msg: "this endpoint requires a lat, long coordinate and radius: lat lon radius\na query 'limit' parameter can be optionally specified as well."});
    return console.error('could not connect to the database', err);
  }
  db[collection_name].find( {"pos" : {'$geoWithin': { '$centerSphere': [[lon,lat],radius]}}}).limit(limit).toArray(function(err,rows) {
    if(err) {
      res.send(500, {http_status:500,error_msg: err})
      return console.error('error running query', err);
    }
    res.send(rows);
    return rows;
  });
});

/* PUT /maplocations/update/:id */
router.put('/:id', function(req, res, next) {
  Maplocation.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /maplocations/:id */
router.put('/:id', function(req, res, next) {
  Maplocation.findByIdAndUpdate(req.params.id, {inUse:true}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /maplocations/:id */
router.delete('/:id', function(req, res, next) {
  Maplocation.findByIdAndUpdate(req.params.id, {inUse:false}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
