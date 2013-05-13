/**
 * handlebars.js form helpers
 * https://github.com/badsyntax/handlebars-form-helpers
 * Created by Richard Willis (badsyntax.co)
 */

(function(Handlebars) {

  function openTag(type, closing, attr) {
    var html = ['<' + type];
    for (var prop in attr) {
      html.push(prop + '="' + attr[prop] + '"');
    }
    return html.join(' ') + (!closing ? ' /' : '') + '>';
  }

  function closeTag(type) {
    return '</' + type + '>';
  }

  function element(type, closing, attr, contents) {
    return openTag(type, closing, attr) + (closing ? (contents || '') + closeTag(type) : '');
  }

  function extend(obj1, obj2) {
    for (var prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  }

  /**
   * Expression helpers need to be returned as safe strings via new Handlebars.SafeString()
   */

  /* {{#form url class="form"}}{{/form}} */
  Handlebars.registerHelper('form', function(url, options) {
    return element('form', true, extend({
      action: url,
      method: 'POST'
    }, options.hash), options.fn(this));
  });

  /* {{input "name" person.name}} */
  Handlebars.registerHelper('input', function(id, value, options) {
    return new Handlebars.SafeString(element('input', false, extend({
      id: id,
      value: value,
      type: 'text'
    }, options.hash)));
  });

  /* {{label "name" "Please enter your name"}} */
  Handlebars.registerHelper('label', function(id, text, options) {
    return new Handlebars.SafeString(element('label', true, extend({
      'for': id
    }, options.hash), text));
  });

  /* {{button "Submit form"}} */
  Handlebars.registerHelper('button', function(text, options) {
    return new Handlebars.SafeString(element('button', true, extend({
      'type': 'button'
    }, options.hash), text));
  });

  /* {{submit "Submit form"}} */
  Handlebars.registerHelper('submit', function(text, options) {
    return new Handlebars.SafeString(element('button', true, extend({
      'type': 'submit'
    }, options.hash), text));
  });

  /* {{select "people" people}} */
  Handlebars.registerHelper('select', function(id, items, options) {

    var optionsHtml = '';
    var attr;

    // Generate the list of options
    for (var i = 0, j = items.length; i < j; i++) {

      // <option> attributes
      attr = {
        value: items[i].value
      };

      // Any falsey value will prevent the 'selected' attribute from being added
      // The 'selected' attribute requires a string value (eg: 'true' or 'false')
      if (items[i].selected) {
        attr.selected = items[i].selected;
      }

      optionsHtml += element('option', true, attr, items[i].text);
    }

    return new Handlebars.SafeString(element('select', true, extend({
      id: id
    }, options.hash), optionsHtml));
  });

}(Handlebars));