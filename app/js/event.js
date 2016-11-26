var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray', 'searchService',
  function ($scope, $firebaseArray, searchService) {
    $scope.searchText = "";
    // $scope.startSearch = function(){
    //   $scope.events = searchService.startSearchEvent($scope.searchText)
    // };
    var ref = firebase.database().ref('TeamForm/events');
    $scope.events = $firebaseArray(ref);
    $scope.searchText;

    var startSearch = function (text) {
      var events = [];
      var flag = false;
      var database = firebase.database();
      var query = database.ref("TeamForm/events/");
      query.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var name = childSnapshot.child("name").val();
          if (name == text) {
            var event = childSnapshot.val();
            event.$id = childSnapshot.key;
            events.push(event);
          } else {
            var tags = childSnapshot.child("tags");
            tags.forEach(function (tagSnapshot) {
              if (tagSnapshot.val() == text) {
                var event = childSnapshot.val();
                event.$id = childSnapshot.key;
                events.push(event);
              }
            });
          }
        });
        if (events.length == 0) alert("your search had no matches");
        $scope.events = events;
        $scope.$digest();

      });
      return;

    }

    $scope.startSearch = function () {
      startSearch($scope.searchText);
    }

  }])

  .controller('eventCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
    function ($scope, $firebaseObject, $stateParams, $firebaseArray) {
      var ref = firebase.database().ref('TeamForm/events/' + $stateParams.id);
      var admin = firebase.auth().currentUser;
      var refTeams = firebase.database().ref('TeamForm/teams/').orderByChild("event").equalTo($stateParams.id);
      $firebaseObject(ref).$loaded().then(function (data) {
        $scope.isAdmin = admin? data.admin == admin.uid : false;
        $scope.event = data;
      });

      $scope.teams = $firebaseArray(refTeams);
      $scope.searchText;

      var startSearch = function (text) {
        var teams = [];
        var flag = false;
        var database = firebase.database();
        var query = database.ref("TeamForm/teams/");
        query.once("value").then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var name = childSnapshot.child("name").val();
            if (name == text) {
              var event = childSnapshot.val();
              event.$id = childSnapshot.key;
              teams.push(event);
            } else {
              var tags = childSnapshot.child("tags");
              tags.forEach(function (tagSnapshot) {
                if (tagSnapshot.val() == text) {
                  var event = childSnapshot.val();
                  event.$id = childSnapshot.key;
                  teams.push(event);
                  console.log(event);
                }
              });
            }
          });
          if (teams.length == 0) alert("your search had no match");
          $scope.teams = teams;
          $scope.$digest();

        });
        return;
      }
      $scope.startSearch = function () {
        startSearch($scope.searchText);
      }



    }])
