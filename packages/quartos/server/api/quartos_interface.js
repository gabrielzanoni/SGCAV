'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Quarto = mongoose.model('Quarto'),
  Reserva = mongoose.model('Reserva'),
  error = { error: 'There was an error.' };


/**
 * GET METHODS
 */

/**
 * Return all rooms that have a reservation
 */
exports.reservas = function(req, res) {
  Quarto.getWithReservation(function(err, data){
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({results: data });
    }
  });
};

/**
 * Return all rooms from the system
 */
exports.quartos = function(req, res) {
  Quarto.getAll(function(err, data){
    if (err) {
      res.status(500).json(error);
    } else {
      res.status(200).json({results: data });
    }
  });
};

/**
 * Return all rooms that do not have a reservation for a certain date range
 */
exports.quartos_livres = function(req, res) {
  var startDate = req.params.dataInicio;
  var endDate = req.params.endDate;

  Reserva.getIds(startDate, endDate, function(err, data){
    if (err) {
      res.status(500).json(err);
    } else {
      Quarto.getFree(data, function(err, data){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({results: data });
        }
      });
    }
  });
};

/**
 * Return a specific room provided by an id
 */
exports.quarto = function(req, res) {
  Quarto.findOne(req.id, function (err, data){
    if (err) {
      res.status(500).json(error);
    } else {
      res.status(200).json({results: data });
    }
  });
};

/**
 * POST METHODS
 */

 /**
 * Informs that a checkin was made in a room provided an id
 */
exports.checkin = function(req, res) {
  Quarto.checkin(req.id, function (err){
    if (err) {
      res.status(500).json(error);
    } else {
      res.json({results: 'Success'});
    }
  });
};

/**
 * Informs that a checkout was made in a room provided an id
 */
exports.checkout = function(req, res) {
  Quarto.checkout(req.id, function (err){
    if (err) {
      res.status(500).json(error);
    } else {
      res.json({results: 'Success'});
    }
  });
};

exports.reserva = function(req, res) {

  var date_in = new Date(req.body.reservation.date_in),
       date_out = new Date(req.body.reservation.date_out);

  req.reservation.value = Math.floor((date_in.getTime()-date_out.getTime())/(1000*60*60*24));

  Reserva.create(req.body.reservation, function(err, reservation) {
    if (err) {
      res.status(500).json(error);
    } else {

      Quarto.addReservation(req.room_id, reservation._id, function (err) {

        if (err) {
          res.status(500).json(error);
        } else {
          res.status(200).json({});
        }
      });
      // TODO Save the data in Quartos model
    }
  });
};
