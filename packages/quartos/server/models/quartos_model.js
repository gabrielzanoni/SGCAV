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
    type: String,
    enum: ['LIVRE', 'OCUPADO', 'RESERVADO'],
    default: 'LIVRE'
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

/**
 * Get Rooms with reservation
 */
QuartoSchema.statics.getWithReservation = function (cb) {
  this.find({
    $where: 'this.reservations.length > 0'
  }, function (err, data){
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

/**
 * Get all Rooms 
 */
QuartoSchema.statics.getAll = function (cb) {
  this.find({}, function (err, data){
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

/**
 * Get Rooms with specific reservation ids
 */
QuartoSchema.statics.getFree = function (ids, cb) {
  this.find({ 
    reservations: { $nin: ids }
  }, function (err, data){
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

/**
 * Get all Rooms 
 */
QuartoSchema.statics.checkin = function (id, cb) {
  this.update(id, { status: 'OCUPADO' }, { upsert: false }, function (err){
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

/**
 * Get all Rooms 
 */
QuartoSchema.statics.checkout = function (id, cb) {
  this.update(id, { status: 'LIVRE' }, { upsert: false }, function (err){
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

mongoose.model('Quarto', QuartoSchema);
