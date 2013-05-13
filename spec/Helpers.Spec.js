describe('Handlebars form helpers', function() {

  it('Depends on Handlebars', function() {
    expect(typeof Handlebars).not.toBe('undefined');
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
      var source = '{{input "name" person.name}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<input id="name" value="Richard" type="text" />');
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
  });

  describe('Button', function() {

    it('Generates the button tag with the first argument as the button text', function() {

      var data = {};
      var source = '{{button "Submit form"}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<button type="button">Submit form</button>');
    });
  });

  describe('Submit', function() {

    it('Generates the submit button tag with the first argument as the button text', function() {

      var data = {};
      var source = '{{submit "Submit form"}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<button type="submit">Submit form</button>');
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
      var source = '{{select "people" people}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<select id="people"><option value="1">Richard</option><option value="2">John</option></select>');
    });

    it('Generates the select tag with with an option selected', function() {

      var data = {
        people: [{
          value: 1,
          text: 'Richard'
        }, {
          value: 2,
          text: 'John',
          selected: true
        }]
      };
      var source = '{{select "people" people}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<select id="people"><option value="1">Richard</option><option value="2" selected="true">John</option></select>');
    });
  });
});