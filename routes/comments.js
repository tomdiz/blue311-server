var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/Comment.js');

/* GET /comments for location id. */
router.get('/', function(req, res, next) {
  //clean these variables:
  var query = req.query;
  var location_id = String(query.location_id);
  var limit = (typeof(query.limit) !== "undefined") ? query.limit : 40;
  if(!(String(query.location_id))) {
    //res.send(500, {http_status:400,error_msg: "This endpoint requires a location_id: location_id\na query 'limit' parameter can be optionally specified as well."});
    res.status(500).send({http_status:400,error_msg: "This endpoint requires a location_id: location_id\na query 'limit' parameter can be optionally specified as well."});
    return console.error('could not connect to the database', err);
  }
  Comment.find( {"location_id" : location_id}).limit(limit).toArray(function(err,rows) {
    if(err) {
      //res.send(500, {http_status:500,error_msg: err})
      res.status(500).send({http_status:500,error_msg: err});
      return console.error('error running query', err);
    }
    res.send(rows);
    return rows;
  });

});

/* POST /comments */
router.post('/', function(req, res, next) {
  console.log('POST /v1/comments');

  console.log('body: %s', req.body.comment_body);
  console.log('subject: %s', req.body.comment_subject);
  console.log('location_id: %s', req.body.location_id);
  console.log('user_handle: %s', req.body.user_handle);
	
  var comment = new Comment({user_handle: req.body.user_handle, location_id: req.body.location_id, subject: req.body.comment_subject, body: req.body.comment_body, rating_down:0, rating_up:0});
  comment.save(function (err) {
    if (err) {
      console.log('Comment save ERROR');
      console.log(err);
      return next(err);
    }
 
    console.log('Comment saved');
    res.send('Comment saved');
	});
});
/*
router.post('/', function(req, res, next) {
  Comment.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

/* GET /comments/id */
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /comments/:id */
router.put('/:id', function(req, res, next) {
//  Comment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
  Comment.findByIdAndUpdate(req.params.id, {$inc: {rating_up:1}}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /comments/:id */
router.delete('/:id', function(req, res, next) {
  //Comment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
  Comment.findByIdAndUpdate(req.params.id, {$inc: {rating_down:1}}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
