'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Checkout = new Module('checkout');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Checkout.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Checkout.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Checkout.menus.add({
    title: 'Reservar',
    link: 'checkout example page',
    // roles: ['authenticated'],
    menu: 'main'
  });
  
  Checkout.aggregateAsset('css', 'checkout.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Checkout.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Checkout.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Checkout.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Checkout;
});
