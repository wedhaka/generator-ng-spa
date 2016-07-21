var path = require('path');
var _ = require('lodash');
var urlJoin = require('url-join');

module.exports.getModuleName = function ( appName, moduleName ) {
    return appName + '.' + moduleName;
};

module.exports.getControllerName = function ( moduleName, controllerName ) {
    return moduleName + 
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

module.exports.getServiceName = function ( moduleName, serviceName ) {
    return moduleName + 
        '.' + 
        _.camelCase( serviceName ) + 
        'Svc';
}

module.exports.getServiceFn = function ( serviceName ) {
    return _.camelCase( serviceName ) + 'Svc';
}