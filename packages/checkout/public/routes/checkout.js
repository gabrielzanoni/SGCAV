'use strict';

angular.module('mean.checkout').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'checkout/views/index.html'
      });
  }
]);
