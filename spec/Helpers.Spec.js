describe('Handlebars form helpers', function() {

  function strip(html) {
    return html.toLowerCase().replace(/[\r\n]/g,'');
  }

  it('Depends on Handlebars', function() {
    expect(typeof Handlebars).not.toBe('undefined');
  });

  describe('Creating the form tag', function() {

    it('Generates the form tag with the URL as action and contents wrapped', function() {

      var data = { url: '/test/url' };
      var source = '{{#form url}}test{{/form}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<form action="/test/url" method="POST">test</form>');
    });

    it('Allows overriding the URL and action via the custom options', function() {

      var data = { url: '/test/url' };
      var source = '{{#form url action="test" method="GET"}}test{{/form}}';
      var template = Handlebars.compile(source);
      var html = template(data);

      expect(html).toBe('<form action="test" method="GET">test</form>');
    });
  });
});