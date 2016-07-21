var generator = require('yeoman-generator');
var path = require('path');
var walk = require('esprima-walk');
var recast = require('recast');
var routes = require('./tasks/routes.js')
var _ = require('lodash');
var urlJoin = require('url-join');
var generatorUtil = require('../../common/generator-util.js');


/**
 * 
 * Creates pages to be used with angular-ui-router
 */
module.exports = generator.Base.extend({
    constructor: function() {
        generator.Base.apply( this, arguments );   

        // process options
        this.option( 
            'name',
            {
                desc: 'Page name to be added',
                alias: 'n',
                type: 'string',
            }
        );     

        this.option(
            'url',
            {
                desc: 'Page url on the router',
                alias: 'u',
                type: 'string'
            }
        ); 
    },

    initializing: function () {
        // validate name
        if( !this.options.name ) {
            this.env.error( 'Page name should be specified' );
        }
    },
    
    writing: function () {

        var nameSplit = this.options.name.split('.');
        var fileName = _.kebabCase( _.last( nameSplit ) );
        var destPath = path.join.apply( null, nameSplit ); // slice(0,-1)
        var destUrl = urlJoin.apply( null, nameSplit ); // slice(0,-1)
        var appName = this.config.get('appName');

        // template options
        var options = {
            appName: appName,
            name: fileName,
        };

        this.composeWith('ng-spa:controller', { options: { name: fileName, path: destPath, module: 'pages', force: true } } )

        this.fs.copyTpl( 
            this.templatePath( '_page.partial.html' ), 
            this.destinationPath( path.join( 'src/js/modules/pages', destPath, fileName + '.partial.html' ) ), 
            options
        );

        // add route on routes.js
        var routesPath = this.destinationPath( path.join( 'src/js/modules/', appName , 'routes.js' ) );
        var routesContent = this.read( routesPath );

        var ast = recast.parse( routesContent );

        walk( ast,  node => {
            if
            ( 
                node.type == 'VariableDeclarator' && 
                node.id && 
                node.id.name == 'appRoutes' &&
                node.init &&
                node.init.type == 'ArrayExpression'
            )
            {
                node.init.elements.push( routes.generateRouteAST( 
                    this.options.name,
                    options.controllerName,
                    urlJoin( '/partials/modules/pages', destUrl, fileName + '.partial.html' ),
                    this.options.url
                ) );
            } 
        } );

        routesContent = recast.print( ast ).code;
        this.write( routesPath, routesContent );
    }
    
});