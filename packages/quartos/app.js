'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Quartos = new Module('quartos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Quartos.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Quartos.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Quartos.menus.add({
        title: 'Reservas',
        link: 'quartos',
        roles: ['cliente', 'gerente']
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Quartos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Quartos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Quartos.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Quartos;
});
