'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Cenarios = new Module('cenarios');

var htmlToPdf = require('html-to-pdf');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Cenarios.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Cenarios.routes(app, auth, database);

    Cenarios.htmlToPdf = htmlToPdf;

    Cenarios.gerarRelatorio = function(){
      console.log('gerarRelatorio');
      htmlToPdf.convertHTMLFile('path/to/source.html', 'path/to/destination.pdf',
          function (error, success) {
             if (error) {
                  console.log('Oh noes! Errorz!');
                  console.log(error);
              } else {
                  console.log('Woot! Success!');
                  console.log(success);
              }
          }
      );
    };

    //We are adding a link to the main menu for all authenticated users
    Cenarios.menus.add({
        title: 'Cenarios',
        link: 'cenarios',
        roles: ['administrador', 'especialista']
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Cenarios.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Cenarios.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Cenarios.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Cenarios;
});
