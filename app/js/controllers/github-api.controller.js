'use strict';

var _ = require('lodash');

angular.module('githubApiControllerModule', [])
  .controller('GithubApiController', [
    '$scope', '$http',
    function GithubApiController($scope, $http) {
        

      // Take 2 search terms

      var plots = [];
      $scope.plots = plots;

      function logError() {
        console.log("There's been a problem.");
      }

      function shuffleResult(result) {
        var shuffled = _.shuffle(result)[0];
        searchById(shuffled.imdbID);
      }

      function searchById(id) {
        $http.get("http://www.omdbapi.com/?r=json&plot=short&i="+id)
          .then(function(response){
            plots.push(response.data.Plot);
          });
      }

      function doStuff(plots) {
        console.log(plots);
      }

      $scope.searchFilms = function() {
        
        plots = [];

        var words = ['the', 'you', 'me', 'us', 'our', 'love', 'war',
          'hate', 'red', 'blue', 'green', 'yellow', 'black', 'white',
          'sex', 'bird', 'tree', 'cat', 'dog', 'bear', 'day', 'night',
        ];

        var firstTerm = _.shuffle(words)[0];
        var secondTerm = _.shuffle(words)[0];

        $http.get("http://www.omdbapi.com/?r=json&s="+firstTerm)
          .then(function(response){

            shuffleResult(response.data.Search);

            $http.get("http://www.omdbapi.com/?r=json&s="+secondTerm)
              .then(function(response){
                shuffleResult(response.data.Search);
                doStuff(plots);
              });
          });


        // $http.get("http://www.omdbapi.com/?r=json&s="+searchTerm)
        //   .success(function(response) {
        //     var data  = response.Search;

        //     var arr = [];

        //     for (var i = 0; i < data.length; i++) {
        //       arr.push(data[i].imdbID);
        //     }

        //     var shuffledArray = _.shuffle(arr);

        //     var chosenIds = [];

        //     for (var i = 0; i < 2; i++) {
        //       chosenIds.push(shuffledArray[i]);
        //     }

        //     var plotArray = [];

        //     for (var i = 0; i < chosenIds.length; i++) {
        //       $http.get("http://www.omdbapi.com/?r=json&i="+chosenIds[i])
        //         .success(function(response) {
        //           plotArray.push(response.Plot);
        //         });
        //     }

        //     $scope.plots = plotArray;

        //   });
      }

    }
  ]);