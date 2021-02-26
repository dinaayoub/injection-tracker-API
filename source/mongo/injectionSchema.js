'use strict';

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const injections = mongoose.Schema({
  user_id: { type: String, required: true },
  date_time: { type: String, required: true },
  location_x: { type: Number },
  location_y: { type: Number },
  reaction: { type: Boolean, default: false },
  notes: { type: String },
  medication_id: { type: String },
});

module.exports = mongoose.model('injections', injections);