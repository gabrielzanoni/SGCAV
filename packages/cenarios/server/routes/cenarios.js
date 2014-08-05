'use strict';

var cenarios = require('../controllers/cenarios');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.cenario.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Cenarios, app, auth) {

  app.route('/cenarios')
    .get(cenarios.all)
    .post(auth.requiresLogin, cenarios.create);
  app.route('/cenarios/:cenarioId')
    .get(cenarios.show)
    .put(auth.requiresLogin, hasAuthorization, cenarios.update)
    .delete(auth.requiresLogin, hasAuthorization, cenarios.destroy);

  // Finish with setting up the cenarioId param
  app.param('cenarioId', cenarios.cenario);
};
