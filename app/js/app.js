'use strict';

var angular = require('angular');

require('./controllers/ng-welcome-controller'); 

angular.module('myApp', [
	'ngWelcomeCtrl'
]);