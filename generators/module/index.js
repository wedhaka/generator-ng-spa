var generator = require('yeoman-generator');
var walk = require('esprima-walk');
var fs = require('fs');
var path = require('path');
var recast = require('recast');


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
                desc: 'Module name to be added',
                alias: 'n',
                type: 'string',
            }
        ); 

         
    },

    initializing: function () {
        // validate name
        if( !this.options.name ) {
            this.env.error( 'Module name should be specified' );
        }
    },
    
    writing: function () {
        // make module
        var moduleName = this.config.get('appName') +  '.' + this.options.name;

        this.fs.copyTpl( 
            this.templatePath( '_module.js' ), 
            this.destinationPath( path.join( 'src/js/modules/', this.options.name, '_module.js' ) ), 
            { moduleName : moduleName }
        );

        // add module to app dependencies
        var appPath = this.destinationPath( path.join( 
                'src/js/modules/', 
                this.config.get('appName'), 
                '_module.js' 
            ) );
        
        var appContent = this.read( appPath );

        var ast = recast.parse( appContent );

        walk( ast,  node => {
            if
            ( 
                node.type == 'VariableDeclarator' && 
                node.id && 
                node.id.name == 'appModules' &&
                node.init &&
                node.init.type == 'ArrayExpression'
            )
            {
                node.init.elements.push( {
                    "type": "Literal",
                    "value": moduleName,
                } );
            } 
        } );

        appContent = recast.print( ast ).code;
        this.write( appPath, appContent );
    },
    
});