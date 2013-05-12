describe('Handlebars form helpers', function() {

  function strip(html) {
    return html.toLowerCase().replace(/[\r\n]/g,'');
  }

  it('Provides a form block level helper', function() {

    var data = {};
    var source = '{{#form}}{{/form}}';
    var template = Handlebars.compile(source);
    var html = template(data);

    expect(strip(html)).toBe('<form></form>');
  });
});