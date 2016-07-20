var _ast = require('../../../common/ast.js');

module.exports.generateRouteAST = function ( name, controller, templateUrl, url ) {

    var ast = {
        "type": "ObjectExpression",
        "properties": []
    }

    if ( name !== undefined ) {
        ast.properties.push( _ast.createStringProperty( 'name', name ) );
    } 

    if ( url !== undefined ) {
        ast.properties.push( _ast.createStringProperty( 'url', url ) );
    }


    if ( templateUrl !== undefined ) {
        ast.properties.push( _ast.createStringProperty( 'templateUrl', templateUrl ) );
    } 

    if ( controller !== undefined ) {
        ast.properties.push( _ast.createStringProperty( 'controller', controller ) );
    } 


    return ast;
}