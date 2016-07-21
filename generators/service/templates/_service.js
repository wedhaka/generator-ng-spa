(() => {

	/**
	 *
	 * <%= name %> servuce
	 *
	 */
	
	'use strict';

	angular.module('<%= moduleName %>')
		.service('<%= serviceName %>', <%= serviceFn %>);


	<%= serviceFn %>.$inject = [ ];


	/**
	 * 
	 * 
	 * constructor
	 */
	function <%= serviceFn %> ( ) {


	}


})();