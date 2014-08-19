'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Missao Schema
 */
var MissaoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  recursos: {
    type: String,
    trim: true
  },
  acidente: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  solved: {
    type: Boolean,
    default: false
  }
});

/**
 * Validations
 */
MissaoSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

MissaoSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
MissaoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Missao', MissaoSchema);
