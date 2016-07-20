var path = require('path');
var _ = require('lodash');
var urlJoin = require('url-join');

module.exports.getModuleName = function ( appName, moduleName ) {
    return appName + '.' + moduleName;
};

module.exports.getControllerName = function ( appName, moduleName, controllerName ) {
    return appName +
        '.' +  
        moduleName + 
        '.' + 
        _.camelCase( controllerName ) + 
        'Ctrl';
};

module.exports.getControllerFn = function ( controllerName ) {
    return _.camelCase( controllerName ) + 'Ctrl';
}

module.exports.getDirectiveName = function ( moduleName, directiveName ) {
    return _.camelCase ( moduleName + 
            '.' + 
            directiveName
        );
};

module.exports.getDirectiveFn = function ( directiveName ) {
    return _.camelCase( directiveName ) + 'Dir';
}