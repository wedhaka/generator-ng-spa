require('dotenv').config();
var fs = require('fs');
var util = require('gulp-util');
var del = require('del');
var path = require('path');
var flag = require('node-env-flag');
var merge = require('merge-stream');
var gulpMerge = require('gulp-merge');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulpSequence = require('gulp-sequence').use(gulp);
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync');
var modRewrite  = require('connect-modrewrite');
var templateCache = require('gulp-angular-templatecache');
var cssPrefix = require('gulp-autoprefixer');
var sourcemaps = require( 'gulp-sourcemaps' );
var file = require('gulp-file');
    



/*=====================================
=            util / config            =
=====================================*/

var env = process.env;

var envConfig = {};

// set defaults
envConfig.ENV = util.env.env || env.ENV || 'live';
envConfig.BUILD_PATH = env.BUILD_PATH || 'app';
envConfig.JS_MINIFY = env.JS_MINIFY || true;
envConfig.CSS_MINIFY = env.CSS_MINIFY || true;
envConfig.CSS_PREFIX = env.CSS_PREFIX || true;
envConfig.JS_LINT = env.JS_LINT || false;
envConfig.JS_MAPS = env.JS_MAPS || false;

envConfig.APP_API = env.APP_API || 'http://api.conference.irs.wisnz.co.nz';

console.log( envConfig );

var config = {
    //src
    srcDir: './src',
    vendorDir: './vendor',
    bootstrapDir: './vendor/bower_components/bootstrap-sass',
    sassDir: './src/sass/**/*.scss',
    jsDir: './src/js',

};

//bower dir
config.bowerDir = config.vendorDir + '/bower_components';
//js vendor
config.vendorSrc = [
    path.join( config.bowerDir, 'angular/angular.min.js' ),
    path.join( config.bowerDir, 'angular-animate/angular-animate.min.js' ),
    path.join( config.bowerDir, 'angular-ui-router/release/angular-ui-router.min.js' ),
    path.join( config.bowerDir, 'angular-bootstrap/ui-bootstrap-tpls.min.js' ),
    path.join( config.bowerDir, 'angular-bootstrap/ui-bootstrap.min.js' )
];

//static
config.staticSrc = [
    { src: path.join( config.srcDir, 'index.html' ), dest: null },
    { src: path.join( config.bowerDir, '/font-awesome/**/*' ), dest: 'font-awesome' }
];

// js src
config.jsSrc = [
	path.join( config.jsDir, '/**/_module.js' ),
    path.join( config.jsDir, '/**/*.js' ),
];





/**
 *
 * get child folders on a given directry
 *
 */

function getFolders(dir) 
{
	return fs.readdirSync(dir)
		.filter(function(file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
};


gulp.task('clean', function () {
	return del([
		path.join( envConfig.BUILD_PATH , '/**/*' ),
	]);
});


// tasks
gulp.task( 'css', css );
gulp.task( 'js', ['lint'], jsAndTemplates );
gulp.task('vendor', vendor);
gulp.task('static', static);
gulp.task('partials', partials);



// linting functions
gulp.task('lint', function(){
	gulp.src( path.join( config.jsDir, '/**/*.js' ) )
        .pipe( gulpIf( flag( envConfig.JS_LINT ), jshint('.jshintrc') ) )
		.pipe( jshint.reporter('jshint-stylish') );
});

// watches js and .tpl.html files
gulp.task( 'watch:js', ['js'], function(){
	gulp.watch( [ 
		path.join( config.jsDir, '/**/*.js' ),
		path.join( config.jsDir, '/**/*.tpl.html' )
	], ['js'] );
} );


gulp.task( 'watch:css', ['css'], function(){
	gulp.watch( config.sassDir , ['css'] );
} );

gulp.task('watch:partials', ['partials'], function(){
    gulp.watch( config.srcDir + '/**/*.partial.html', ['partials'] );
});


gulp.task('default', gulpSequence( 'clean', ['css', 'js', 'vendor', 'static', 'partials'] ));
gulp.task('watch', ['watch:css', 'watch:js', 'watch:partials'])
gulp.task('serve', ['watch'], function(){
    browserSync({
        server: {
            baseDir: [ envConfig.BUILD_PATH, 'src/html' ],
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ],
            index: 'index.html'
        },
        notify: false
    });
});








/*==================================
=            javascript            =
==================================*/



/**
 *
 * compiles all js files and template files and outputs a single file
 *
 */

function jsAndTemplates () {
    return gulpMerge (
            templates(),
            jsConfig(),
            js()
        )
        .pipe( concat('app.js') )
        // if minify do miinfy
        .pipe( gulpIf( flag( envConfig.JS_MINIFY ), uglify() ) )
        .pipe( gulpIf( flag( env.JS_MAPS ), sourcemaps.write() ) )
        .pipe(gulp.dest( path.join( envConfig.BUILD_PATH, '/js' ) ));
}

// processes all js files
function js ()
{
    return gulp.src( config.jsSrc )
        .pipe( gulpIf( flag( env.JS_MAPS ),  sourcemaps.init() ) )
        .pipe(plumber())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(babel({
            presets: ['es2015']
        }));
}


// processes all angular template files to templateCache
var tplUrlPtrn = /\/*src\/js\/*/i;
function templates ()
{
    return gulp.src( path.join( config.jsDir, '/**/*.tpl.html' ) )
        .pipe( templateCache({
            module: '<%= appName %>',
            transformUrl: function ( url ) {
                return url.replace( tplUrlPtrn, '' );
            }
		} ) );
}

// process the current app config
function jsConfig ()
{
    var str = 'window.appConfig = ' + JSON.stringify( envConfig ) + ';';

    return file('primus.js', str, { src: true })
}




/**
 *
 * combine all vendor files
 *
 */


function vendor ()
{
    return gulp.src( config.vendorSrc )
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest( path.join( envConfig.BUILD_PATH, '/js' ) ));
}





/*===========================
=            css            =
===========================*/

function css ()
{
    return gulp.src(config.sassDir)
    	.pipe(plumber())
	    .pipe(sass({
	        includePaths: [
	        	config.bootstrapDir + '/assets/stylesheets',
	        ],
	    }).on('error', sass.logError))
		.pipe(gulpIf( flag( envConfig.CSS_PREFIX ), cssPrefix({ browsers: ['> 1%', 'IE 9'], cascade: false }) ))
        .pipe(gulpIf( flag( envConfig.CSS_MINIFY ), uglifycss() ))
	    .pipe(gulp.dest( path.join( envConfig.BUILD_PATH, 'css' ) ))
	    .pipe(browserSync.stream());
};


/*==============================
=            static            =
==============================*/

/**
 *
 * copy all static assets listed in staticSrc
 *
 */

function static ()
{

    // get seperate tasks for moving files
    var tasks = config.staticSrc.map(function( asset ){
        var dest = asset.dest ? path.join( envConfig.BUILD_PATH, asset.dest ) : envConfig.BUILD_PATH;

        return gulp.src( asset.src )
            .pipe( gulpIf( asset.rename ? true : false, rename( asset.rename ) ) )
            .pipe( gulp.dest( dest ) );
    });

    // merge all streams and return as single stream
    return merge( tasks );
}


/*================================
=            partials            =
================================*/


/**
 *
 * copy html partials to their respective directories
 *
 */

function partials ()
{
    gulp.src( path.join( config.jsDir, '/**/*.partial.html' ) )
        .pipe( gulp.dest( path.join( envConfig.BUILD_PATH, '/partials' ) ) );
}


