var generator = require('yeoman-generator');
var walk = require('esprima-walk');
var fs = require('fs');
var path = require('path');
var recast = require('recast');
var fsUtil = require('../../common/file.js');
var generatorUtil = require('../../common/generator-util.js');
var urlJoin = require('url-join');


/**
 * 
 * Creates controllers
 */
module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply( this, arguments );   

        // process options
        this.option( 
            'name',
            {
                desc: 'Controller name to be added',
                alias: 'n',
                type: 'string',
            }
        ); 

        this.option( 
            'module',
            {
                desc: 'Name of the controller\'s module',
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
         
    },

    initializing: function () {

        // validations
        if( !this.options.name ) {
            this.env.error( 'Controller name should be specified' );
        }

        // check if module exists
        if( this.options.module ) {
            if( !fsUtil.isDir( path.join( 
                this.destinationPath( 'src/js/modules' ), 
                this.options.module ) 
            ) ) {
                this.env.error( 'Specified module does not exist' );
            }
        }
        

    },

    prompting: function () {

        if ( !this.options.module ) {
            var modules = fsUtil.getDirNames( this.destinationPath( 'src/js/modules' ) );

            return this.prompt({
                name: 'module',
                type: 'list',
                message: 'Directive\'s module name',
                choices: modules,
            }).then( ( props ) => {
                Object.assign( this.options, props );
            } );
        }        

    },

    writing: function () {

        var appName = this.config.get('appName');
        var destPath = path.join( 'src/js/modules/', this.options.module );

        // template options
        var options = {
            moduleName: generatorUtil.getModuleName( appName, this.options.module ),
            controllerName: generatorUtil.getControllerName( appName, this.options.module, this.options.name ),
            controllerFn: generatorUtil.getControllerFn( this.options.name ),
            appName: appName,
            name: this.options.name,
        };

        this.fs.copyTpl( 
            this.templatePath( '_ctrl.js' ), 
            this.destinationPath( path.join( 
                destPath, 
                this.options.path || '', 
                this.options.name + '.ctrl.js' 
            ) ), 
            options
        );

    }

});