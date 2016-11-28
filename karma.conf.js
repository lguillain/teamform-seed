//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
    'lib/jquery.min.js',
    'lib/angular.js',
    'lib/firebase.js',
    'lib/angularfire.min.js',
    'lib/angular-mocks.js',
    'js/router.js',
    'js/!(router).js',
    'unit_tests/*.js'	  
    ],
	exclude: [
		'js/firebase_storage.js'
	],
	preprocessors: {	 	
		 'js/site.js' : ['coverage'],		
		 'js/index.js' : ['coverage'],
		 'js/admin.js' : ['coverage'],
		 'js/team.js' : ['coverage'],
		 'js/member.js' : ['coverage']
	},
	reporters: ['progress', 'coverage'],
	coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: '.'
	},
	port: 8080,
	colors: true,
    browsers: ['Firefox'], //Changed from Chrome
	singleRun: true,
    plugins: [
    'karma-chrome-launcher', 
    'karma-firefox-launcher',     
    'karma-jasmine',
    'karma-coverage'
    ]    

  });
};
