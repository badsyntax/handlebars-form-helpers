# handlebars-form-helpers [![Build Status](https://travis-ci.org/badsyntax/handlebars-form-helpers.png?branch=master)](https://travis-ci.org/badsyntax/handlebars-form-helpers)


This library provides extra handlebars helpers that can help with building forms. 

Construction of forms can sometimes be tricky and usually there's logic involved. 
These helpers provide the logic for building forms and handling validation errors. 

## Installation

### Browser

Simply ensure you load the form helpers after you have loaded handlebars:

```html
<script src="handlebars.js"></script>
<script src="handlebars.form-helpers.js"></script>
```

### Node/CommonJS

When loaded as a CommonJS module, the library will need to be initiated manually. This is a feature
that allows you to define the handlebars dependency:

```javascript
var hbs = require('hbs');
require('./handlebars.form-helpers')(hbs.handlebars);
```

### AMD

As with the CommonJS module, the AMD module will need to be initiated manually to allow you 
define the handlebars dependency:

```javascript
define(['handlebars', 'handlebars.form-helpers'], function(handlebars, handlebarsHelpersInit) {
  handlebarsHelpersInit(handlebars);
  // etc...
});
```

## Usage

### Common form helpers

The following helpers will create the associated form elements. The last arguments on every helper are 
additional element attributes.


```
{{#form url class="form"}}{{/form}}
{{label "name" "Please enter your name"}}
{{input "firstname" person.name}}
{{button "Submit form"}}
{{submit "Submit form"}}
{{select "title" titles person.title}}
{{checkbox "apples" "yes" true}}
{{file "fileupload"}}
{{hidden "secret" "key123"}}
{{password "password"}}
{{textarea "text" "Here is some text"}}
```

### Form validation helpers

All validation helpers expect an object of errors to be passed in. 

If the field name exists as a key in the errors, an error class name of 'validation-error' will be added.

```
{{input_validation "firstname" person.name errors}}
{{label_validation "name" "Please enter your name" errors}}
{{select_validation "title" titles person.title errors}}
{{checkbox_validation "food[]" "apples" true errors}}
{{file "fileupload" errors}}
{{password_validation "password" "dontdothis" errors}}
{{textarea_validation "text" "Here is some text" errors}}
```

The following helpers can be used to display field errors:

```
{{field_errors "surname" errors class="help-block"}}
{{#field_errors "surname" errors}}
    <span class="help-block">{{this}}</span>
{{/field_errors}}
```

## Demo

A demo is currently being developed and will be available soon.
