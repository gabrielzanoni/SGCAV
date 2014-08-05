'use strict';

angular.module('mean.cenarios').controller('CenariosController', ['$scope', '$stateParams', '$location', 'Global', 'Cenarios',
  function($scope, $stateParams, $location, Global, Cenarios) {
    $scope.global = Global;

    $scope.hasAuthorization = function(cenario) {
      if (!cenario || !cenario.user) return false;
      return $scope.global.isAdmin || cenario.user._id === $scope.global.user._id || sessionStorage.roles.indexOf('administrador') >= 0 || sessionStorage.roles.indexOf('policial/bombeiro') >= 0;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var cenario = new Cenarios({
          title: this.title,
          content: this.content
        });
        cenario.$save(function(response) {
          $location.path('cenarios/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(cenario) {
      if (cenario) {
        cenario.$remove();

        for (var i in $scope.cenarios) {
          if ($scope.cenarios[i] === cenario) {
            $scope.cenarios.splice(i, 1);
          }
        }
      } else {
        $scope.cenario.$remove(function(response) {
          $location.path('cenarios');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var cenario = $scope.cenario;
        if (!cenario.updated) {
          cenario.updated = [];
        }
        cenario.updated.push(new Date().getTime());

        cenario.$update(function() {
          $location.path('cenarios/' + cenario._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Cenarios.query(function(cenarios) {
        $scope.cenarios = cenarios;
      });
    };

    $scope.findOne = function() {
      Cenarios.get({
        cenarioId: $stateParams.cenarioId
      }, function(cenario) {
        $scope.cenario = cenario;
      });
    };
  }
]);

