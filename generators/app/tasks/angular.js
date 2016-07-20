module.exports.scafoldApp = function () {

    var base = 'angular';
    var build = 'src/js/';
    var files = [
        'app.js',
        'routes.js',
        { src: 'js/index/index.ctrl.js', dest: 'modules/pages/' },
        { src: 'js/index/pages_module.js', dest: 'modules/pages/' },
    ];




    // create app.js
    this.fs.copyTpl( 
            this.templatePath( 'angular/app.js' ), 
            this.destinationPath( 'src/js/app.js' ), 
            this.props
        );

    // create routes.js
    this.fs.copyTpl( 
            this.templatePath( 'angular/routes.js' ), 
            this.destinationPath( 'src/js/routes.js' ), 
            this.props
        );
}