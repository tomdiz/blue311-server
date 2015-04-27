var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MapLocationSchema = new mongoose.Schema({
  id: String,
  title: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  mtype: String,
  inUse: Number,		// 1 == full, 0 == empty
  longitude: Number,
  latitude: Number,
  created: {type: Date, default: Date.now},
  geo: {type: [Number, Number], index: '2d'}
});

module.exports = mongoose.model('Maplocation', MapLocationSchema);
