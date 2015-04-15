'use strict';

angular.module('mean.quartos').factory('Quartos', [ '$resource',
    function($resource) {
      return $resource('quartos/:quartoId', {
        quartoId: '@_id'
      }, {
        update: {
          method: 'POST'
        }
      });
    }
]);
