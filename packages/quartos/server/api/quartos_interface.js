'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Quarto = mongoose.model('Quarto'),
  Reserva = mongoose.model('Reserva'),
  error = { error: "There was an error." };


/**
 * GET METHODS
 */

/**
 * Return all rooms that have a reservation
 */
exports.reservas = function(req, res) {
  Quarto.getWithReservation(function(err, data){
    if (err) {
      res.json(error);  
    } else {
      res.json({results: data });
    };
  })
};

/**
 * Return all rooms from the system
 */
exports.quartos = function(req, res) {
  Quarto.getAll(function(err, data){
    if (err) {
      res.json(error);  
    } else {
      res.json({results: data });
    };
  })
};

/**
 * Return all rooms that do not have a reservation for a certain date range
 */
exports.quartos_livres = function(req, res) {
  var startDate = req.params.dataInicio;
  var endDate = req.params.endDate;

  Reserva.getIds(startDate, endDate, function(err, data){
    if (err) {
      res.json(error);  
    } else {
      Quarto.getFree(data, function(err, data){
        if (err) {
          res.json(error);  
        } else {
          res.json({results: data });
        };
      })
    };
  });
};

/**
 * Return a specific room provided by an id
 */
exports.quarto = function(req, res) {
  Quarto.findOnde(req.id, function (err, data){
    if (err) {
      res.json(error);  
    } else {
      res.json({results: data });
    };
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
      res.json(error);  
    } else {
      res.json({results: "Success"});
    };
  });
};

/**
 * Informs that a checkout was made in a room provided an id
 */
exports.checkout = function(req, res) {
  Quarto.checkout(req.id, function (err){
    if (err) {
      res.json(error);  
    } else {
      res.json({results: "Success"});
    };
  });
};
