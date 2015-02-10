'use strict';

angular.module('githubApiControllerModule', [])
  .controller('GithubApiController', [
    '$scope', '$http',
    function GithubApiController($scope, $http) {
        
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      $scope.searchFilms = function(searchTerm) {
        $http.get("http://www.omdbapi.com/?r=json&s="+searchTerm)
          .success(function(response) {
            var data  = response.Search;

            var arr = [];

            for (var i = 0; i < data.length; i++) {
              arr.push(data[i].imdbID);
            }

            var shuffledArray = shuffle(arr);

            var chosenIds = [];

            for (var i = 0; i < 2; i++) {
              chosenIds.push(shuffledArray[i]);
            }

            var plotArray = [];

            for (var i = 0; i < chosenIds.length; i++) {
              $http.get("http://www.omdbapi.com/?r=json&i="+chosenIds[i])
                .success(function(response) {
                  plotArray.push(response.Plot);
                });
            }

            $scope.plots = plotArray;

          });
      }

    }
  ]);