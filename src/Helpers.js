/**
 * handlebars.js form helpers
 * https://github.com/badsyntax/handlebars-form-helpers
 * Created by Richard Willis (badsyntax.co)
 */

(function(Handlebars) {

  /* Markup helpers */

  function openTag(type, closing, attr) {
    var html = ['<' + type];
    for (var prop in attr) {
      // An attribute needs to be truthy
      if (attr[prop]) {
        html.push(prop + '="' + attr[prop] + '"');
      }
    }
    return html.join(' ') + (!closing ? ' /' : '') + '>';
  }

  function closeTag(type) {
    return '</' + type + '>';
  }

  function createElement(type, closing, attr, contents) {
    return openTag(type, closing, attr) + (closing ? (contents || '') + closeTag(type) : '');
  }

  /* Object helpers */

  function extend(obj1, obj2) {
    for (var prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  }

  /* Element strings (to help with script compression) */
  var form = 'form', input = 'input', label = 'label', button = 'button',
    submit = 'submit', select = 'select', option = 'option', checkbox = 'checkbox',
    hidden = 'hidden', textarea = 'textarea', password = 'password', file = 'file';

  /* Handlebars helpers */

  /* {{#form url class="form"}}{{/form}} */
  Handlebars.registerHelper(form, function(url, options) {
    return createElement(form, true, extend({
      action: url,
      method: 'POST'
    }, options.hash), options.fn(this));
  });

  /* {{input "firstname" person.name}} */
  Handlebars.registerHelper(input, function(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: 'text'
    }, options.hash)));
  });

  /* {{label "name" "Please enter your name"}} */
  Handlebars.registerHelper(label, function(input, body, options) {
    return new Handlebars.SafeString(createElement(label, true, extend({
      'for': input
    }, options.hash), body));
  });

  /* {{button "Submit form"}} */
  Handlebars.registerHelper(button, function(name, body, options) {
    return new Handlebars.SafeString(createElement(button, true, extend({
      name: name,
      type: button
    }, options.hash), body));
  });

  /* {{submit "Submit form"}} */
  Handlebars.registerHelper(submit, function(name, body, options) {
    return new Handlebars.SafeString(createElement(button, true, extend({
      name: name,
      type: submit
    }, options.hash), body));
  });

  /* {{select "people" people}} */
  Handlebars.registerHelper(select, function(name, items, options) {

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

      optionsHtml += createElement(option, true, attr, items[i].text);
    }

    return new Handlebars.SafeString(createElement(select, true, extend({
      id: name,
      name: name
    }, options.hash), optionsHtml));
  });

  /* {{checkbox "food[]" "apples" true}} */
  Handlebars.registerHelper(checkbox, function(name, value, checked, options) {
    var attr = {
      name: name,
      type: checkbox,
      value: value
    };
    if (checked) {
      attr.checked = checked;
    }
    if (!/\[\]/.test(name)) {
      attr.id = name;
    }
    return new Handlebars.SafeString(createElement(input, false, extend(attr, options.hash)));
  });

  /* {{file "fileupload"}}} */
  Handlebars.registerHelper(file, function(name, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      type: file
    }, options.hash)));
  });

  /* {{hidden "secret" "key123"}} */
  Handlebars.registerHelper(hidden, function(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: hidden
    }, options.hash)));
  });

  /* {{password "password" "dontdothis"}} */
  Handlebars.registerHelper(password, function(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: password
    }, options.hash)));
  });

  /* {{textarea "text" "Here is some text"}} */
  Handlebars.registerHelper(textarea, function(name, body, options) {
    return new Handlebars.SafeString(createElement(textarea, true, extend({
      name: name,
      id: name
    }, options.hash), body));
  });

}(Handlebars));