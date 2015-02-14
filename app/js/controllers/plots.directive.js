'use strict';

var _ = require('lodash');

angular.module('plotsComponentModule', [])
  .directive('plots', [
  '$http',
  function plotsDirective($http) {
    return {
      restrict: 'A',
      link: function(scope) {

        var plots;
        var isRequesting;
        var hasClicked;
        var plot;

        scope.isRequesting = false;
        scope.hasClicked = false;

        // Search terms designed to return very general results
        var words = ['the', 'you', 'me', 'us', 'our', 'love', 'war',
          'hate', 'red', 'blue', 'green', 'yellow', 'black', 'white',
          'sex', 'bird', 'tree', 'cat', 'dog', 'bear', 'day', 'night',
        ];

        function makePlots(plots) {
          var plots = plots.sort(function(a, b){
            return b.length - a.length;
          });

          var firstString = plots[0];
          var secondString = plots[1];

          secondString = secondString.slice(0,-1);

          var firstStringArray = firstString.split(' ');
          var secondStringArray = secondString.split(' ');

          firstStringArray = firstStringArray.splice(secondStringArray.length, firstStringArray.length);

          var plots = secondStringArray.concat(firstStringArray);
          plots = plots.join(' ');

          if (plots.indexOf("...") > -1 || firstStringArray.length === secondStringArray.length) {
            searchFilms();
          } else {
            scope.plot = plots;
            scope.isRequesting = false;
          }
        }

        function getPlot(response) {
          var shuffled = _.shuffle(response.data.Search)[0];
          return $http.get("http://www.omdbapi.com/?r=json&i="+shuffled.imdbID)
            .then(function(response){
              plots.push(response.data.Plot);
            });
        }

        var searchFilms = function() {
          plots = [];
          scope.hasClicked = true;
          scope.isRequesting = true;

          var firstTerm = _.shuffle(words)[0];
          var secondTerm = _.shuffle(words)[0];

          $http.get("http://www.omdbapi.com/?r=json&type=movie&s="+firstTerm)
            .then(function(response){
              return getPlot(response);
            })
            .then(function(){
              return $http.get("http://www.omdbapi.com/?r=json&type=movie&s="+secondTerm)
                .then(function(response){
                  return getPlot(response);
                });
            })
            .then(function(){
              makePlots(plots);
            });
        }

        scope.searchFilms = searchFilms;

      }
    };
  }
]);
