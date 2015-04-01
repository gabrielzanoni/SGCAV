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
  valor: {
    type: Number,
    required: true
  },
  cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
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
  }).populate('cliente').exec(cb);
};

mongoose.model('Reserva', ReservaSchema);
