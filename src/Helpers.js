// Helpers.js
// handlebars.js form helpers
(function (Handlebars) {

  function openTag(type, attr) {
    var html = ['<' + type];
    for (var prop in attr) {
      html.push(prop + '="' + attr[prop] + '"');
    }
    return html.join(' ') + '>';
  }

  function closeTag(type) {
    return '</' + type + '>';
  }

  function element(type, attr, contents) {
    return openTag(type, attr) + (contents || '') + closeTag(type);
  }

  function extend(obj1, obj2) {
    for (var prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  }

  Handlebars.registerHelper('form', function (url, options) {
    return element('form', extend({
      action: url,
      method: 'POST'
    }, options.hash), options.fn(this));
  });

}(Handlebars));