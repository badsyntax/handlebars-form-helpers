/**
 * handlebars.js form helpers
 * https://github.com/badsyntax/handlebars-form-helpers
 * Created by Richard Willis (badsyntax.co)
 */

(function(Handlebars) {

  /* Markup helpers
  *****************************************/

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

  /* Object, array and validation helpers
   *****************************************/

  function extend(obj1, obj2) {
    for (var prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  }

  function indexOf(arr, find) {
    for(var i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === find) {
        return i;
      }
    }
    return -1;
  }

  function hasValidationError(value, errors) {
    return !!(errors || {})[value];
  }

  function addValidationError(value, errors, options) {
    options = options || {};
    if (errors === true || hasValidationError(value, errors)) {
      var hash = options.hash;
      hash['class'] = (hash['class'] ? hash['class'] + ' ' : '') + validationErrorClass;
    }
    return options;
  }

  /* Form element strings
   *****************************************/

  var form = 'form', input = 'input', label = 'label', button = 'button',
    submit = 'submit', select = 'select', option = 'option', checkbox = 'checkbox',
    hidden = 'hidden', textarea = 'textarea', password = 'password', file = 'file';

  /* Validation strings
   *****************************************/

  var validationErrorClass = 'validation-error', validationSufffix = '_validation';

  /* Helpers
   *****************************************/

  /* {{#form url class="form"}}{{/form}} */
  function helperForm(url, options) {
    return createElement(form, true, extend({
      action: url,
      method: 'POST'
    }, options.hash), options.fn(this));
  }

  function helperValidationForm(url, errors, options) {
    return helperForm(url, addValidationError(url, !!errors.length, options));
  }

  /* {{input "firstname" person.name}} */
  function helperInput(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: 'text'
    }, options.hash)));
  }

  /* {{input_validation "firstname" person.name errors}} */
  function helperInputValidation(name, value, errors, options) {
    return helperInput(name, value, addValidationError(name, errors, options));
  }

  /* {{label "name" "Please enter your name"}} */
  function helperLabel(input, body, options) {
    return new Handlebars.SafeString(createElement(label, true, extend({
      'for': input
    }, options.hash), body));
  }

  /* {{label_validation "name" "Please enter your name" errors}} */
  function helperLabelValidation(input, body, errors, options) {
    return helperLabel(input, body, addValidationError(input, errors, options));
  }

  /* {{button "Submit form"}} */
  function helperButton(name, body, options) {
    return new Handlebars.SafeString(createElement(button, true, extend({
      name: name,
      type: button
    }, options.hash), body));
  }

  /* {{submit "Submit form"}} */
  function helperSubmit(name, body, options) {
    return new Handlebars.SafeString(createElement(button, true, extend({
      name: name,
      type: submit
    }, options.hash), body));
  }

  /*
  {{select 'title' titles person.title}}
  {{select 'title' titles selected}}
  */
  function helperSelect(name, items, selected, options) {

    var optionsHtml = '';
    var attr;

    // Generate the list of options
    for (var i = 0, j = items.length; i < j; i++) {

      // <option> attributes
      attr = {
        value: items[i].value
      };

      // We can specify which options are selected by using either:
      // * an array of selected values or
      // * a single selected value
      if (
        (selected instanceof Array && indexOf(selected, items[i].value) !== -1) ||
        (selected === items[i].value)
      ) {
        attr.selected = 'selected';
      }

      optionsHtml += createElement(option, true, attr, items[i].text);
    }

    return new Handlebars.SafeString(createElement(select, true, extend({
      id: name,
      name: name
    }, options.hash), optionsHtml));
  }

  /* {{select_validation 'title' titles person.title errors}} */
  function helperSelectValidation(name, items, selected, errors, options) {
    return helperSelect(name, items, selected, addValidationError(name, errors, options));
  }

  /* {{checkbox "food[]" "apples" true}} */
  function helperCheckbox(name, value, checked, options) {
    var attr = {
      name: name,
      type: checkbox,
      value: value
    };
    if (checked) {
      attr.checked = checked;
    }
    // Don't add an id attribute if the name uses the multiple character sequence, eg: 'food[]'
    if (!/\[\]/.test(name)) {
      attr.id = name;
    }
    return new Handlebars.SafeString(createElement(input, false, extend(attr, options.hash)));
  }

  /* {{checkbox_validation "food[]" "apples" true errors}} */
  function helperCheckboxValidation(name, value, checked, errors, options) {
    return helperCheckbox(name, value, checked, addValidationError(name, errors, options));
  }

  /* {{file "fileupload"}} */
  function helperFile(name, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      type: file
    }, options.hash)));
  }

  /* {{file "fileupload" errors}} */
  function helperFileValidation(name, errors, options) {
    return helperFile(name, addValidationError(name, errors, options));
  }

  /* {{hidden "secret" "key123"}} */
  function helperHidden(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: hidden
    }, options.hash)));
  }

  /* {{password "password" "dontdothis"}} */
  function helperPassword(name, value, options) {
    return new Handlebars.SafeString(createElement(input, false, extend({
      name: name,
      id: name,
      value: value,
      type: password
    }, options.hash)));
  }

  /* {{password_validation "password" "dontdothis" errors}} */
  function helperPasswordValidation(name, value, errors, options) {
    return helperPassword(name, value, addValidationError(name, errors));
  }

  /* {{textarea "text" "Here is some text"}} */
  function helperTextarea(name, body, options) {
    return new Handlebars.SafeString(createElement(textarea, true, extend({
      name: name,
      id: name
    }, options.hash), body));
  }

  /* {{textarea_validation "text" "Here is some text" errors}} */
  function helperTextareaValidation(name, body, errors, options) {
    return helperTextarea(name, body, addValidationError(name, errors, options));
  }

  // Register as Handlebars helpers
  (function registerHelpers(helpers) {
    for(var i = 0, j = helpers.length; i < j; i++) {
      Handlebars.registerHelper(helpers[i][0], helpers[i][1]);
    }
  }([

    // Form helpers
    [form,       helperForm],
    [input,      helperInput],
    [label,      helperLabel],
    [button,     helperButton],
    [submit,     helperSubmit],
    [select,     helperSelect],
    [checkbox,   helperCheckbox],
    [file,       helperFile],
    [hidden,     helperHidden],
    [password,   helperPassword],
    [textarea,   helperTextarea],

    // Form validation helpers
    [label+validationSufffix,    helperLabelValidation],
    [input+validationSufffix,    helperInputValidation],
    [select+validationSufffix,   helperSelectValidation],
    [checkbox+validationSufffix, helperCheckboxValidation],
    [file+validationSufffix,     helperFileValidation],
    [password+validationSufffix, helperPasswordValidation],
    [textarea+validationSufffix, helperTextareaValidation]
  ]));

}(Handlebars));