(()=>{

	'use strict';


    /**
     * 
     * make main app configurations
     */
	angular.module('<%= appName %>').config( configFn );
		
	// dependencies
	configFn.$inject = [ ];

	function configFn() {

    }

} )();