'use strict';

angular.module('mean.recursos').config(['$stateProvider',
    function($stateProvider) {
      // states for my app
      $stateProvider
        .state('recursos', {
          url: '/recursos',
          templateUrl: 'recursos/views/list.html'
        })
        .state('create recurso', {
          url: '/recursos/create',
          templateUrl: 'recursos/views/create.html'
        })
        .state('edit recurso', {
          url: '/recursos/:recursoId/edit',
          templateUrl: 'recursos/views/edit.html'
        })
        .state('recurso by id', {
          url: '/recursos/:recursoId',
          templateUrl: 'recursos/views/view.html'
        });
    }
]);
