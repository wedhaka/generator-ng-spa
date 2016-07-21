(() => {

	/**
	 *
	 * <%= name %> factory
	 *
	 */
	
	'use strict';

	angular.module('<%= moduleName %>')
		.factory('<%= serviceName %>', <%= serviceFn %>);


	<%= serviceFn %>.$inject = [ ];

	function <%= serviceFn %> ( ) {

		// factory api
		var fac = {

		}

		return fac;

		// declare functions hare

	}


})();