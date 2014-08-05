'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Recurso Schema
 */
var RecursoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
RecursoSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

RecursoSchema.path('quantidade').validate(function(quantidade) {
  return !!quantidade;
}, 'Content cannot be blank');

/**
 * Statics
 */
RecursoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Recurso', RecursoSchema);
