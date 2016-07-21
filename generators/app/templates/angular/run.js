(()=>{

	'use strict';


    /**
     * 
     * make run time tasks
     */
	angular.module('<%= appName %>').run( runFn );
		
	// dependencies
	runFn.$inject = [ ];

	function runFn() {

    }

} )();