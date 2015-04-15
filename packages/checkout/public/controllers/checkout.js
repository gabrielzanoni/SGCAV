'use strict';

/* jshint -W098 */
angular.module('mean.checkout').controller('CheckoutController', ['$scope', '$http', '$location', 'Global', 'Checkout', 'Quartos',
  function($scope, $http, $location, Global, Checkout, Quartos) {
    $scope.global = Global;
    $scope.package = {
      name: 'checkout'
    };

    $scope.params = {
      idQuarto: localStorage.getItem('idQuarto'),
      idUsuario: $scope.global.user._id,
      dateStart: localStorage.getItem('dateStart'),
      dateEnd: localStorage.getItem('dateEnd'),
      room: {}
    };

    $scope.reservation = {
      date_in: localStorage.getItem('dateStart'),
      date_out: localStorage.getItem('dateEnd'),
      client: $scope.global.user._id,
      value: 0
    };

    // Calculate the total reservation price
    var calcReservationPrice = function (dailyValue, dateStart, dateEnd) {
      dateStart = new Date(dateStart);
      dateEnd = new Date(dateEnd);

      return dailyValue * Math.floor((dateEnd.getTime()-dateStart.getTime())/(1000*60*60*24)) * 0.1;
    };

    // Get room information
    var findQuarto = function() {
      Quartos.get({
        quartoId: $scope.params.idQuarto
      }, function(quarto) {
        $scope.params.room = quarto;
        $scope.reservation.value = calcReservationPrice($scope.params.room.daily_price, $scope.reservation.date_in, $scope.reservation.date_out);
      });
    };

    findQuarto();    

    // Submit the form
    $scope.reservar = function () {
      // Make the payment
      var confirmPayment = confirm('Deseja continuar com o pagamento?');
      // var reserve;
      if (confirmPayment) {
        // Send register request
        $http.put('/api/reserva', {
          reservation: $scope.reservation,
          roomId: $scope.params.idQuarto,
          daily_value: $scope.params.room.daily_price
        })
          .success(function(test) {
            // Sucess
            console.log(test);
          })
          .error(function(error) {
            // Error: authentication failed
            console.log('Error');
          });
        } else {
          $location.url('/quartos');
        }
    };

  }
]);
