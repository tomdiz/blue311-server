var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
  user_handle: String,
  b311MapDataLocationId: String,
  subject: String,
  body: String,
  rating_down: Number,
  rating_up: Number,
  created: Date
});

module.exports = mongoose.model('Comments', CommentsSchema);
