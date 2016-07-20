(() => {
	/**
	 *
	 * <%= name %> page controlelr
	 *
	 */
	
	'use strict';

	angular.module('<%= moduleName %>')
		.controller( '<%= controllerName %>', <%= controllerFn %> );

	<%= controllerFn %>.$inject = [ '$scope' ];

	function <%= controllerFn %> ( $scope ) {

		// define data
		$scope.data = {};

		// define view data
		$scope.viewData = {};

		// define actions
		$scope.actions = {};
    }
} );