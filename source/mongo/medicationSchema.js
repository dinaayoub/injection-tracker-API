'use strict';

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const medications = mongoose.Schema({
  user_id: { type: String, required: true },
  added_date_time: { type: String },
  edited_date_time: { type: String },
  name: { type: String },
  dosage: { type: String },
  is_deleted: { type: Boolean },
});

module.exports = mongoose.model('medications', medications);