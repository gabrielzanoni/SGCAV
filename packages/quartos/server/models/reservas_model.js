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
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
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
  }).exec(cb);
};

/**
* Get Specific Date
*/
ReservaSchema.statics.getIds = function (startDate, endDate, cb) {
  this.find({
    date_in: startDate,
    date_out: endDate
  }, function (err, data){
    if (err) {
      cb(err);
    } else {
      var ids = [];

      data.forEach(function(reservation) {
        ids.push(reservation._id);
      });

      cb(null, ids);
    }
  });
};


/**
* Create a Reservation
*/
ReservaSchema.statics.create = function (reservation , cb) {

  this.insert({
    date_in : reservation.date_in,
    date_out : reservation.date_out,
    value: reservation.value,
    user_id, reservation.user_id
  }, function (err) {
    
  })

  var _reservation = new Reserva(reservation);

  _reservation.save(function(err) {
    cb(err, _reservation);
  });
};

mongoose.model('Reserva', ReservaSchema);
