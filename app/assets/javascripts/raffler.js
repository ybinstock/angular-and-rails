
// requiring rails
var rafflerApp = angular.module("raffler", ["rails"]);

rafflerApp.factory("Player", function(railsResourceFactory){
  var resource = railsResourceFactory ({
    url: '/players',
    name: 'player'
  });
  return resource;

});

// require Player
rafflerApp.controller("RaffleController", [ "$scope", "Player", function ($scope, Player) {

  // debugging tool
  // window.scope = $scope

  Player.query().then(function (results) {
      $scope.players = results;
  });

   $scope.winner = function() {
    var players = $scope.players;

    console.log(players);
    var player = players[Math.floor(Math.random()*players.length)];
    console.log(player);
    player.winner = true;
    player.update();
    $scope.isWinner = player;
    return $scope.isWinner;
  };
  // scope draw winner function
  // pick a winner
  // mark winner
  // set player.winner = true and update server using player factory

  $scope.addPlayer = function() {
    console.log($scope.newName);
    var newPlayer = new Player ({
      name: $scope.newName,
      rating: 5,
      winner: false
    });
    newPlayer.create().then(function(newPlayerinRails){
      $scope.players.push(newPlayerinRails);
      console.log(newPlayerinRails);
    });
  };
  $scope.test = 123;


}]);
