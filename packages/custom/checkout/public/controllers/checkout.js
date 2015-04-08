'use strict';

/* jshint -W098 */
angular.module('mean.checkout').controller('CheckoutController', ['$scope', '$http', '$location', 'Global', 'Checkout', 'Quartos',
  function($scope, $http, $location, Global, Checkout, Quartos) {
    $scope.global = Global;
    $scope.package = {
      name: 'checkout'
    };

    $scope.params = {
      idQuarto: '55253011096e4ce76996348a',
      idUsuario: '55253011096e4ce76996348a',
      dateStart: '2015-04-16',
      dateEnd: '2015-04-18',
      room: {}
    };

    $scope.user = {};

    $scope.reservation = {
      date_in: '2015-04-16',
      date_out: '2015-04-18',
      client: '55253011096e4ce76996348a',
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
      var reserve 
      if (confirmPayment) {
        // Send register request
        $http.post('/api/reserva', {
          reservation: {
            date_in: '2015-04-16',
            date_out: '2015-04-18',
            client: '55253011096e4ce76996348a',
            value: 0
          },
          roomId: '123123123',
          daily_value: '1231231'
        })
          .success(function() {
            // Sucess
            console.log("Check");
          })
          .error(function(error) {
            // Error: authentication failed
            console.log("Error");
          });
        } else {
          $location.url('/quartos');
        };
    };

  }
]);
