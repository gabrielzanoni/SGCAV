'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Quarto = mongoose.model('Quarto'),
  Reserva = mongoose.model('Reserva');


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
      res.status(500).json(err);
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
      console.log(data);

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
      res.status(500).json(err);
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
      res.status(500).json(err);
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
      res.status(500).json(err);
    } else {
      res.json({results: 'Success'});
    }
  });
};

exports.reserva = function(req, res) {

  var reservation = new Reserva(req.body.reservation);
  console.log(req.body);

  reservation.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {

      Quarto.addReservation(req.body.roomId, reservation._id, function (err) {

        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({});
        }
      });
    }

  });
};
