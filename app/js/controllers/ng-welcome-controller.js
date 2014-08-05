'use strict';

angular.module('ngWelcomeCtrl', [])
  .controller('NgWelcome', [
    '$scope', '$window',
    function NgWelcome($scope, $window) {
    	$scope.testVar = 'This text is being controlled by NgWelcomeCtrl'
    }
  ]);