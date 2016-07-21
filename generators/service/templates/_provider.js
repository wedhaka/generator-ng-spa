(() => {

	/**
	 *
	 * <%= name %> factory
	 *
	 */
	
	'use strict';

	angular.module('<%= moduleName %>')
		.provider('<%= serviceName %>', <%= serviceFn %>);


	<%= serviceFn %>.$inject = [ ];

	function <%= serviceFn %> ( ) {

		// service api
		var servive = {

		}
		
		// service api + provider api
		var re = {
			$get: service,
		};

		return re;

		// declare functions here

	}


})();