'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Missao = mongoose.model('Missao'),
  _ = require('lodash');


/**
 * Find missao by id
 */
exports.missao = function(req, res, next, id) {
  Missao.load(id, function(err, missao) {
    if (err) return next(err);
    if (!missao) return next(new Error('Failed to load missao ' + id));
    req.missao = missao;
    next();
  });
};

/**
 * Create an missao
 */
exports.create = function(req, res) {
  var missao = new Missao(req.body);
  missao.user = req.user;

  missao.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the missao'
      });
    }
    res.json(missao);

  });
};

/**
 * Update an missao
 */
exports.update = function(req, res) {
  var missao = req.missao;

  missao = _.extend(missao, req.body);

  missao.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the missao'
      });
    }
    res.json(missao);

  });
};

/**
 * Delete an missao
 */
exports.destroy = function(req, res) {
  var missao = req.missao;

  missao.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the missao'
      });
    }
    res.json(missao);

  });
};

/**
 * Show an missao
 */
exports.show = function(req, res) {
  res.json(req.missao);
};

/**
 * List of Missao
 */
exports.all = function(req, res) {
  Missao.find().sort('-created').populate('user', 'name username').exec(function(err, missao) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the missao'
      });
    }
    res.json(missao);

  });
};
