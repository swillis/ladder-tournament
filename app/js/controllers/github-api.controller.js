'use strict';

var _ = require('lodash');

angular.module('githubApiControllerModule', [])
  .controller('GithubApiController', [
    '$scope', '$http',
    function GithubApiController($scope, $http) {
  
      var plots = [];

      function doStuff(plots) {
        console.log(plots);
        $scope.plots = plots.sort(function(a, b){
          return b.length - a.length;
        });
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

            var shuffled = _.shuffle(response.data.Search)[0];

            $http.get("http://www.omdbapi.com/?r=json&i="+shuffled.imdbID)
              .then(function(response){

                plots.push(response.data.Plot);

              })
              .then(function(){

                $http.get("http://www.omdbapi.com/?r=json&s="+secondTerm)
                  .then(function(response){

                    var shuffled = _.shuffle(response.data.Search)[0];

                    $http.get("http://www.omdbapi.com/?r=json&i="+shuffled.imdbID)
                      .then(function(response){

                        plots.push(response.data.Plot);

                      }).then(function(){

                        doStuff(plots);

                      });
                  });
              })
          });
      }

    }
  ]);