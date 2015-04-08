'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Quarto = mongoose.model('Quarto');




var checkRoomValidations = function (req, res) {

  //Validations
  req.assert('number', 'You must enter a room number').notEmpty();
  // req.assert('status', 'You must enter a valid status for the room').notEmpty();
  // req.assert('daily_price', 'You must enter a daily price for the room').notEmpty(); // Default 60
  // req.assert('accomodation', 'Number of people accomodet in the room is required').notEmpty(); // Default 2

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return true;
  }

  return false;
};


/**
 * Find Quarto by id
 */
exports.quarto = function(req, res, next, id) {
  Quarto.load(id, function(err, quarto) {
    if (err) return next(err);
    if (!quarto) return next(new Error('Failed to load quarto ' + id));
    req.quarto = quarto;
    next();
  });
};

/**
 * Create an quarto
 */
exports.create = function(req, res) {

  if (checkRoomValidations(req, res)) {
    return;
  }

  var quarto = new Quarto(req.body);

  quarto.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    res.json(quarto);

  });
};

/**
 * Update an quarto
 */
exports.update = function(req, res) {

  if (checkRoomValidations(req, res)) {
    return;
  }

  Quarto.findOneAndUpdate(
    { _id: req._id },
    req.body,
    function (err, newQuarto) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(newQuarto);
    }
  );
};

/**
 * Delete an quarto
 */
exports.destroy = function(req, res) {
  var quarto = req.quarto;

  quarto.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the quarto'
      });
    }
    res.json(quarto);

  });
};

/**
 * Show an quarto
 */
exports.show = function(req, res) {
  res.json(req.quarto);
};

/**
 * List of Quarto
 */
exports.all = function(req, res) {
  Quarto.find().sort('-created').populate('user', 'name username').exec(function(err, quarto) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the quarto'
      });
    }
    res.json(quarto);

  });
};
