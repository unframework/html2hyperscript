
var testCase = require('tap').test;
var h = require('hyperscript');
var convert = require('../');

function executeJSMarkup(js) {
    var jsRunner = new Function('h', 'return ' + js);

    return jsRunner(h).outerHTML;
}

testCase(function (test) {
    var html = '<div class="testClass"><a>Some Text</a></div>';

    test.equal(executeJSMarkup(convert(html)), html, 'generated markup should match source');

    test.end();
});
