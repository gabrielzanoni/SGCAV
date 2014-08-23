'use strict';

angular.module('mean.recursos').controller('RecursosController', ['$scope', '$stateParams', '$location', 'Global', 'Recursos', 'Missoes',
  function($scope, $stateParams, $location, Global, Recursos, Missoes) {
    $scope.global = Global;

    $scope.hasAuthorization = function(recurso) {
      if (!recurso || !recurso.user) return false;
      return $scope.global.isAdmin || recurso.user._id === $scope.global.user._id || sessionStorage.roles.indexOf('administrador') >= 0 || sessionStorage.roles.indexOf('especialista') >= 0;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var recurso = new Recursos({
          title: this.title,
          quantidade: this.quantidade
        });
        recurso.$save(function(response) {
          $location.path('recursos/' + response._id);
        });

        this.title = '';
        this.quantidade = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(recurso) {
      if (recurso) {
        recurso.$remove();

        for (var i in $scope.recursos) {
          if ($scope.recursos[i] === recurso) {
            $scope.recursos.splice(i, 1);
          }
        }
      } else {
        $scope.recurso.$remove(function(response) {
          $location.path('recursos');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var recurso = $scope.recurso;
        if (!recurso.updated) {
          recurso.updated = [];
        }
        recurso.updated.push(new Date().getTime());

        recurso.$update(function() {
          $location.path('recursos/' + recurso._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.getMissoes = function() {
      Missoes.query(function(missoes) {
        $scope.missoes = missoes;
      });
    };

    $scope.find = function() {
      Recursos.query(function(recursos) {
        $scope.recursos = recursos;
      });
    };

    $scope.findOne = function() {
      Recursos.get({
        recursoId: $stateParams.recursoId
      }, function(recurso) {
        $scope.recurso = recurso;
      });
    };

    $scope.save = function(recurso) {
      if (!recurso.updated) {
        recurso.updated = [];
      }
      recurso.updated.push(new Date().getTime());

      recurso.$update(function() {
      });
    };

    $scope.missaoEscolhida = function(recurso) {
      console.log(recurso);
      $scope.save(recurso);
    };

    $scope.missoes = $scope.getMissoes();
  }
]);
