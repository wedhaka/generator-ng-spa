var generator = require('yeoman-generator');
var walk = require('esprima-walk');
var fs = require('fs');
var path = require('path');
var recast = require('recast');
var fsUtil = require('../../common/file.js');
var generatorUtil = require('../../common/generator-util.js');
var urlJoin = require('url-join');
var _ = require('lodash');

/**
 * 
 * Creates services
 */
module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply( this, arguments );  

        this.serviceTypes = [ 'service', 'factory', 'provider' ];

        // process options
        this.option( 
            'name',
            {
                desc: 'Service name to be added',
                alias: 'n',
                type: 'string',
            }
        ); 

        this.option( 
            'module',
            {
                desc: 'Name of the service\'s module',
                alias: 'm',
                type: 'string',
            }
        ); 

        this.option( 
            'path',
            {
                desc: 'Overide default path relative to the module',
                alias: 'p',
                type: 'string',
            }
        ); 

        this.option( 
            'type',
            {
                desc: 'Type of the service ' + this.serviceTypes
                    .map( s => '\'' + s + '\'' )
                    .join(', '),
                alias: 't',
                type: 'string',
            }
        ); 

        this.option( 
            'force',
            {
                desc: 'Force skip module validation',
                alias: 'f',
                type: 'string',
            }
        ); 

         
    },

    initializing: function () {

        // make case insensitive or assign default
        this.options.type = this.options.type && this.options.type.toLowerCase() || 
            'factory';

        // validations
        if( !this.options.name ) {
            this.env.error( 'Service name should be specified' );
        }

        // check if module exists
        if( this.options.module && !this.options.force ) {
            if( !fsUtil.isDir( path.join( 
                this.destinationPath( 'src/js/modules' ), 
                this.options.module ) 
            ) ) {
                this.env.error( 'Specified module does not exist' );
            }
        }

        // check if service name is correct
        if( this.serviceTypes.indexOf( this.options.type ) < -1 ) {
            this.env.error( 'Specified type of service does not exist' );
        }

    },

    prompting: function () {

        var prompts = [];

        if ( !this.options.module ) {
            var modules = fsUtil.getDirNames( this.destinationPath( 'src/js/modules' ) );

            prompts.push({
                    name: 'module',
                    type: 'list',
                    message: 'Service\'s module name',
                    choices: modules,
                })
        }

        return this.prompt( prompts )
            .then( ( props ) => {
                Object.assign( this.options, props );
            } );     

    },

    writing: function () {

        var appName = this.config.get('appName');
        var destPath = path.join( 
                'src/js/modules/', 
                this.options.module, 
                this.options.path || '',
                _.kebabCase( this.options.name ) + '.svc.js'
            );

        // template options
        var options = {
            moduleName: generatorUtil.getModuleName( appName, this.options.module ),
            serviceName: generatorUtil.getServiceName( this.options.module, this.options.name ),
            serviceFn: generatorUtil.getServiceFn( this.options.name ),
            appName: appName,
            name: this.options.name,
        };
        
        this.fs.copyTpl( 
            this.templatePath( '_' + this.options.type + '.js' ), 
            this.destinationPath( destPath ), 
            options
        );

    }

});