'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Quarto = mongoose.model('Quarto'),
  _ = require('lodash');


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
  var quarto = new Quarto(req.body);
  quarto.user = req.user;

  quarto.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the quarto'
      });
    }
    res.json(quarto);

  });
};

/**
 * Update an quarto
 */
exports.update = function(req, res) {
  var quarto = req.quarto;

  quarto = _.extend(quarto, req.body);

  quarto.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the quarto'
      });
    }
    res.json(quarto);

  });
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
