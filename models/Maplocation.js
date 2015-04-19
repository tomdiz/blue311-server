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
  loc: {
    type: [Number],		// [<longitude>, <latitude>]
    index: '2d'			// create the geospatial index
  },
  created: Date
});

module.exports = mongoose.model('Maplocations', MapLocationSchema);
