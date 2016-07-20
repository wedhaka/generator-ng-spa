var fs = require('fs');
var path = require('path');

module.exports.getDirNames = function ( dir ) {
    return fs.readdirSync( dir )
		.filter(function(file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
};


module.exports.isDir = function ( path ) {
    var isDir = false;
    
    try {
        isDir = fs.lstatSync( path ).isDirectory()
    } catch ( e ) { } finally {
        return isDir;
    }
    
};