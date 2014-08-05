'use strict';

angular.module('mean.recursos').factory('Recursos', [ '$resource',
    function($resource) {
      return $resource('recursos/:recursoId', {
        recursoId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
]);
