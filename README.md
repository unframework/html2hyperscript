# Convert Legacy HTML to Hyperscript

Automatically translate old HTML markup into the new Hyperscript markup embeddable directly inside your component Javascript code.

```
npm install -g html2hyperscript
html2hyperscript legacy_markup_file.html > shiny_new_syntax.js
```

See Hyperscript library: https://github.com/dominictarr/hyperscript

Also useful for virtual DOM Hyperscript-like syntax: https://github.com/Matt-Esch/virtual-dom

HTML goes in:

```html
<table class="sample-html">
  <tr>
    <th>Pandas</th>
    <th>Kittens</th>
    <th>Hedgehogs</th>
  </tr>
  <tr>
    <td>foo</td>
    <td>bar</td>
    <td>baz</td>
  </tr>
  <tr>
    <td>32</td>
    <td>45</td>
    <td>83</td>
  </tr>
  <tr>
    <td>onomatopoeia</td>
    <td>schadenfreude</td>
    <td>antidisestablishmentarianism</td>
  </tr>
</table>
```

Hyperscript-like JS syntax comes out:

```js
h("table.sample-html", [
  h("tr", [
    h("th", [ "Pandas" ]),
    h("th", [ "Kittens" ]),
    h("th", [ "Hedgehogs" ])
  ]),
  h("tr", [
    h("td", [ "foo" ]),
    h("td", [ "bar" ]),
    h("td", [ "baz" ])
  ]),
  h("tr", [
    h("td", [ "32" ]),
    h("td", [ "45" ]),
    h("td", [ "83" ])
  ]),
  h("tr", [
    h("td", [ "onomatopoeia" ]),
    h("td", [ "schadenfreude" ]),
    h("td", [ "antidisestablishmentarianism" ])
  ])
])
```

## TODO

- some tests

