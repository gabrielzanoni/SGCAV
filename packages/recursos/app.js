'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recursos = new Module('recursos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recursos.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Recursos.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Recursos.menus.add({
        title: 'Recursos',
        link: 'recursos',
        roles: ['administrador', 'especialista'],
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Recursos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Recursos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Recursos.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Recursos;
});
