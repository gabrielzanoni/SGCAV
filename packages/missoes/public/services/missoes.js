'use strict';

angular.module('mean.missoes').factory('Missoes', [ '$resource',
    function($resource) {
      return $resource('missoes/:missaoId', {
        missaoId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
]);
