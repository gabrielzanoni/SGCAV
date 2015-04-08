'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$state', 'Global',
  function($scope, $state, Global) {
    $scope.global = Global;

    $scope.procurar = function(isValid){
      if (isValid) {
		$state.transitionTo('quartos');
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
