'use strict';
angular.module('mean.users')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      // This object will be filled by the form
      $scope.user = {};

      // Register the login() function
      $scope.login = function() {
        $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
        })
          .success(function(response) {
            sessionStorage.roles = response.user.roles;
            sessionStorage._id = response.user._id;
            // authentication OK
            console.log(response.user);
            $scope.loginError = 0;
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function() {
            $scope.loginerror = 'Authentication failed.';
          });
      };
    }
  ])
  .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      $scope.user = {};

      $scope.tiposUsuarios = [
        {name:'Cliente', value:'cliente'},
        {name:'Gerente', value:'gerente'},
      ];

      $scope.register = function() {
        $scope.usernameError = null;
        $scope.registerError = null;
        $http.post('/register', {
          email: $scope.user.email,
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword,
          cpf: $scope.user.cpf,
          phone: $scope.user.phone,
          name: $scope.user.name,
          roles: $scope.user.role.value
        })
          .success(function() {
            // authentication OK
            $scope.registerError = 0;
            $rootScope.user = $scope.user;
            $rootScope.$emit('loggedin');
            $location.url('/');
          })
          .error(function(error) {
            // Error: authentication failed
            if (error === 'Username already taken') {
              $scope.usernameError = error;
            } else if (error === 'Email already taken') {
              $scope.emailError = error;
            } else $scope.registerError = error;
          });
      };
    }
  ])
  .controller('ForgotPasswordCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      $scope.user = {};
      $scope.forgotpassword = function() {
        $http.post('/forgot-password', {
          text: $scope.text
        })
          .success(function(response) {
            $scope.response = response;
          })
          .error(function(error) {
            $scope.response = error;
          });
      };
    }
  ])
  .controller('ResetPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams',
    function($scope, $rootScope, $http, $location, $stateParams) {
      $scope.user = {};
      $scope.resetpassword = function() {
        $http.post('/reset/' + $stateParams.tokenId, {
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword
        })
          .success(function(response) {
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function(error) {
            if (error.msg === 'Token invalid or expired')
              $scope.resetpassworderror = 'Could not update password as token is invalid or may have expired';
            else
              $scope.validationError = error;
          });
      };
    }
  ]);
