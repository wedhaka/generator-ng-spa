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
 * Creates directives and attached templates/ partials
 */
module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply( this, arguments );   

        // process options
        this.option( 
            'name',
            {
                desc: 'Directive name to be added',
                alias: 'n',
                type: 'string',
            }
        ); 

        this.option( 
            'module',
            {
                desc: 'Name of the directives module',
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
            'template',
            {
                desc: 'Add template file for the directive (compiles with js)',
                alias: 't',
                type: 'boolean',
            }
        ); 

        this.option( 
            'html',
            {
                desc: 'Add html partial file for the directive (async load on demand)',
                alias: 'h',
                type: 'boolean',
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

        // validations
        if( !this.options.name ) {
            this.env.error( 'Directive name should be specified' );
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
        var templatePath = '';

        if( this.options.html ) {
            templatePath = urlJoin( 
                'partials/modules/', 
                this.options.module,
                this.options.path || '', 
                this.options.name + '.partial.html'
            );
        }

        if( this.options.template ) {
            templatePath = urlJoin( 
                this.options.module,
                this.options.path || '', 
                this.options.name + '.tpl.html'
            );
        }

        // template options
        var options = {
            moduleName: generatorUtil.getModuleName( appName, this.options.module ),
            directiveName: generatorUtil.getDirectiveName( this.options.module, this.options.name ),
            directiveFn: generatorUtil.getDirectiveFn( this.options.name ),
            appName: appName,
            name: this.options.name,
            templatePath: templatePath,
        };

        this.fs.copyTpl( 
            this.templatePath( '_directive.js' ), 
            this.destinationPath( path.join( 
                destPath, 
                this.options.path || '', 
                this.options.name + '.dir.js' 
            ) ), 
            options
        );

        if( this.options.template || this.options.html ) {
            this.fs.copyTpl( 
                this.templatePath( '_template.html' ), 
                this.destinationPath( path.join( 
                    destPath, 
                    this.options.path || '', 
                    this.options.name + ( this.options.template ? '.tpl.html' : '.partial.html' )
                ) ), 
                options
            );
        }


    }

});