module.exports.createStringProperty = function ( name, value ) {
    return {
        "type": "Property",
        "key": {
            "type": "Identifier",
            "name": name
        },
        "computed": false,
        "value": {
            "type": "Literal",
            "value": value
        },
        "kind": "init",
        "method": false,
        "shorthand": false
    };
};