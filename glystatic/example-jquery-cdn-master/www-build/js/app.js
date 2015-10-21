define('jquery.alpha',["jquery"], function($) {
  $.fn.alpha = function() {
      return this.append('<p>Alpha is Go!</p>');
  };
});

define('jquery.beta',["jquery"], function($) {
  $.fn.beta = function() {
      return this.append('<p>Beta is Go!</p>');
  };
});

define('app/main',["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
    });
});

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);

define("app", function(){});

