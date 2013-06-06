/**
 * handlebars.form-helpers.spec.js
 * https://github.com/badsyntax/handlebars-form-helpers
 * Copyright (c) 2013 Richard Willis; Licensed MIT
 */
(function (root, factory) {
  if (typeof exports === 'object') {
    // Node/CommonJS
    factory(
      require('../src/handlebars.form-helpers'),
      require('handlebars')
    );
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([
      'src/handlebars.form-helpers',
      'handlebars'
    ], factory);
  } else {
    // Browser globals
    factory(root.HandlebarsFormHelpers, root.Handlebars);
  }
}(this, function factory(HandlebarsFormHelpers, Handlebars) {

  describe('Handlebars form helpers', function() {

    it('Exists', function() {
        expect(HandlebarsFormHelpers).not.toBe(undefined);
        expect(typeof HandlebarsFormHelpers).toBe('object');
    });

    describe('Public API', function() {

      it('Has a \'register\' method', function() {
        expect(typeof HandlebarsFormHelpers.register).toBe('function');
      });

      it('Exposes the form helper functions', function() {

        expect(typeof HandlebarsFormHelpers.helpers).toBe('object');

        var helpers = [
          'form', 'input', 'label', 'button', 'submit', 'select',
          'checkbox', 'radio', 'file', 'hidden', 'password', 'textarea',
          'label_validation', 'input_validation', 'select_validation',
          'checkbox_validation', 'radio_validation', 'file_validation',
          'password_validation', 'textarea_validation', 'field_errors'
        ];

        for (var i = 0, l = helpers.length; i < l; i++) {
          expect(typeof HandlebarsFormHelpers.helpers[helpers[i]]).toBe('function');
        }
      });

      it('Registers the form helpers with a custom namespace', function() {

        HandlebarsFormHelpers.register(Handlebars, {
          namespace: 'test'
        });

        expect(typeof Handlebars.helpers['test-form']).not.toBe('undefined');

        // Reset namespace
        HandlebarsFormHelpers.register(Handlebars, {
          namespace: ''
        });
      });
    });

    describe('Form', function() {

      it('Generates the form tag with the URL as action and contents wrapped', function() {

        var data = { url: '/test/url' };
        var source = '{{#form url}}test{{/form}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<form action="/test/url" method="POST">test</form>');
      });

      it('Allows custom form attributes', function() {

        var data = { url: '/url' };
        var source = '{{#form url class="form"}}test{{/form}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<form action="/url" method="POST" class="form">test</form>');
      });

      it('Allows overriding the URL and action via the custom attributes', function() {

        var data = { url: '/test/url' };
        var source = '{{#form url action="test" method="GET"}}test{{/form}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<form action="test" method="GET">test</form>');
      });
    });

    describe('Input', function() {

      it('Generates the input tag with the first argument as the input id and second argument as value', function() {

        var data = {
          person: {
            name: 'Richard'
          }
        };
        var source = '{{input "firstname" person.name}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="firstname" id="firstname" value="Richard" type="text" />');
      });

      it('Prevents falsey attributes from being added', function() {

        var data = {
          person: {
            name: 'Richard'
          }
        };
        var source = '{{input "firstname" person.name id=false}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="firstname" value="Richard" type="text" />');
      });

      it('Adds validation error classes', function() {
        var data = {
          errors: {
            name: [
              'Please enter a name'
            ]
          },
          person: {
            name: ''
          }
        };
        var source = '{{input_validation "name" person.name errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="name" id="name" type="text" class="validation-error" />');
      });

      it('Adds validation error classes with a custom class name', function() {

        HandlebarsFormHelpers.register(Handlebars, {
          validationErrorClass: 'test123'
        });

        var data = {
          errors: {
            name: [
              'Please enter a name'
            ]
          },
          person: {
            name: ''
          }
        };
        var source = '{{input_validation "name" person.name errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="name" id="name" type="text" class="test123" />');

        // Reset class
        HandlebarsFormHelpers.register(Handlebars, {
          validationErrorClass: 'validation-error'
        });
      });
    });

    describe('Label', function() {

      it('Generates the label tag with the first argument as the label id and second argument as label text', function() {

        var data = {};
        var source = '{{label "name" "Please enter your name"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<label for="name">Please enter your name</label>');
      });

      it('Block level - Generates the label tag around body', function() {

        var data = {};
        var source = '{{#label}}Here is a label{{/label}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<label>Here is a label</label>');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            name: [
              'Please enter a name'
            ]
          },
          person: {
            name: ''
          }
        };
        var source = '{{label_validation "name" "Enter your name" errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<label for="name" class="validation-error">Enter your name</label>');
      });
    });

    describe('Button', function() {

      it('Generates the button tag with the first argument as the button text', function() {

        var data = {};
        var source = '{{button "save" "Submit form"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<button name="save" type="button">Submit form</button>');
      });
    });

    describe('Submit', function() {

      it('Generates the submit button tag with the first argument as the button text', function() {

        var data = {};
        var source = '{{submit "save" "Submit form"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<button name="save" type="submit">Submit form</button>');
      });
    });

    describe('Select', function() {

      it('Generates the select tag with the first argument as the element id and second argument as the list of options', function() {

        var data = {
          people: [{
            value: 1,
            text: 'Richard'
          }, {
            value: 2,
            text: 'John'
          }]
        };
        var source = '{{select "people" people []}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<select id="people" name="people"><option value="1">Richard</option><option value="2">John</option></select>');
      });

      it('Generates the select tag with with an option selected using a single selected value', function() {

        var data = {
          people: [{
            value: 1,
            text: 'Richard'
          }, {
            value: 2,
            text: 'John'
          }],
          selected: 1
        };
        var source = '{{select "people" people selected}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<select id="people" name="people"><option value="1" selected="selected">Richard</option><option value="2">John</option></select>');
      });

      it('Generates the select tag with with an option selected using an array of selected values', function() {

        var data = {
          people: [{
            value: 1,
            text: 'Richard'
          }, {
            value: 2,
            text: 'John'
          }],
          selected: [1]
        };
        var source = '{{select "people" people selected}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<select id="people" name="people" multiple="multiple"><option value="1" selected="selected">Richard</option><option value="2">John</option></select>');
      });

      it('Adds validation error classes', function() {

        var data = {
           titles: [{
              value: 'mr',
              text: 'Mr'
          }],
          errors: {
            title: [
              'Please enter a Title'
            ]
          },
          person: {
            title: ''
          }
        };
        var source = '{{select_validation "title" titles person.title errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<select id="title" name="title" class="validation-error"><option value="mr">Mr</option></select>');
      });
    });

    describe('Checkbox', function() {

      it('Generates the checkbox tag with the first argument as the name, 2nd as value, 3rd as checked', function() {

        var data = {};
        var source = '{{checkbox "food[]" "apples" true}}{{checkbox "food[]" "pears" false}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="food[]" type="checkbox" value="apples" checked="checked" /><input name="food[]" type="checkbox" value="pears" />');
      });

      it('Generates the checkbox tag with an id attribute if the name does not contain the multiple character sequence', function() {

        var data = {};
        var source = '{{checkbox "food" "apples" true}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="food" type="checkbox" value="apples" checked="checked" id="food" />');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            title: [
              'Please enter a Title'
            ]
          }
        };
        var source = '{{checkbox_validation "title" 1 false errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="title" type="checkbox" value="1" id="title" class="validation-error" />');
      });
    });

    describe('Radio', function() {

      it('Generates radio input tags', function() {

        var data = {};
        var source = '{{radio "likes_cats" "1" true}}{{radio "likes_cats" "0" false}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="likes_cats" type="radio" value="1" checked="checked" /><input name="likes_cats" type="radio" value="0" />');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            title: [
              'Please enter a Title'
            ]
          }
        };
        var source = '{{radio_validation "title" "1" false errors}}{{radio_validation "title" "0" true errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="title" type="radio" value="1" class="validation-error" /><input name="title" type="radio" value="0" checked="checked" class="validation-error" />');
      });
    });

    describe('File', function() {

      it('Generates the file input tag with the first argument as the name', function() {

        var data = {};
        var source = '{{file "fileupload"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="fileupload" id="fileupload" type="file" />');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            fileupload: [
              'Please select a file'
            ]
          }
        };
        var source = '{{file_validation "fileupload" errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="fileupload" id="fileupload" type="file" class="validation-error" />');
      });

    });

    describe('Hidden', function() {

      it('Generates the hidden input tag with the first argument as the name and 2nd as value', function() {

        var data = {};
        var source = '{{hidden "secret" "key123"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="secret" id="secret" value="key123" type="hidden" />');
      });
    });

    describe('Password', function() {

      it('Generates the password input tag with the first argument as the name and 2nd as value', function() {

        var data = {};
        var source = '{{password "passwordfield" "dontdothis"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="passwordfield" id="passwordfield" value="dontdothis" type="password" />');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            password: [
              'Please enter a password'
            ]
          }
        };
        var source = '{{password_validation "password" "" errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<input name="password" id="password" type="password" class="validation-error" />');
      });
    });

    describe('Textarea', function() {

      it('Generates the textarea tag with the first argument as the name and 2nd as body', function() {

        var data = {};
        var source = '{{textarea "text" "Here is some text"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<textarea name="text" id="text">Here is some text</textarea>');
      });

      it('Adds validation error classes', function() {

        var data = {
          errors: {
            text: [
              'Please enter some text'
            ]
          }
        };
        var source = '{{textarea_validation "text" "Here is some text" errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<textarea name="text" id="text" class="validation-error">Here is some text</textarea>');
      });
    });

    describe('Field errors', function() {

      it('Generates errors inline', function() {

        var data = {
          errors: {
            text: [ 'Please enter some text' ]
          }
        };

        var source = '{{field_errors "text" errors class="error"}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(html).toBe('<div class="error">Please enter some text</div>');
      });

      it('Generates errors at block level', function() {

        var data = {
          errors: {
            text: [ 'Please enter some text', 'Some text missing' ]
          }
        };

        var source = '{{#field_errors "text" errors}}<span class="help-block">{{this}}</span>{{/field_errors}}';
        var template = Handlebars.compile(source);
        var html = template(data);

        expect(String(html)).toBe('<span class="help-block">Please enter some text</span><span class="help-block">Some text missing</span>');
      });
    });
  });
}));