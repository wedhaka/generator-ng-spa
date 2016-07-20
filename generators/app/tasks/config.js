
module.exports = function () {
    configFiles = [
        '.bowerrc',
        '.env',
        '.gitignore',
        '.jshintrc',
        'bower.json',
        'gulpfile.js',
        'jsconfig.json',
        'package.json'
    ];
    
    configFiles.forEach( file => {
        this.fs.copyTpl( 
            this.templatePath( 'config/_' + file ), 
            this.destinationPath( file ), 
            this.props
        );
    } );
}