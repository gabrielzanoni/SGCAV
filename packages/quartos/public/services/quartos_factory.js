'use strict';

angular.module('mean.quartos').factory('Quartos', [ '$resource',
    function($resource) {
      return $resource('quartos/:quartoId', {
        missaoId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
]);
