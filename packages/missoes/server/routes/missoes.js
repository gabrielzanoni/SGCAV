'use strict';

var missoes = require('../controllers/missoes');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.missao.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Missoes, app, auth) {

  app.route('/missoes')
    .get(missoes.all)
    .post(auth.requiresLogin, missoes.create);
  app.route('/missoes/:missaoId')
    .get(missoes.show)
    .put(auth.requiresLogin, hasAuthorization, missoes.update)
    .delete(auth.requiresLogin, hasAuthorization, missoes.destroy);

  // Finish with setting up the missaoId param
  app.param('missaoId', missoes.missao);
};
