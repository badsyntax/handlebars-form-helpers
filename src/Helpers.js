// Helpers.js
// handlebars.js form helpers

(function(Handlebars) {

  Handlebars.registerHelper('form', function(options) {
    return '<form>' + options.fn(this) + '</form>';
  });

}(Handlebars));