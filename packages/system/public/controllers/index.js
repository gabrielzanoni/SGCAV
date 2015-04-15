'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$state', 'Global',
  function($scope, $state, Global) {
    $scope.global = Global;

    $scope.procurar = function(isValid){
      console.log($scope.form);
      if (isValid) {
        localStorage.setItem('dateStart', getDateString($scope.start));
        localStorage.setItem('dateEnd', getDateString($scope.end));

		    $state.transitionTo('quartos');
      } else {
        $scope.submitted = true;
      }
    };

    function getDateString(date){
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }
  }
]);
