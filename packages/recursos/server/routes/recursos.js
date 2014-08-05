'use strict';

var recursos = require('../controllers/recursos');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.recurso.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Recursos, app, auth) {

  app.route('/recursos')
    .get(recursos.all)
    .post(auth.requiresLogin, recursos.create);
  app.route('/recursos/:recursoId')
    .get(recursos.show)
    .put(auth.requiresLogin, hasAuthorization, recursos.update)
    .delete(auth.requiresLogin, hasAuthorization, recursos.destroy);

  // Finish with setting up the recursoId param
  app.param('recursoId', recursos.recurso);
};
