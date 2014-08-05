'use strict';

angular.module('mean.missoes').config(['$stateProvider',
    function($stateProvider) {
      // states for my app
      $stateProvider
        .state('missoes', {
          url: '/missoes',
          templateUrl: 'missoes/views/list.html',
        })
        .state('create missao', {
          url: '/missoes/create',
          templateUrl: 'missoes/views/create.html',
        })
        .state('edit missao', {
          url: '/missoes/:missaoId/edit',
          templateUrl: 'missoes/views/edit.html',
        })
        .state('missao by id', {
          url: '/missoes/:missaoId',
          templateUrl: 'missoes/views/view.html',
        });
    }
]);
