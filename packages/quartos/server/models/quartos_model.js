'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Quarto Schema
 */
var QuartoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  number: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: Number,
    default: 0
  },
  daily_price: {
    type: Number,
    default: 60
  },
  accomodation: {
    type: Number,
    default: 2
  },
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reserva' }]
});

// /**
//  * Validations
//  */
// QuartoSchema.path('title').validate(function(title) {
//   return !!title;
// }, 'Title cannot be blank');

/**
 * Statics
 */
QuartoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('reservations').exec(cb);
};

mongoose.model('Quarto', QuartoSchema);
