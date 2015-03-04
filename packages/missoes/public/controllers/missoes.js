'use strict';

angular.module('mean.missoes').controller('MissoesController', ['$scope', '$stateParams', '$location', 'Global', 'Missoes',
  function($scope, $stateParams, $location, Global, Missoes) {
    $scope.global = Global;

    $scope.hasAuthorization = function() {
      return sessionStorage.roles.indexOf('gerente') >= 0;
    };

    $scope.isUser = function() {
      return sessionStorage.roles.indexOf('cliente') >= 0;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var missao = new Missoes({
          title: this.title
        });
        missao.$save(function(response) {
          $location.path('missoes/' + response._id);
        });

        this.title = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(missao) {
      if (missao) {
        missao.$remove();

        for (var i in $scope.missoes) {
          if ($scope.missoes[i] === missao) {
            $scope.missoes.splice(i, 1);
          }
        }
      } else {
        $scope.missao.$remove(function(response) {
          $location.path('missoes');
        });
      }
    };

    $scope.save = function(missao) {
      if (!missao.updated) {
        missao.updated = [];
      }
      missao.updated.push(new Date().getTime());

      missao.$update(function() {
      });
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var missao = $scope.missao;
        if (!missao.updated) {
          missao.updated = [];
        }
        missao.updated.push(new Date().getTime());

        missao.$update(function() {
          $location.path('missoes/' + missao._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Missoes.query(function(missoes) {
        $scope.missoes = missoes;
      });
    };

    $scope.findOne = function() {
      Missoes.get({
        missaoId: $stateParams.missaoId
      }, function(missao) {
        $scope.missao = missao;
      });
    };
  }
]);
