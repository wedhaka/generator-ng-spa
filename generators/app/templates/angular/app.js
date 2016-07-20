( () => {

	'use strict';

	/**
	 *
	 * main amguar app module
	 *
	 */


	// module dependencies
	// ! do not remove, used by yo generator !
	var appModules  = [];
	var vendorModules = ['ui.router'];

	angular.module('<%= appName %>', appModules.concat( vendorModules ));


	/**
	 *
	 * bootstrap angular app after document ready
	 * if we are loading external modules using require.js
	 * we can bootstrap the app after that
	 *
	 */

	angular.element(document).ready( () => {
		angular.bootstrap(document, ['<%= appName %>']);
	} );
	


} )();