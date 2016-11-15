'use strict';
//create new module
var app = angular.module("teamformApp");
app.factory('loginService', function ($location) {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  var database = firebase.database();
  var storage = firebase.storage();
  var user;
  var isLogged = false;
  var isLoggedIn = {};
  isLoggedIn.get = function(){
    return isLogged;
  }
  isLoggedIn.set = function(boolean){
    isLogged = boolean;
  }
  var login = function ($scope, $state) {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        isLoggedIn.set(true);
        $scope.$digest();
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // ...some useful variables
        var displayName = $scope.user.displayName;
        var email = $scope.user.email;
        var emailVerified = $scope.user.emailVerified;
        var photoURL = $scope.user.photoURL;
        var isAnonymous = $scope.user.isAnonymous;
        var uid = $scope.user.uid;
        var providerData = $scope.user.providerData;
        

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
      
    };

  return {
    isLoggedIn, 
    login,
    updateUser: function ($scope) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          database.ref('TeamForm/users/' + user.uid).set({
            name: user.displayName,
            email: (user.email ? (user.email) : null),
            profile_picture: user.photoURL,
            description: "Hi there! My name is " + user.displayName
          });
        } 
      });
    },

    logout: function () {
      isLoggedIn.set(false);
      firebase.auth().signOut();
    }
  }
});


//handels ng-hide and click events to show or hide login button
app.controller("AuthCtrl", ['$scope', 'loginService', '$state',
  function ($scope, loginService, $state) {

    //define show or hide login resp logout button
    $scope.isLoggedIn = loginService.isLoggedIn.get();

    //call login function on click
    $scope.login = function () {
      loginService.login();

    };

    //change value of isLogged in if user logs in or out
    firebase.auth().onAuthStateChanged(function (user) {
       $scope.isLoggedIn = loginService.isLoggedIn.get();
       $scope.$digest();
       if(user)$state.transitionTo("createProfile");
       
    });
    //call logout function on click
    $scope.logout = function () {
      loginService.logout();
    };

  }]);
