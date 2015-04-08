'use strict';

var quartos = require('../controllers/quartos_controller');
var quartosInterface = require('../api/quartos_interface');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.quarto.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Quartos, app, auth) {

  // Client routes
  app.route('/quartos')
    .get(quartos.all)
    .post(auth.requiresLogin, quartos.create);
  app.route('/quartos/:quartoId')
    .get(quartos.show)
    .put(auth.requiresLogin, hasAuthorization, quartos.update)
    .delete(auth.requiresLogin, hasAuthorization, quartos.destroy);
  app.route('/quarto')
    .put(quartos.create);
  app.route('/quarto')
    .post(quartos.update);

  // External routes
  app.route('/api/reservas')
    .get(quartosInterface.reservas);
  app.route('/api/quartos')
    .get(quartosInterface.quartos);
  app.route('/api/quartos_livres/:dataInicio/:dataFim')
    .get(quartosInterface.quartos_livres);
  app.route('/api/quarto/:id')
    .get(quartosInterface.quarto);

  app.route('/api/checkin/:id')
    .post(quartosInterface.checkin);
  app.route('/api/checkout/:id')
    .post(quartosInterface.checkout);

  app.route('/api/reserva')
    .put(quartosInterface.reserva);


  // Finish with setting up the quartoId param
  app.param('quartoId', quartos.quarto);
};
