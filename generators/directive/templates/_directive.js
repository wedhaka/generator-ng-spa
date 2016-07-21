(() => {

    /**
     * 
     * directive
     */

    angular.module( '<%= moduleName %>' )
        .directive( '<%= directiveName %>', <%= directiveFn %> );

    <%= directiveFn %>.$inject = [];

    /**
     * 
     * @description 
     */
    function <%= directiveFn %> () {

        return {
            restrict: 'AEC',
            scope: {},
            <% if( templatePath ) { %>templateUrl: '<%= templatePath %>',<% } %> 
            link: ( scope, element, attr ) => {

            }
        }

    }
})();