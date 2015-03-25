'use strict';

var quartos = require('../controllers/quartos_controller');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.quarto.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Quartos, app, auth) {

  app.route('/quartos')
    .get(quartos.all)
    .post(auth.requiresLogin, quartos.create);
  app.route('/quartos/:quartoId')
    .get(quartos.show)
    .put(auth.requiresLogin, hasAuthorization, quartos.update)
    .delete(auth.requiresLogin, hasAuthorization, quartos.destroy);

  // Finish with setting up the quartoId param
  app.param('quartoId', quartos.quarto);
};
