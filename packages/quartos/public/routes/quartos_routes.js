'use strict';

angular.module('mean.quartos').config(['$stateProvider',
    function($stateProvider) {
      // states for my app
      $stateProvider
        .state('quartos', {
          url: '/quartos',
          templateUrl: 'quartos/views/list.html',
        })
        .state('create quarto', {
          url: '/quartos/create',
          templateUrl: 'quartos/views/create.html',
        })
        .state('edit quarto', {
          url: '/quartos/:quartoId/edit',
          templateUrl: 'quartos/views/edit.html',
        })
        .state('quarto by id', {
          url: '/quartos/:quartoId',
          templateUrl: 'quartos/views/view.html',
        });
    }
]);
