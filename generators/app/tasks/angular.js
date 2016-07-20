module.exports.scafoldApp = function () {

    var base = 'angular';
    var build = 'src/js/';
    var files = [
        'app.js',
        'routes.js',
        { src: 'js/index/index.ctrl.js', dest: 'modules/pages/' },
        { src: 'js/index/pages_module.js', dest: 'modules/pages/' },
    ];


    var config = this.config.getAll();

    // create app.js
    this.fs.copyTpl( 
            this.templatePath( 'angular/app.js' ), 
            this.destinationPath( 'src/js/app.js' ), 
            config
        );

    // create routes.js
    this.fs.copyTpl( 
            this.templatePath( 'angular/routes.js' ), 
            this.destinationPath( 'src/js/routes.js' ), 
            config
        );

    // create index.html
    this.fs.copyTpl( 
            this.templatePath( 'index.html' ), 
            this.destinationPath( 'src/index.html' ), 
            config
        );

    // create pages module and index page
    this.composeWith('ng-spa:module', { options: { name: 'pages' } });
    this.composeWith('ng-spa:page', { options: { name: 'index', url: '/' } } )

}