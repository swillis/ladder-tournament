'use strict';

var angular = require('angular');
require('angular-ui-router');

require('./controllers/ng-welcome-controller'); 

var app = angular.module('app', [
	'ngWelcomeCtrl',
	'ui.router',
]).config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '../routes/home/home.template.html'
        })

        .state('home.team', {
        url: '/team',
        templateUrl: '../routes/home/team/home-team.template.html',
        controller: function ($scope) {
		    		$scope.team = ['James', 'Tom', 'Al', 'Max', 'Sam'];
		      }
		    })

		    // nested list with just some random string data
		    .state('home.paragraph', {
		        url: '/paragraph',
		        template: 'Making payments one less barrier to business'
		    })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
});

function isSupportedBrowser() {
  var hasJSON = 'JSON' in window && 'parse' in JSON;
  var supportMode = location.search.match(/supportMode/);
  return hasJSON && !supportMode;
}

angular.element(document).ready(function setup() {
  // Only give decent browser a js experience
  if (isSupportedBrowser()) {
    // Bootstrap Angular
    angular.bootstrap(document, ['app']);
  }
});