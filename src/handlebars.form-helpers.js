/**
 * handlebars.form-helpers.js
 * https://github.com/badsyntax/handlebars-form-helpers
 * Copyright (c) 2013 Richard Willis; Licensed MIT
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    root.HandlebarsFormHelpers = factory();
  }
}(this, function factory() {

  /* Global vars
  *****************************************/
  var Handlebars,

    // Configurable options
    config = {
      validationErrorClass: 'validation-error',
      namespace: ''
    },

    // All helpers
    helpers = {

      // Form helpers
      form: helperForm,
      input: helperInput,
      label: helperLabel,
      button: helperButton,
      submit: helperSubmit,
      select: helperSelect,
      checkbox: helperCheckbox,
      radio: helperRadio,
      file: helperFile,
      hidden: helperHidden,
      password: helperPassword,
      textarea: helperTextarea,

      // Form validation helpers
      label_validation: helperLabelValidation,
      input_validation: helperInputValidation,
      select_validation: helperSelectValidation,
      checkbox_validation: helperCheckboxValidation,
      radio_validation: helperRadioValidation,
      file_validation: helperFileValidation,
      password_validation: helperPasswordValidation,
      textarea_validation: helperTextareaValidation,
      field_errors: helperFieldErrors
    };

  /* Markup helpers
  *****************************************/

  function openTag(type, closing, attr) {
    var html = ['<' + type];
    for (var prop in attr) {
      // A falsy value is used to remove the attribute.
      // EG: attr[false] to remove, attr['false'] to add
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
    for(var key in obj2) {
      obj1[key] = obj2[key];
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

  function addValidationClass(value, errors, options) {
    options = options || {};
    if (errors === true || hasValidationError(value, errors)) {
      var hash = options.hash;
      hash['class'] = (hash['class'] ? hash['class'] + ' ' : '') + config.validationErrorClass;
    }
    return options;
  }

  /* Form helpers
   *****************************************/

  /* {{#form url class="form"}}{{/form}} */
  function helperForm(url, options) {
    return createElement('form', true, extend({
      action: url,
      method: 'POST'
    }, options.hash), options.fn(this));
  }

  /* {{input "firstname" person.name}} */
  function helperInput(name, value, options) {
    return new Handlebars.SafeString(createElement('input', false, extend({
      name: name,
      id: name,
      value: value,
      type: 'text'
    }, options.hash)));
  }

  /* {{input_validation "firstname" person.name errors}} */
  function helperInputValidation(name, value, errors, options) {
    return helperInput(name, value, addValidationClass(name, errors, options));
  }

  /* {{label "name" "Please enter your name"}} */
  /* {{#label}}Anything here{{/label}} */
  function helperLabel(input, body, options) {

    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;

    var attr = {};
    if (typeof input === 'string') {
      attr['for'] = input;
    }

    var element = createElement('label', true, extend(attr, options.hash), body);

    return options.fn ? element : new Handlebars.SafeString(element);
  }

  /* {{label_validation "name" "Please enter your name" errors}} */
  function helperLabelValidation(input, body, errors, options) {
    return helperLabel(input, body, addValidationClass(input, errors, options));
  }

  /* {{button "Submit form"}} */
  function helperButton(name, body, options) {
    return new Handlebars.SafeString(createElement('button', true, extend({
      name: name,
      type: 'button'
    }, options.hash), body));
  }

  /* {{submit "Submit form"}} */
  function helperSubmit(name, body, options) {
    return new Handlebars.SafeString(createElement('button', true, extend({
      name: name,
      type: 'submit'
    }, options.hash), body));
  }

  /*
  {{select 'title' titles person.title}}
  {{select 'title' titles selected}}
  */
  function helperSelect(name, items, selected, options) {

    // If the selected value is an array, then convert the
    // select to a multiple select
    if (selected instanceof Array) {
      options.hash.multiple = 'multiple';
    }

    // Generate the list of options
    var optionsHtml = '';
    for (var i = 0, j = items.length; i < j; i++) {

      // <option> attributes
      var attr = {
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

      optionsHtml += createElement('option', true, attr, items[i].text);
    }

    return new Handlebars.SafeString(createElement('select', true, extend({
      id: name,
      name: name
    }, options.hash), optionsHtml));
  }

  /* {{select_validation 'title' titles person.title errors}} */
  function helperSelectValidation(name, items, selected, errors, options) {
    return helperSelect(name, items, selected, addValidationClass(name, errors, options));
  }

  /* {{checkbox "food[]" "apples" true}} */
  function helperCheckbox(name, value, checked, options) {
    var attr = {
      name: name,
      type: 'checkbox',
      value: value
    };
    if (checked === true || checked === value) {
      attr.checked = 'checked';
    }
    // Don't add an id attribute if the name uses the multiple character sequence, eg: 'food[]'
    if (!/\[\]/.test(name)) {
      attr.id = name;
    }
    return new Handlebars.SafeString(createElement('input', false, extend(attr, options.hash)));
  }

  /* {{checkbox_validation "food[]" "apples" true errors}} */
  function helperCheckboxValidation(name, value, checked, errors, options) {
    return helperCheckbox(name, value, checked, addValidationClass(name, errors, options));
  }

  /* {{radio "likes_cats" "1" true}} */
  function helperRadio(name, value, checked, options) {
    extend(options.hash, {
      type: 'radio',
      id: false
    });
    return helperCheckbox(name, value, checked, options);
  }

  /* {{radio_validation "likes_cats" "1" true errors}} */
  function helperRadioValidation(name, value, checked, errors, options) {
    return helperRadio(name, value, checked, addValidationClass(name, errors, options));
  }

  /* {{file "fileupload"}} */
  function helperFile(name, options) {
    return new Handlebars.SafeString(createElement('input', false, extend({
      name: name,
      id: name,
      type: 'file'
    }, options.hash)));
  }

  /* {{file "fileupload" errors}} */
  function helperFileValidation(name, errors, options) {
    return helperFile(name, addValidationClass(name, errors, options));
  }

  /* {{hidden "secret" "key123"}} */
  function helperHidden(name, value, options) {
    return new Handlebars.SafeString(createElement('input', false, extend({
      name: name,
      id: name,
      value: value,
      type: 'hidden'
    }, options.hash)));
  }

  /* {{password "password" "dontdothis"}} */
  function helperPassword(name, value, options) {
    return new Handlebars.SafeString(createElement('input', false, extend({
      name: name,
      id: name,
      value: value,
      type: 'password'
    }, options.hash)));
  }

  /* {{password_validation "password" "dontdothis" errors}} */
  function helperPasswordValidation(name, value, errors, options) {
    return helperPassword(name, value, addValidationClass(name, errors, options));
  }

  /* {{textarea "text" "Here is some text"}} */
  function helperTextarea(name, body, options) {
    return new Handlebars.SafeString(createElement('textarea', true, extend({
      name: name,
      id: name
    }, options.hash), body));
  }

  /* {{textarea_validation "text" "Here is some text" errors}} */
  function helperTextareaValidation(name, body, errors, options) {
    return helperTextarea(name, body, addValidationClass(name, errors, options));
  }

  /*
  {{field_errors 'surname' errors class="help-block"}}
  {{#field_errors 'name' errors}}
      <span class="help-block">{{this}}</span>
  {{/field_errors}}
  */
  function helperFieldErrors(name, errors, options) {

    var fieldErrors = (errors || {})[name];
    if (!fieldErrors) {
      return null;
    }
    if (!(fieldErrors instanceof Array)) {
      fieldErrors = [fieldErrors];
    }

    var err = '';
    for(var i = 0, j = fieldErrors.length; i < j; i++) {
      err += options.fn && options.fn(fieldErrors[i]) ||
        createElement('div', true, options.hash, fieldErrors[i]);
    }

    return new Handlebars.SafeString(err);
  }

  function register(HandlebarsSrc, customConfig) {

    // Set the handlebars reference
    Handlebars = HandlebarsSrc;

    // Set the custom config
    extend(config, customConfig);

    // Register the helpers
    var namespace = config.namespace;
    for(var name in helpers) {
      Handlebars.registerHelper((namespace ? namespace + '-' : '') + name, helpers[name]);
    }
  }

  // public API
  return {
    register: register,
    helpers: helpers
  };
}));