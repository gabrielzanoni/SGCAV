'use strict';

angular.module('mean.cenarios').config(['$stateProvider',
    function($stateProvider) {
      // states for my app
      $stateProvider
        .state('cenarios', {
          url: '/cenarios',
          templateUrl: 'cenarios/views/list.html'
        })
        .state('create cenario', {
          url: '/cenarios/create',
          templateUrl: 'cenarios/views/create.html'
        })
        .state('edit cenario', {
          url: '/cenarios/:cenarioId/edit',
          templateUrl: 'cenarios/views/edit.html'
        })
        .state('cenario by id', {
          url: '/cenarios/:cenarioId',
          templateUrl: 'cenarios/views/view.html'
        });
    }
]);
