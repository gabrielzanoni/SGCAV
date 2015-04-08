'use strict';

angular.module('mean.quartos').controller('QuartosController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Quartos',
  function($scope, $http, $stateParams, $location, Global, Quartos) {
    $scope.global = Global;

    $scope.hasAuthorization = function() {
      return sessionStorage.roles.indexOf('gerente') >= 0;
    };

    $scope.isUser = function() {
      return sessionStorage.roles.indexOf('cliente') >= 0;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var quarto = new Quartos({
          number: this.number,
          'daily-price': this.dailyPrice,
          status: 'LIVRE'
        });
        quarto.$save(function(response) {
          $location.path('quartos/' + response._id);
        });

        this.title = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(quarto) {
      if (quarto) {
        quarto.$remove();

        for (var i in $scope.quartos) {
          if ($scope.quartos[i] === quarto) {
            $scope.quartos.splice(i, 1);
          }
        }
      } else {
        $scope.quarto.$remove(function(response) {
          $location.path('quartos');
        });
      }
    };

    $scope.save = function(quarto) {
      if (!quarto.updated) {
        quarto.updated = [];
      }
      quarto.updated.push(new Date().getTime());

      quarto.$update(function() {
      });
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var quarto = $scope.quarto;
        if (!quarto.updated) {
          quarto.updated = [];
        }
        quarto.updated.push(new Date().getTime());

        quarto.$update(function() {
          $location.path('quartos/' + quarto._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      $http.get('/api/quartos_livres/2015-04-16/2015-04-18')
        .success(function(data, status, headers, config) {
          console.log(data);
          $scope.quartos = data.results;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

    $scope.findOne = function() {
      Quartos.get({
        quartoId: $stateParams.quartoId
      }, function(quarto) {
        $scope.quarto = quarto;
      });
    };
  }
]);
