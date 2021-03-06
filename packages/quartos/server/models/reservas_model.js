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


    $or : [
      //      |   *    |     *
      {
        $and : [
          { date_in :  { $lte : new Date(startDate) } } ,
          { date_out : { $lte: new Date(endDate) } }
        ]
      },
      //          *    |     *    |
      {
        $and : [
          { date_in :  { $gte: new Date(startDate) } } ,
          { date_out : { $gte: new Date(endDate) } }
        ]
      },
      //          *  |   |   *
      {
        $and : [
          { date_in :  { $gte: new Date(startDate) } } ,
          { date_out : { $lte: new Date(endDate) } }
        ]
      },
      //       |  *          *   |
      {
        $and : [
          { date_in :  { $lte: new Date(startDate) } } ,
          { date_out : { $gte: new Date(endDate) } }
        ]
      }
    ]

  }, function (err, data){

    console.log(err);
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

mongoose.model('Reserva', ReservaSchema);
