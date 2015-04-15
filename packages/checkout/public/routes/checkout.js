'use strict';

angular.module('mean.checkout').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('checkout example page', {
        url: '/checkout/example',
        templateUrl: 'checkout/views/index.html'
      });
  }
]);
