var app = angular.module('teamformApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		//route for the home page
		.state('about', {
			url: '/about',
			templateUrl: 'pages/main.html',
			authenticate: false
		})
		.state('myProfile', {
			url: '/profile',
			templateUrl: 'pages/createProfile.html',
			authenticate: true
		})

		.state('userProfile', {
			url: '/userprofile',
			templateUrl: 'pages/userProfile.html',
			authenticate: true
		})

		.state('logout', {
			url: "/logout",
			templateUrl: 'pages/main.html',
			authenticate: false

		})

		.state('events', {
			url: '/events',
			templateUrl: 'pages/event.html',
			authenticate: false
		})

		.state('createEvent', {
			url: "/createEvent",
			templateUrl: 'pages/createEvent.html',
			authenticate: true
		})

		.state('eventPage', {
			url: "eventPage",
			templateUrl: 'pages/event_info.html',
			authenticate: false
		})

		.state('adminEvent', {
			url: "/adminEvent",
			templateUrl: 'pages/event_admin.html',
			authenticate: true
		})
		$urlRouterProvider.otherwise("about");
})
.run(function ($rootScope, $state, loginService) {


  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !loginService.isLoggedIn.get()){
	  alert("Please login first");
      $state.transitionTo("about");
      event.preventDefault(); 
    }

  	});
});
