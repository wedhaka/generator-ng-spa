(()=>{

	'use strict';

	angular.module('<%= appName %>').config(router);
		
	// dependencies
	router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

	// router definition
	function router($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
		// Route all unmatched requests to the application root
		$urlRouterProvider.otherwise('/');

		// Enable HTML5 mode so that a # does not get appended to the URL
		// Browsers that don't support HTML5 history will display a hash-bang (!#) in front of the routes
		$locationProvider.html5Mode(true).hashPrefix('!');


        //routes
        // ! do not remove, used by yo generator !
        var appRoutes = [];

        appRoutes.forEach( route => {
            var name = route.name;
            delete route.name;
            $stateProvider.state( route.name, route  );
        } );

    }

} );