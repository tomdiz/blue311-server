var mongoose = require('mongoose');

var MapLocationSchema = new mongoose.Schema({
  title: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  rating_down: Number,
  mtype: Number,
  inUse: Number,		// 1 == full, 0 == empty
  longitude: Number,
  latitude: Number,
  created: {type: Date, default: Date.now},
  geo: {type: [Number], index: '2d'}
});

module.exports = mongoose.model('Maplocation', MapLocationSchema);
