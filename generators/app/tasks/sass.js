
module.exports = function () {
    configFiles = [
        'atoms/_index.scss',
        'modules/_index.scss',
        'pages/_index.scss',
        'variables/_index.scss',
        'variables/_buttons.scss',
        'variables/_colours.scss',
        'variables/_spacing.scss',
        'variables/_typography.scss',
        'variables/_variables.scss',
        '_bootstrap_custom.scss',
        'styles.scss',
    ];

    var config = this.config.getAll();
    
    configFiles.forEach( file => {
        this.fs.copyTpl( 
            this.templatePath( 'sass/' + file ), 
            this.destinationPath( 'src/sass/' + file ), 
            config
        );
    } );
}