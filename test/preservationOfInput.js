
var testCase = require('tap').test;
var h = require('hyperscript');
var convert = require('../');

testCase(function (test) {
    test.equal(convert('<div><!-- comment body --></div>'), 'h("div", [ /* comment body */ ])', 'preserve comments');
    test.equal(convert("<div>\n\n</div>"), "h(\"div\", [\n\n])", 'preserve newlines');
    test.equal(convert("<div>\n  <span></span>  \n</div>"), "h(\"div\", [\n  h(\"span\")  \n])", 'preserve indentation and whitespace');
    test.equal(convert("<div>\n  Some Text  \n</div>"), "h(\"div\", [\n  \"Some Text\"\n])", 'trim whitespace around text but preserve indent');

    test.end();
});
