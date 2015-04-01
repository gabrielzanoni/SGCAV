'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
* Quarto Schema
*/
var ReservaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  date_in: {
    type: Date,
    required: true
  },
  date_out: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


// /**
// * Validations
// */
// ReservaSchema.path('title').validate(function(title) {
//   return !!title;
// }, 'Title cannot be blank');

/**
* Statics
*/
ReservaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('client').exec(cb);
};

mongoose.model('Reserva', ReservaSchema);
