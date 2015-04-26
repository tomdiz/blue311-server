var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
  user_handle: String,
  location_id: String,
  subject: String,
  body: String,
  rating_down: Number,
  rating_up: Number,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentsSchema);
