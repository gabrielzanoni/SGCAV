'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Cenario = mongoose.model('Cenario'),
  _ = require('lodash');


/**
 * Find Cenario by id
 */
exports.cenario = function(req, res, next, id) {
  Cenario.load(id, function(err, cenario) {
    if (err) return next(err);
    if (!cenario) return next(new Error('Failed to load cenario ' + id));
    req.cenario = cenario;
    next();
  });
};

/**
 * Create an cenario
 */
exports.create = function(req, res) {
  var cenario = new Cenario(req.body);
  cenario.user = req.user;

  cenario.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the cenario'
      });
    }
    res.json(cenario);

  });
};

/**
 * Update an cenario
 */
exports.update = function(req, res) {
  var cenario = req.cenario;

  cenario = _.extend(cenario, req.body);

  cenario.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the cenario'
      });
    }
    res.json(cenario);

  });
};

/**
 * Delete an cenario
 */
exports.destroy = function(req, res) {
  var cenario = req.cenario;

  cenario.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the cenario'
      });
    }
    res.json(cenario);

  });
};

/**
 * Show an cenario
 */
exports.show = function(req, res) {
  res.json(req.cenario);
};

/**
 * List of cenario
 */
exports.all = function(req, res) {
  Cenario.find().sort('-created').populate('user', 'name username').exec(function(err, cenario) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the cenario'
      });
    }
    res.json(cenario);

  });
};
