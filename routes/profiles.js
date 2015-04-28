var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Maplocation = require('../models/Profile.js');

/* GET /profiles. */
router.get('/', function(req, res, next) {
  Profile.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

/* POST /profiles */
router.post('/', function(req, res, next) {
  console.log('POST /v1/profiles');

  console.log('latitude: %d', req.body.latitude);
  console.log('longitude: %d', req.body.longitude);
  console.log('first_name: %s', req.body.first_name);
  console.log('last_name: %s', req.body.last_name);
  console.log('email: %s', req.body.email);
  console.log('user_type: %s', req.body.user_type);
  console.log('user_handle: %s', req.body.handle);
	
  var profile = new Profile({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, user_type: req.body.user_type, user_handle: req.body.handle, longitude: req.body.longitude, latitude: req.body.latitude, geo: [req.body.longitude, req.body.latitude]});
  profile.save(function (err) {
    if (err) {
      console.log('Profile save ERROR');
      console.log(err);
      return next(err);
    }
 
    console.log('Profile saved');
    res.send('Profile saved');
	});
});

/* PUT /profiles/update/:id */
router.put('/:id', function(req, res, next) {
  Profile.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /profiles/:id */
router.put('/:id', function(req, res, next) {
  Profile.findByIdAndUpdate(req.params.id, {inUse:true}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /profiles/:id */
router.delete('/:id', function(req, res, next) {
  Profile.findByIdAndUpdate(req.params.id, {inUse:false}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
