var mongoose = require('mongoose');

var ProfilesSchema = new mongoose.Schema({
  user_handle: String,
  user_type: String,
  first_name: String,
  last_name: String,
  email: String,
  longitude: Number,
  latitude: Number,
  created: {type: Date, default: Date.now},
  geo: {type: [Number, Number], index: '2d'}
});

module.exports = mongoose.model('Profile', ProfilesSchema);
