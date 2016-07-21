var generator = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var configTask = require('./tasks/config.js');
var angularTasks = require('./tasks/angular.js');
var sassTasks = require('./tasks/sass.js');

module.exports = generator.Base.extend({
    constructor: function() {
        generator.Base.apply( this, arguments );        
    },

    prompting: function () {
        
        var prompts = [
            {
                type: 'input',
                name: 'packageName',
                message: 'Package name?',
                default: process.cwd().split(path.sep).pop(),
            },
            {
                type: 'input',
                name: 'appName',
                message: 'Angular app module name?',
                default: 'app',
            }
        ];

        this.props = this.props || {};

        return this.prompt( prompts )
            .then( props => {
                Object.assign( this.props, props );
                this.config.set( this.props );
            } );
    },

    writing:  {
        
        // copy configuration
        copyConfiguration: configTask,
        prepareAngular: angularTasks.scafoldApp,
        prepareSass: sassTasks,
    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.spawnCommand('gulp', []);
    },
});