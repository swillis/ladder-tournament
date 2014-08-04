'use strict';

var angular = require('angular');

var NgWelcomeCtrl = require('./controllers/ng-welcome-controller');

var app = angular.module('myApp', []);
app.controller('NgWelcomeCtrl', ['$scope', NgWelcomeCtrl]);