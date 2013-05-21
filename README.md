# handlebars-form-helpers 

[![Build Status](https://travis-ci.org/badsyntax/handlebars-form-helpers.png?branch=master)](https://travis-ci.org/badsyntax/handlebars-form-helpers)
[![Dependency Status](https://gemnasium.com/badsyntax/handlebars-form-helpers.png)](https://gemnasium.com/badsyntax/handlebars-form-helpers)


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

Examples:

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

Validation helpers work in a similar way to the common form helpers, but expect an additional argument
to be passed in. This additional argument must be an object, and should contain error messages for the fields.

If the field name exists as a key in the errors, an error class name of 'validation-error' will be added.

```
{{input_validation "firstname" person.name errors}}
{{label_validation "name" "Please enter your name" errors}}
{{select_validation "title" titles person.title errors}}
{{checkbox_validation "food[]" "apples" true errors}}
{{file_validation "fileupload" errors}}
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
