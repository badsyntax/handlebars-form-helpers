# handlebars-form-helpers

[![Build Status](https://travis-ci.org/badsyntax/handlebars-form-helpers.png?branch=master)](https://travis-ci.org/badsyntax/handlebars-form-helpers)
[![Dependency Status](https://gemnasium.com/badsyntax/handlebars-form-helpers.png)](https://gemnasium.com/badsyntax/handlebars-form-helpers)

A library of handlebars helpers that help with building forms.

## Installation

### Browser

1. Either [download](https://raw.github.com/badsyntax/handlebars-form-helpers/master/dist/handlebars.form-helpers.min.js) the
script, or install with [bower](http://bower.io/): `bower install handlebars-form-helpers`
2. Load the scripts into your page. (It does not matter which order the scripts are loaded in.)

    ```html
    <script src="handlebars.js"></script>
    <script src="handlebars.form-helpers.js"></script>
    ```

3. Register the helpers:

    ```javascript
    HandlebarsFormHelpers.register(Handlebars);
    ```

### Node/CommonJS

1. You can install the helpers with npm: `npm install handlebars-form-helpers`
2. Load in the module and register it:

    ```javascript
    var hbs = require('hbs');
    require('handlebars-form-helpers').register(hbs.handlebars);
    ```

### AMD

1. Either [download](https://raw.github.com/badsyntax/handlebars-form-helpers/master/dist/handlebars.form-helpers.min.js) the
script, or install with [bower](http://bower.io/): `bower install handlebars-form-helpers`
3. Load in the module and register it:

  ```javascript
  define(['handlebars', 'handlebars-form-helpers'], function(Handlebars, HandlebarsFormHelpers) {
      HandlebarsFormHelpers.register(Handlebars);
      // ..etc
  });
  ```

## Usage

### Registering the helpers

You have to register the helpers before you can use them in your templates. 
The register method expects the Handlebars object to be passed in, and an *optional* config object, for example:

```javascript
HandlebarsFormHelpers.register(Handlebars, {
  namespace: 'custom',
  validationErrorClass: 'custom-validation-class'
});
```

Once the helpers are registered, you can use the helpers in your templates, and compile your templates as you usually
would. 

### Using the helpers

Most of the helpers can be used inline, for example:

```
{{label "name" "Please enter your name"}}
```

The only block helpers are the form, label and field_errors helpers:

```
{{#form "/post" class="form"}} ... {{/form}}
{{#label}}
    A field label
{{/label}}
{{#field_errors "surname" errors}}
    <span class="help-block">{{this}}</span>
{{/field_errors}}`
```

By default the helpers are registered without a namespace. This gives you short and friendly helper names. 

If you need to change the helpers namespace, you can specify a custom namespace when registering the helpers, for example:

```javascript
HandlebarsFormHelpers.register(Handlebars, {
  namespace: 'myform'
})
```

Now the helpers are created with that namespace, for example:

```
{{myform-label "name" "Please enter your name"}}
```


### Common form helpers

```
{{#form url class="form"}}{{/form}}
{{label "name" "Please enter your name"}}
{{input "firstname" person.name}}
{{button "save" "Submit form"}}
{{submit "save" "Submit form"}}
{{select "title" titles person.title}}
{{checkbox "apples" "yes" true}}
{{file "fileupload"}}
{{hidden "secret" "key123"}}
{{password "password"}}
{{textarea "text" "Here is some text"}}
```

#### Examples:

**Form helper**
```html
{{#form "/contact" class="form"}}{{/form}}
```
```html
<form method="POST" action="/contact" class="form"></form>
```

**Label helper**
```html
{{label "name" "Please enter your name"}}
```
```html
<label for="name">Please enter your name</label>
```
```html
{{#label}}Please enter your name{{/label}}
```
```html
<label>Please enter your name</label>
```

**Input helper**
```html
{{input "firstname" "Richard"}}
```
```html
<input type="text" id="firstname" name="firstname" value="Richard" />
```

**Button helper**
```html
{{button "save" "Submit form"}}
```
```html
<button name="save" type="button">Submit form</button>
```

**Submit button helper**
```html
{{submit "save" "Submit form"}}
```
```html
<button name="save" type="submit">Submit form</button>
```

**Select helper**
```html
{{select "title" titles title}}
```
```javascript
{
  titles: [{
    value: 'mr',
    text: 'Mr'
  }],
  title: 'mr'
}
```
```html
<select id="title" name="title"><option value="mr" selected="selected">Mr</option></select>
```

**Select (multiple) helper**
```html
{{select "title" titles selected}}
```
```javascript
{
  titles: [{
    value: 'mr',
    text: 'Mr'
  }],
  selected: ['mr']
}
```
```html
<select id="title" name="title" multiple="true"><option value="mr" selected="selected">Mr</option></select>
```

**Checkbox helper**
```html
{{checkbox "apples" "yes" true}}
```
```html
<input id="apples" name="apples" type="checkbox" value="yes" checked="true" />
```

**File helper**
```html
{{file "fileupload"}}
```
```html
<input name="fileupload" id="fileupload" type="file" />
```

**Hidden helper**
```html
{{hidden "secret" "key123"}}
```
```html
<input name="secret" id="secret" value="key123" type="hidden" />
```

**Password helper**
```html
{{password "password"}}
```
```html
<input name="password" id="password" type="password" />
```

**Textarea helper**
```html
{{textarea "text" "Here is some text"}}
```
```html
<textarea name="text" id="text">Here is some text</textarea>
```


### Form validation helpers

Validation helpers work in a similar way to the common form helpers, but handle displaying of validation errors and 
field error styling. 

The validation helpers expect an 'errors' object to be passed in, which is used to display the 
validation errors for the field.

For example:

```javascript
var data = {
  errors: {
    name: [
      'Please enter a name'
    ]
  }
};
var source = '{{input_validation "name" "" errors}}' +
    '{{field_errors "name" errors class="help-block text-error"}}';
var template = Handlebars.compile(source);
var html = template(data);

// Compiled HTML will be:
// <input name="name" id="name" type="text" class="validation-error" />
// <span class="help-block text-error">Please enter a name</span>');
```

### Validation helpers

```
{{input_validation "firstname" person.name errors}}
{{label_validation "name" "Please enter your name" errors}}
{{select_validation "title" titles person.title errors}}
{{checkbox_validation "food[]" "apples" true errors}}
{{file_validation "fileupload" errors}}
{{password_validation "password" "dontdothis" errors}}
{{textarea_validation "text" "Here is some text" errors}}
```

### Error data

The errors object has to be in the following format:

```javascript
var errors = {
  fieldName: [
    'Error message 1',
    'Error message 2!'
  ]
};
```

#### Examples:

**Input validation helper**
```html
{{input_validation "name" "" errors}}
```
```html
<input name="name" id="name" type="text" class="validation-error" />
```

**Label validation helper**
```html
{{label_validation "name" "" errors}}
```
```html
<label for="name" class="validation-error">Enter your name</label>
```

**Select validation helper**
```html
{{select_validation "title" titles "" errors}}
```
```html
<select id="title" name="title" class="validation-error"><option value="mr">Mr</option></select>
```

**Checkbox validation helper**
```html
{{checkbox_validation "title" 1 false errors}}
```
```html
<input name="title" type="checkbox" value="1" id="title" class="validation-error" />
```

**File validation helper**
```html
{{file_validation "fileupload" errors}}
```
```html
<input name="fileupload" id="fileupload" type="file" class="validation-error" />
```

**Password validation helper**
```html
{{password_validation "password" "" errors}}
```
```html
<input name="password" id="password" type="password" class="validation-error" />
```

**Textarea validation helper**
```html
{{textarea_validation "text" "Here is some text" errors}}
```
```html
<textarea name="text" id="text" class="validation-error">Here is some text</textarea>
```

**Field errors helpers**

**Inline**
```
{{field_errors "text" errors class="error"}}
```
```html
<div class="error">Please enter some text</div>
```
**Block**
```
{{#field_errors "text" errors}}
<span class="help-block">{{this}}</span>
{{/field_errors}}
```
```html
<span class="help-block">Error message 1</span>
<span class="help-block">Error message 2</span>
```

## Demo

This demo shows how to use the helpers to build a form that handles validation: 
http://badsyntax.github.io/handlebars-form-helpers/

## Contributing

Feel free to send pull requests. 

### Running the tests

This project uses [jasmine](http://pivotal.github.io/jasmine/) for testing. If you want to run the tests, you'll need to have 
[nodejs](http://nodejs.org/), [grunt-cli](https://github.com/gruntjs/grunt-cli) and [bower](http://bower.io/) installed.
You'll also need to install the project dependencies by 
running `npm install && bower install` in the project root.

Once everything is installed, you can run the tests by either running `npm test` or `grunt test`.
