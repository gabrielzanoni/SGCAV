'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Missoes = new Module('missoes');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Missoes.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Missoes.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Missoes.menus.add({
        title: 'Missoes',
        link: 'missoes',
        roles: ['administrador', 'policial/bombeiro','agente', 'coordenador']
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Missoes.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Missoes.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Missoes.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Missoes;
});
