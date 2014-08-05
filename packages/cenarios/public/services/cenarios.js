'use strict';

angular.module('mean.cenarios').factory('Cenarios', [ '$resource',
  function($resource) {
    return $resource('cenarios/:cenarioId', {
      cenarioId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

