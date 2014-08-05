'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Recurso = mongoose.model('Recurso'),
  _ = require('lodash');


/**
 * Find missao by id
 */
exports.recurso = function(req, res, next, id) {
  Recurso.load(id, function(err, recurso) {
    if (err) return next(err);
    if (!recurso) return next(new Error('Failed to load recurso ' + id));
    req.recurso = recurso;
    next();
  });
};

/**
 * Create an recurso
 */
exports.create = function(req, res) {
  var recurso = new Recurso(req.body);
  recurso.user = req.user;

  recurso.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the recurso'
      });
    }
    res.json(recurso);

  });
};

/**
 * Update an recurso
 */
exports.update = function(req, res) {
  var recurso = req.recurso;

  recurso = _.extend(recurso, req.body);

  recurso.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the recurso'
      });
    }
    res.json(recurso);

  });
};

/**
 * Delete an recurso
 */
exports.destroy = function(req, res) {
  var recurso = req.recurso;

  recurso.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the recurso'
      });
    }
    res.json(recurso);

  });
};

/**
 * Show an recurso
 */
exports.show = function(req, res) {
  res.json(req.recurso);
};

/**
 * List of recurso
 */
exports.all = function(req, res) {
  Recurso.find().sort('-created').populate('user', 'name username').exec(function(err, recurso) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the recurso'
      });
    }
    res.json(recurso);

  });
};
